import MetricsRepository from "@Common/repositories/metrics/MetricsRepository";
import ProjectsRepository from "@Repositories/projects/ProjectsRepository";
import MetricEntity from "@Common/ressources/metrics/MetricEntity";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import { IHttpReponse, IStatusNode } from "@Common/system/interfaces/Interfaces";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { IsNotEmpty, IsUUID, Validate } from "class-validator";
import { Service } from "typedi";
import IsRpcPathAllowed from "./validators/IsRpcPathAllowed";
import IsValidProject from "./validators/IsValidProject";
import { BackendVariables } from "@Common/config/variables/Variables";
import { NodeType } from "@Common/enums/enums";
import { validateAddress } from "@taquito/utils";
import PathService from "@Services/dictionaries/PathService";
import { TypeOfRequestEntity } from "@Common/ressources";

export class RpcRequest {
	@IsNotEmpty()
	@Validate(IsRpcPathAllowed)
	path!: string;

	@IsNotEmpty()
	@IsUUID()
	@Validate(IsValidProject, [{ network: BaseService.network }])
	uuid!: string;

	@IsNotEmpty()
	remoteAddress!: string;
}
export enum EStatus {
	successful = "successful",
	failed = "failed",
	blacklisted = "blacklisted",
}

/**
 * @description Proxy service
 * @class ProxyService
 * @extends {BaseService}
 * @implements {IProxyService}
 */
@Service()
export default class ProxyService extends BaseService {
	constructor(private metricsRepository: MetricsRepository, private projectRepository: ProjectsRepository, private variables: BackendVariables, private pathService: PathService) {
		super();
	}
	/** healthcheck
	 * @returns {IHttpReponse}
	 * @memberof ProxyService
	 * */
	public getHttpServerResponse(): IHttpReponse {
		return {
			status: HttpCodes.SUCCESS,
			reason: null,
		} as IHttpReponse;
	}

	/**
	 * @description Get nodes status
	 * @returns {Promise<IStatusNode>}
	 * @memberof ProxyService
	 * */
	public async getNodesStatus(): Promise<IStatusNode> {
		const archiveTestURL = new URL(`${this.variables.ARCHIVE_NODES_URL}/chains/main/blocks/head`);
		const rollingTestURL = new URL(`${this.variables.ROLLING_NODES_URL}/chains/main/blocks/head`);

		const archive_node = {
			status: HttpCodes.INTERNAL_ERROR,
			reason: null,
		} as IHttpReponse;
		const rolling_node = {
			status: HttpCodes.INTERNAL_ERROR,
			reason: null,
		} as IHttpReponse;

		const [archive, rolling] = await Promise.allSettled([axios.get(archiveTestURL.toString()), axios.get(rollingTestURL.toString())]);

		if (archive.status === "fulfilled") archive_node.status = archive.value.status;
		if (archive.status === "rejected") archive_node.reason = archive.reason;

		if (rolling.status === "fulfilled") rolling_node.status = rolling.value.status;
		if (rolling.status === "rejected") rolling_node.reason = rolling.reason;

		return {
			archive_node,
			rolling_node,
		};
	}

	/**
	 * @description Save a metric
	 * @param {Partial<MetricEntity>} metricEntity
	 * @returns {Promise<MetricEntity>}
	 * @memberof ProxyService
	 * */
	async saveMetric(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricsRepository.create(metricEntity);
		if (!metric) return null;
		return metric;
	}

	/**
	 * @description Proxy a request to a node
	 * @param {RpcRequest} request
	 * @returns {Promise<string | number>}
	 * @memberof ProxyService
	 * */
	public async proxy(request: RpcRequest, whitelisted: boolean): Promise<string | number> {
		console.info(`Received proxy request for path: ${request.path}`);

		const project = await this.projectRepository.findOne({ uuid: request.uuid, network: BaseService.network });

		if (!project) {
			return Promise.reject(`Project uuid: ${request.uuid} with network: ${BaseService.network} does not exist`);
		}

		let response: string | number = "";

		const metric = new MetricEntity();

		//save path in dictionnary
		const path = new TypeOfRequestEntity();
		path.path = this.extractAndFormatTypeOfRequest(request.path);
		const typeOfRequest = (await this.pathService.saveIfNotExists(path)) as TypeOfRequestEntity;
		metric.typeOfRequest = typeOfRequest;

		if (!whitelisted) {
			metric.status = EStatus.blacklisted;
			metric.node = NodeType.NONE;
			Object.assign(metric, request, { project, dateRequested: new Date() });
			// Logger les metrics
			await this.saveMetric(metric);
			return response;
		}

		if (this.isRollingNodeRedirection(request.path)) {
			console.info("Forwarding request directly to rolling node (as a reverse proxy)");
			const rollingURL = new URL(`${this.variables.ROLLING_NODES_URL}/${request.path}`);
			metric.node = NodeType.ROLLING;
			try {
				const { data, status } = await axios.get(rollingURL.toString());
				status !== HttpCodes.SUCCESS ? (metric.status = EStatus.failed) : (metric.status = EStatus.successful);
				response = typeof data === "object" ? data : data.toString();
			} catch (error) {
				console.error(`Error while forwarding request to rolling node: ${error}`);
				metric.status = EStatus.failed;
				response = `This request has failed or is not available on the rolling node`;
			}
		} else {
			console.info("Forwarding request directly to archive node (as a reverse proxy)");
			const archiveURL = new URL(`${this.variables.ARCHIVE_NODES_URL}/${request.path}`);
			metric.node = NodeType.ARCHIVE;
			try {
				const { data, status } = await axios.get(archiveURL.toString());
				status !== HttpCodes.SUCCESS ? (metric.status = EStatus.failed) : (metric.status = EStatus.failed);
				response = typeof data === "object" ? data : data.toString();
			} catch (error) {
				console.error(`Error while forwarding request to archive node: ${error}`);
				metric.status = EStatus.failed;
				response = `This request has failed or is not available on the archive node`;
			}
		}

		Object.assign(metric, request, { project, dateRequested: new Date() });
		// Logger les metrics
		await this.saveMetric(metric);
		return response;
	}

	/**
	 * @description Check if a path is a rolling node redirection
	 * @param {string} url
	 * @returns {boolean}
	 * @memberof ProxyService
	 * */
	isRollingNodeRedirection(url: string): boolean {
		const pureUrl = `/${url!.trim()}`;
		console.info(`Checking if ${pureUrl} is a rolling node redirection`);
		return Boolean(BaseService.rollingPatterns.find((rollingpattern) => pureUrl.includes(rollingpattern)));
	}

	extractAndFormatTypeOfRequest(path: string): string {
		const addressRegex = new RegExp(/(tz[a-zA-Z0-9]{34})/g);
		const matches = path.match(addressRegex);

		if (matches !== null) {
			// If there's at least one match, replace all addresses with <address>
			for (const match of matches) {
				if (validateAddress(match)) {
					path = path.replace(match, "<address>");
				}
			}
		}
		return path;
	}
}

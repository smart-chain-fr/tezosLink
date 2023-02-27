import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricsRepository from "@Common/repositories/metrics/MetricsRepository";
import ProjectsRepository from "@Repositories/projects/ProjectsRepository";
import MetricEntity from "@Common/ressources/MetricEntity";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import { IHttpReponse, IStatusNode } from "@Common/system/interfaces/Interfaces";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { IsNotEmpty, IsUUID, Validate } from "class-validator";
import { Service } from "typedi";
import IsRpcPathAllowed from "./validators/IsRpcPathAllowed";
import IsValidProject from "./validators/IsValidProject";

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

@Service()
export default class ProxyService extends BaseService {
	constructor(private metricsRepository: MetricsRepository, private projectRepository: ProjectsRepository) {
		super();
	}
	/**
	 * @throws {Error} if url is undefined
	 */
	public getHttpServerResponse(): IHttpReponse {
		return {
			status: HttpCodes.SUCCESS,
			reason: null,
		} as IHttpReponse;
	}
	/**
	 * @throws {Error} if url is undefined
	 */
	public async getNodesStatus(): Promise<IStatusNode> {
		const archiveTestURL = new URL(`${process.env["ARCHIVE_NODES_URL"]}/chains/main/blocks/head`);
		const rollingTestURL = new URL(`${process.env["ROLLING_NODES_URL"]}/chains/main/blocks/head`);

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
	 *
	 * @throws {Error} If metric cannot be created
	 * @returns
	 */
	async saveMetric(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricsRepository.create(metricEntity);
		if (!metric) return null;
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}

	// Proxy proxy an http request to the right repositories
	public async proxy(request: RpcRequest): Promise<string> {
		console.info(`Received proxy request for path: ${request.path}`);

		const project = await this.projectRepository.findOne({ uuid: request.uuid, network: BaseService.network });

		if (!project) {
			return Promise.reject(`Project uuid: ${request.uuid} with network: ${BaseService.network} does not exist`);
		}

		let response = "";

		if (this.isRollingNodeRedirection(request.path)) {
			console.info("Forwarding request directly to rolling node (as a reverse proxy)");
		} else {
			console.info("Forwarding request directly to archive node (as a reverse proxy)");
		}
		// Logger les metrics
		const metric = new MetricEntity();
		Object.assign(metric, request, { project, dateRequested: new Date()});

		await this.saveMetric(metric);
		return response;
	}

	isRollingNodeRedirection(url: string): boolean {
		const urls = url.split("?");
		const pureUrl = `/${urls[0]!.trim()}`;
		return Boolean(BaseService.rollingPatterns.find((rollingpattern) => rollingpattern.includes(pureUrl)));
	}
}


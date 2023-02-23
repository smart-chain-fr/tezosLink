import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricsRepository from "@Common/repositories/MetricsRepository";
import MetricEntity from "@Common/ressources/MetricEntity";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import BaseService from "@Services/BaseService";
import axios from "axios";
import { Service } from "typedi";

export interface IHttpReponse {
	status: number;
	reason: string | null;
}

interface IStatusNode {
	archive_node: IHttpReponse;
	rolling_node: IHttpReponse;
}

@Service()
export default class ProxyService extends BaseService {
	constructor(private metricsRepository: MetricsRepository) {
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

	public async proxyRequest(metricEntity: Partial<MetricEntity>) {
		const metric = new MetricEntity();
		if (this.isWhitelisted(metricEntity.path!)) {
			await this.saveMetric(metricEntity);
			if (!metric) return null;
		}
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
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
	public async proxy(metric: MetricEntity): Promise<[string, boolean]> {
		console.info(`Received proxy request for path: ${metric.path}`);

		try {
			const metricObject = await this.metricsRepository.findOne(metric);

			if (metricObject != null && metricObject.project!.network !== this.network) {
				console.debug(`This proxy instance can handle network: ${this.network} but project network is ${metricObject.project!.network}`);
				return ["invalid network", false];
			}

			if (!this.isAllowed(metric.path)) {
				console.debug(`Not allowed to proxy on the path: ${metric.path}`);
				return ["call blacklisted", false];
			}

			this.saveMetric(metric);

			if (this.isRollingNodeRedirection(metric.path)) {
				console.info("Forwarding request directly to rolling node (as a reverse proxy)");
				return ["", true];
			} else {
				console.info("Forwarding request directly to archive node (as a reverse proxy)");
				return ["", true];
			}
		} catch (err) {
			console.error(`Failed to proxy request: ${err}`);
			return ["Error occured", true];
		}
	}

	isRollingNodeRedirection(url: string): boolean {
		let isRedirectionAllowed = false;
		const urls = url.split("?");
		url = `/${urls[0]!.trim()}`;

		for (const whitelistedPatterns of this.rollingPatterns) {
			if (whitelistedPatterns.includes(url)) {
				isRedirectionAllowed = true;
				break;
			}
		}

		return isRedirectionAllowed;
	}

	isAllowed(url: string): boolean {
		let isPathAllowed = false;
		const urls = url.split("?");
		url = "/" + urls[0]!.trim();

		for (const whiteListedPaths of this.whitelisted) {
			if (whiteListedPaths.includes(url)) {
				isPathAllowed = true;
				for (const bl of this.blacklisted) {
					if (bl.includes(url)) {
						isPathAllowed = false;
						break;
					}
				}
				break;
			}
		}

		return isPathAllowed;
	}
}


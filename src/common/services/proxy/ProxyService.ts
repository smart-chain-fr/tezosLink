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
	constructor() {
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
}


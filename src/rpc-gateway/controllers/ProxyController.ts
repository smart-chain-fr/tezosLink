import dotenv from "dotenv";
import { type Response, type Request } from "express";
import { Controller, Get } from "@ControllerPattern/index";
import { Service } from "typedi";
import ApiController from "@Common/system/controller-pattern/ApiController";
import axios from 'axios';

dotenv.config();

export enum ContentType {
	JSON = "application/json",
	FORM_DATA = "multipart/form-data;",
}

@Controller()
@Service()
export default class ProxyController extends ApiController {
	constructor() {
		super();
	}

	protected buildHeaders(contentType: ContentType) {
		const headers = new Headers();

		if (contentType === ContentType.JSON) {
			headers.set("Content-Type", contentType);
		}
		return headers;
	}

	@Get("/health")
	protected async getHealth(req: Request, res: Response) {
		this.httpSuccess(res, { status: "success" });
	}

	@Get("/status")
	protected async getStatus(req: Request, res: Response) {
		let archiveNodeStatus = false;
		let rollingNodeStatus = false;

		const archiveTestURL = `${process.env["RPC_PROXY_ARCHIVE_HOSTNAME"]}/chains/main/blocks/head`;
		try {
			const archiveTestResponse = await axios.get(archiveTestURL);
			if (archiveTestResponse.status >= this.httpCode.SUCCESS && archiveTestResponse.status < this.httpCode.BAD_REQUEST) {
				archiveNodeStatus = true;
			}
		} catch (err) {
			this.httpBadRequest(res, err);
			return;
		}

		const rollingTestURL = `${process.env["RPC_PROXY_ROLLING_HOSTNAME"]}/chains/main/blocks/head`;
		try {
			const rollingTestResponse = await axios.get(rollingTestURL);
			if (rollingTestResponse.status >= this.httpCode.SUCCESS && rollingTestResponse.status < this.httpCode.BAD_REQUEST) {
				rollingNodeStatus = true;
			}
		} catch (err) {
			this.httpBadRequest(res, err);
			return;
		}

		const data = {
			archive_node: archiveNodeStatus,
			rolling_node: rollingNodeStatus,
		};

		this.httpSuccess(res, data);
	}
}


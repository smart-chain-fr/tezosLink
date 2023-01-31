import { Router } from "express";
import { RequestHandlerParams } from "express-serve-static-core";

export interface IConfig {
	label: string;
	port: number;
	rootUrl: string;
	middlwares: RequestHandlerParams[];
}

export default interface ServerInterface {
	getRouter(): Router;

	init(config: IConfig): this;
}


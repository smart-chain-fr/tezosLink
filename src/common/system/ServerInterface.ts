import { NextFunction, Request, Response, Router } from "express";
import { RequestHandlerParams } from "express-serve-static-core";

export interface IConfig {
	label: string;
	port: number;
	rootUrl: string;
	middlwares: RequestHandlerParams[];
	errorHandler?: (error: any, req: Request, res: Response, next: NextFunction) => void;
}

export default interface ServerInterface {
	getRouter(): Router;

	init(config: IConfig): this;
}


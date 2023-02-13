import HttpException from "@Common/system/controller-pattern/exceptions/HttpException";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import { NextFunction, Request, Response } from "express";

export default function errorHandler(error: any, req: Request, response: Response, next: NextFunction) {
	const errorStatus: number = error["status"];
	/**
	 * Used on when try to parse json on request
	 */
	if (error instanceof SyntaxError && errorStatus === 400 && "body" in error) {
		response.status(HttpCodes.BAD_REQUEST).send({
			body: error["body"],
			type: error as any ["type"],
		});
		return;
	}

	if (error instanceof HttpException) {
		response.status(error.httpCode).send(error.message);
		return;
	}

	next(error);
}


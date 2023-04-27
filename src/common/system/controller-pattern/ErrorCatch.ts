import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

/**
 * Capture primitive errors to preserve application crash
 */
@Service()
export default class ErrorCatch {
	constructor() {}

	public handle(request: Request, response: Response, next: NextFunction, ...args: any[]): void {
		next(args[args.length - 1] ?? "Unknown Error");
	}
}


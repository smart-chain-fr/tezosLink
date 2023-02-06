import { type Request, type Response, type NextFunction } from "express";

export interface StRoute {
	type: "get" | "post" | "delete" | "put";
	path: string;
	func: (requests: Request, response: Response) => Promise<void>;
	frontMiddlewares: ((requests: Request, response: Response, next: NextFunction) => void)[];
	backMiddlewares: ((requests: Request, response: Response, next: NextFunction) => void)[];
}


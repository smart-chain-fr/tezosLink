import { Service } from "typedi";
import { Request } from "express";
import { QueryService } from "@Services/BaseService";
import BaseController from "@Common/system/controller-pattern/BaseController";
import HttpException from "@Common/system/controller-pattern/exceptions/HttpException";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";

@Service()
export default abstract class ApiController extends BaseController {

	protected buildQueryAsObject<Q = any>(request: Request): QueryService<Q> {
		try {
			const query: Q = JSON.parse((request.query["q"] as string) ?? (request.query["query"] as string) ?? "{}");
			const page = ~~(request.query["page"] ?? 0);
			const limit = ~~(request.query["limit"] ?? 0);
			const sort = (JSON.parse((request.query["sort"] as string) ?? "{}") as QueryService["sort"]) ?? null;

			if (sort && (!(sort instanceof Object) || sort instanceof Array)) {
				throw new HttpException("Sort must be an object", HttpCodes.BAD_REQUEST);
			}

			return {
				...request.query,
				query,
				page,
				limit,
				sort,
			};
		} catch (e: any) {
			if (e instanceof HttpException) {
				throw e;
			}
			throw new HttpException(`Query string SyntaxError`, HttpCodes.BAD_REQUEST);
		}
	}
}

export { HttpCodes as ResponseStatusCodes };


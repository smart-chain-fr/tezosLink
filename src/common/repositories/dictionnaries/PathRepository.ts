import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { PathEntity } from "@Common/ressources";

import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";

@Service()
export default class PathRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().pathDictionnary;
	}

	// pods by running phase
	public async findAll(): Promise<PathEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const paths = await this.model.findMany({
				select: { path: true },
				orderBy: { path: "asc" },
			});
			return ObjectHydrate.map<PathEntity>(PathEntity, paths, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async createIfNotExists(pathEntity: Partial<PathEntity>): Promise<PathEntity> {
		try {
			const data = { ...pathEntity };
			const existingPath = await this.model.findUnique({
				where: { path: data.path! },
			});
			if (existingPath) {
				// The phase is already up-to-date, so return the existing entity.
				return ObjectHydrate.hydrate<PathEntity>(new PathEntity(), existingPath, { strategy: "exposeAll" });
			}
			const pod = await this.model.create({
				data: {
					path: data.path!,
				},
			});

			return ObjectHydrate.hydrate<PathEntity>(new PathEntity(), pod, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

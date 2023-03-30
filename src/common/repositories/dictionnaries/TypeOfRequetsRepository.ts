import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { TypeOfRequestEntity } from "@Common/ressources";

import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";

@Service()
export default class TypeOfRequestRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().typeOfRequest;
	}

	//Find one path
	public async findOneByUuid(uuid: string): Promise<TypeOfRequestEntity | null> {
		try {
			const pathEntity = await this.model.findUnique({
				where: { uuid },
			});
			return ObjectHydrate.hydrate<TypeOfRequestEntity>(new TypeOfRequestEntity(), pathEntity!, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Find all paths
	public async findAll(): Promise<TypeOfRequestEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const paths = await this.model.findMany({
				select: { path: true },
				orderBy: { path: "asc" },
			});
			return ObjectHydrate.map<TypeOfRequestEntity>(TypeOfRequestEntity, paths, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	public async createIfNotExists(typeOfRequestEntity: Partial<TypeOfRequestEntity>): Promise<TypeOfRequestEntity> {
		try {
			const data = { ...typeOfRequestEntity };
			const existingPath = await this.model.findUnique({
				where: { path: data.path! },
			});
			if (existingPath) {
				// The phase is already up-to-date, so return the existing entity.
				return ObjectHydrate.hydrate<TypeOfRequestEntity>(new TypeOfRequestEntity(), existingPath, { strategy: "exposeAll" });
			}
			const uuid = uuidv4();
			const pod = await this.model.create({
				data: {
					uuid,
					path: data.path!,
				},
			});

			return ObjectHydrate.hydrate<TypeOfRequestEntity>(new TypeOfRequestEntity(), pod, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

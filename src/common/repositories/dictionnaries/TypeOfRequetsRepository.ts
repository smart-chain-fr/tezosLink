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

	/**
	 * @param uuid
	 * @returns TypeOfRequestEntity
	 * @memberof TypeOfRequestRepository
	 * */
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

	/**
	 *
	 * @returns TypeOfRequestEntity[]
	 */
	public async findAll(): Promise<TypeOfRequestEntity[]> {
		try {
			const paths = await this.model.findMany({
				select: { uuid: true, path: true },
				orderBy: { path: "asc" },
			});
			return ObjectHydrate.map<TypeOfRequestEntity>(TypeOfRequestEntity, paths, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
	/**
	 *
	 * @param typeOfRequestEntity
	 * @returns  TypeOfRequestEntity
	 */
	public async createIfNotExists(typeOfRequestEntity: Partial<TypeOfRequestEntity>): Promise<TypeOfRequestEntity> {
		try {
			const data = { ...typeOfRequestEntity };
			const existingPath = await this.model.findUnique({
				where: { path: data.path! },
			});
			if (existingPath) {
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

	public async delete(typeOfRequestEntity: Partial<TypeOfRequestEntity>): Promise<void> {
		try {
			await this.model.delete({
				where: {
					uuid: typeOfRequestEntity.uuid,
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

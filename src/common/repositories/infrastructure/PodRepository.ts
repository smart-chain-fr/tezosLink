import TezosLink from "@Common/databases/TezosLink";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { PodEntity } from "@Common/ressources";
import { ORMBadQueryError } from "@Common/system/database/exceptions/ORMBadQueryError";
import { Prisma } from "@prisma/client";
import BaseRepository from "@Repositories/BaseRepository";
import { Service } from "typedi";

@Service()
export default class PodRepository extends BaseRepository {
	constructor(private database: TezosLink) {
		super();
	}
	protected get model() {
		return this.database.getClient().pod;
	}
	/** Find pods by query
	 * @param query
	 * @returns {Promise<PodEntity[]>}
	 * @memberof PodRepository
	 * */
	public async findManyByQuery(query: Prisma.PodFindManyArgs): Promise<PodEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const limit = Math.min(query.take || this.defaultFetchRows, this.maxFetchRows);

			// Update the query with the limited limit
			const pods = await this.model.findMany({ ...query, orderBy: { createdAt: "desc" }, take: limit, include: { MetricInfrastructure: true } });
			return ObjectHydrate.map<PodEntity>(PodEntity, pods, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
	/** Find one pod by entity
	 * @param podEntity
	 * @returns {Promise<PodEntity>}
	 * @memberof PodRepository
	 * */
	public async findOne(podEntity: Partial<PodEntity>): Promise<PodEntity> {
		try {
			const pod = (await this.model.findFirst({
				where: {
					...podEntity,
					MetricInfrastructure: { every: {} },
				},
				include: {
					MetricInfrastructure: true,
				},
			})) as PodEntity;
			return ObjectHydrate.hydrate<PodEntity>(new PodEntity(), pod, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/**
	 * Find pods in database
	 * @param limit
	 * @returns
	 */
	public async findPodsInDatabase(limit: number): Promise<PodEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const rows = Math.min(limit || this.defaultFetchRows, this.maxFetchRows);
			const pods = await this.model.findMany({
				take: rows,
			});
			return ObjectHydrate.map<PodEntity>(PodEntity, pods, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	/**
	 * create pod if not exists
	 * @param podEntity
	 * @returns {Promise<PodEntity>}
	 * @memberof PodRepository
	 * */
	public async createIfNotExists(podEntity: Partial<PodEntity>): Promise<PodEntity> {
		try {
			const data = { ...podEntity };
			const existingPod = await this.model.findUnique({
				where: { uid: data.uid! },
			});
			if (existingPod && existingPod.namespace === data.namespace) {
				// The phase is already up-to-date, so return the existing entity.
				return ObjectHydrate.hydrate<PodEntity>(new PodEntity(), existingPod, { strategy: "exposeAll" });
			}
			const pod = await this.model.create({
				data: {
					uid: data.uid!,
					name: data.name!,
					namespace: data.namespace!,
					type: data.type!,
				},
				include: {
					MetricInfrastructure: true,
				},
			});

			return ObjectHydrate.hydrate<PodEntity>(new PodEntity(), pod, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

	// Delete pods by name
	public async delete(podEntity: Partial<PodEntity>): Promise<void> {
		try {
			await this.model.delete({
				where: {
					uid: podEntity.uid!,
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

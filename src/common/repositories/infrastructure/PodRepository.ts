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
	/** Find all pods by query */
	public async findManyByQuery(query: Prisma.PodFindManyArgs): Promise<PodEntity[]> {
		try {
			// Use Math.min to limit the number of rows fetched
			const limit = Math.min(query.take || this.defaultFetchRows, this.maxFetchRows);

			// Update the query with the limited limit
			const pods = await this.model.findMany({ ...query, take: limit, include: { MetricInfrastructure: true } });
			return ObjectHydrate.map<PodEntity>(PodEntity, pods, { strategy: "exposeAll" });
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}

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

	// pods by running phase
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

	public async createOrUpdate(podEntity: Partial<PodEntity>): Promise<PodEntity> {
		try {
			const data = { ...podEntity };
			const existingPod = await this.model.findUnique({
				where: { name: data.name! },
			});
			if (existingPod && existingPod.namespace === data.namespace) {
				// The phase is already up-to-date, so return the existing entity.
				return ObjectHydrate.hydrate<PodEntity>(new PodEntity(), existingPod, { strategy: "exposeAll" });
			}
			const pod = await this.model.upsert({
				where: { name: data.name! },
				create: {
					name: data.name!,
					namespace: data.namespace!,
					type: data.type!,
				},
				update: { namespace: data.namespace! },
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
					name: podEntity.name!,
				},
			});
		} catch (error) {
			throw new ORMBadQueryError((error as Error).message, error as Error);
		}
	}
}

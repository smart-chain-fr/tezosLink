import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricRepository from "@Common/repositories/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import { type processFindManyQuery } from "prisma-query";
import { Service } from "typedi";

@Service()
export default class MetricService {
	constructor(private metricRepository: MetricRepository) {}

	/**
	 * @throws {Error} If metrics are undefined
	 */
	public async getByCriterias(query: ReturnType<typeof processFindManyQuery>) {
		const metrics = await this.metricRepository.findMany(query);
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metrics);
	}
	/**
	 * @throws {Error} If metric is undefined
	 */
	public async getByUUID(projectEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.findOne(projectEntity);
		if (!metric) return null;
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}
	/**
	 *
	 * @throws {Error} If metric cannot be created
	 * @returns
	 */
	public async create(projectEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.create(projectEntity);
		if (!metric) throw new Error("Error while creating project");
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}
}


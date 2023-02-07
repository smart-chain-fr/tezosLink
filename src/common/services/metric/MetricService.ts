import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import MetricRepository from "@Common/repositories/MetricsRepository";
import { MetricEntity } from "@Common/ressources";
import { QueryService } from "@Services/BaseService";
import { Service } from "typedi";

@Service()
export default class MetricService {
	constructor(private metricRepository: MetricRepository) {}

	public async find(query: QueryService<Partial<MetricEntity>>) {
		const metrics = await this.metricRepository.findMany(query);
		if (!metrics) throw new Error("Metrics are undefined");
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metrics);
	}

	public async findBy(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.findOne(metricEntity);
		if (!metric) throw new Error("Metrics not found");
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}

	public async create(metricEntity: Partial<MetricEntity>) {
		const metric = await this.metricRepository.create(metricEntity);
		if (!metric) throw new Error("Error while creating a metric");
		return ObjectHydrate.hydrate<Partial<MetricEntity>>(new MetricEntity(), metric);
	}
}

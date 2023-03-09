import { InfrastructureMetrics } from "@Common/system/prometheus/InfrastructureMetrics";
import { Gauge, Histogram, type MetricObjectWithValues, type MetricValue } from "prom-client";
import { Service } from "typedi";

@Service()
export class InfrastructureService {
	private cpuUsage: Gauge;
	private ramUsage: Gauge;
	private networkUsage: Gauge;
	private restResponseTimeHistogram: Histogram;
	private labels = {};

	constructor() {
		const factory = InfrastructureMetrics.getInstance();
		const registry = factory.getRegistry();
		const PROCESS_RESIDENT_MEMORY = "process_resident_memory_bytes_total";

		this.cpuUsage = new Gauge({
			name: "cpu_usage",
			help: "Current CPU usage in bytes",
			registers: [registry],
		});

		this.ramUsage = new Gauge({
			name: PROCESS_RESIDENT_MEMORY,
			help: "Current RAM usage in bytes",
			registers: [registry],
			collect: () => this.collectRamUsage(),
		});

		this.networkUsage = new Gauge({
			name: "network_usage",
			help: "Current network usage in bytes",
			registers: [registry],
		});

		this.restResponseTimeHistogram = new Histogram({
			name: "rest_response_time_duration_seconds",
			help: "REST API response time in seconds",
			labelNames: ["method", "route", "status_code"],
			registers: [registry],
		});
	}

	public async getAllMetrics(): Promise<{
		cpuUsage: MetricObjectWithValues<MetricValue<string>>;
		ramUsage: MetricObjectWithValues<MetricValue<string>>;
		networkUsage: MetricObjectWithValues<MetricValue<string>>;
		restResponseTime: Histogram;
	}> {
		const cpuUsage = await this.cpuUsage.get();
		const ramUsage = await this.ramUsage.get();
		const networkUsage = await this.networkUsage.get();
		const restResponseTime = this.restResponseTimeHistogram;

		return {
			cpuUsage,
			ramUsage,
			networkUsage,
			restResponseTime,
		};
	}

	public updateCpuUsage(usage: number): void {
		this.cpuUsage.set(usage);
	}

	public updateNetworkUsage(usage: number): void {
		this.networkUsage.set(usage);
	}

	private collectRamUsage(): void {
		const memUsage = safeMemoryUsage();
		if (memUsage) {
			this.ramUsage.set(this.labels, memUsage.rss);
		}
	}
}

function safeMemoryUsage(): NodeJS.MemoryUsage | void {
	try {
		return process.memoryUsage();
	} catch {
		return;
	}
}


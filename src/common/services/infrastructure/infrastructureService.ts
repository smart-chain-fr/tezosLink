//import { InfrastructureMetrics } from "@Common/system/prometheus/InfrastructureMetrics";
import { Gauge, Histogram, Registry, type MetricObjectWithValues, type MetricValue } from "prom-client";
import { Service } from "typedi";
import os from "os";

@Service()
export class InfrastructureService {
	private cpuUsage: Gauge;
	private ramUsage: Gauge;
	private networkUsage: Gauge;
	private restResponseTimeHistogram: Histogram;
	private labels = {};

	constructor() {
		//const instance = InfrastructureMetrics.getInstance();
		const registry = new Registry();
		const PROCESS_RESIDENT_MEMORY = "process_resident_memory_bytes_total";
		const PROCESS_CPU_SECONDS = "process_cpu_seconds_total";

		this.cpuUsage = new Gauge({
			name: PROCESS_CPU_SECONDS,
			help: "Current CPU usage in bytes",
			registers: [registry],
			labelNames: ["hostname"],
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
		cpuPercent: number;
		ramUsage: MetricObjectWithValues<MetricValue<string>>;
		networkUsage: MetricObjectWithValues<MetricValue<string>>;
		restResponseTime: Histogram;
	}> {
		console.log("Cpu usage: -----------------",this.cpuUsage);
		const cpus = os.cpus();
		const cpuPercent = cpus.reduce((acc, cpu) => acc + cpu.times.user / cpu.times.nice + cpu.times.sys / cpu.times.nice, 0) / cpus.length;
		this.cpuUsage.set(cpuPercent);
		const ramUsage = await this.ramUsage.get();
		const networkUsage = await this.networkUsage.get();
		const restResponseTime = this.restResponseTimeHistogram;

		return {
			cpuPercent,
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

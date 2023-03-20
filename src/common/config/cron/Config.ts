import Cron, { IConfig } from "@Common/cron/";
import MetricsInfrastructureService from "@Services/infrastructure/MetricInfrastructureService";
import Container from "typedi";

const infrastructureService = Container.get(MetricsInfrastructureService);
const Config: IConfig = {
	binders: [],
	jobs: [{
		name: "Scrape-metrics",
		cronTime: Cron.createTimer({ second: "0", minute: "0", hour: "*/1" }),
		onTick: () => infrastructureService.scrapMetrics(),
		enabled: false,
	},],
};

export default Config;

import Cron, { IConfig } from "@Common/cron/";
import { InfrastructureService } from "@Services/infrastructure/infrastructureService";
import Container from "typedi";

const infrastructureService = Container.get(InfrastructureService);
const Config: IConfig = {
	binders: [],
	jobs: [{
		name: "Scrape-metrics",
		cronTime: Cron.createTimer({ second: "0", minute: "0", hour: "*/1" }),
		onTick: () => infrastructureService.getAllMetrics(),
		enabled: false,
	},],
};

export default Config;

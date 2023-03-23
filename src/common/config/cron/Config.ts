import Cron from "@System/cron";
import IConfig from "@System/cron/IConfig";
import PodService from "@Services/infrastructure/PodService";

import Container from "typedi";

const podService = Container.get(PodService);
const Config: IConfig = {
	binders: [],
	jobs: [
		{
			name: "Scrape-metrics",
			cronTime: Cron.createTimer({ second: "*/15" }),
			onTick: () => podService.scrapingPodsAndMetrics(),
			enabled: true,
		},
	],
};

export default Config;

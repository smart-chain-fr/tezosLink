import Config from "@Common/config/cron/Config";
import "module-alias/register";
import "reflect-metadata";
import { Container } from "typedi";
import CronProvider from "@Common/cron";

(async () => {
	await Container.get(CronProvider).run(Config);

	console.info("TezosLink - Cron started");
})();

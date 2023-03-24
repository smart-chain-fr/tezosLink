import "module-alias/register";
import "reflect-metadata";
import { Config as CronConfig } from "@Config/cron";
import CronProvider from "@System/cron/";
import { Container } from "typedi";

(async () => {
	await Container.get(CronProvider).run(CronConfig);

	console.info("TezosLink - Cron started");
})();

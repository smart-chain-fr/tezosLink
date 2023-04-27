import { Service } from "typedi";
import IConfig from "./IConfig";
import schedule from "node-schedule";
import FunctionBinder, { IFunctionBinder } from "@Common/helpers/FunctionBinder";

type ICronTimer = {
	second?: string | "*" | null;
	minute?: string | "*" | null;
	hour?: string | "*" | null;
	dayMonth?: string | "*" | null;
	month?: string | "*" | null;
	dayWeek?: string | "*" | null;
};

@Service()
export default class Cron {
	private readonly cronJobs: schedule.Job[] = [];
	private static readonly runningJobs: boolean[] = [];
	public async run(CronConfig: IConfig) {
		this.cronJobs.splice(0);
		this.cancel();
		this.cronJobs.push(...CronConfig.jobs.filter((job) => job.enabled).map((job, index) => this.buildCronJob(job, index, CronConfig.binders)));
		return this;
	}

	public cancel() {
		this.cronJobs.forEach((job) => job.cancel());
		return this;
	}

	public static createTimer(cronTimer: ICronTimer) {
		return [cronTimer.second ?? "*", cronTimer.minute ?? "*", cronTimer.hour ?? "*", cronTimer.dayMonth ?? "*", cronTimer.month ?? "*", cronTimer.dayWeek ?? "*"].join(" ");
	}

	private buildCronJob(job: IConfig["jobs"][number], index: number, binders: IFunctionBinder[]) {
		return schedule.scheduleJob(job.cronTime, () => Cron.scheduleJob(job, job.onTick, index, binders));
	}

	/**
	 * @description Prevent same jobs superposition
	 */
	private static async scheduleJob(jobConfig: IConfig["jobs"][number], cronCommand: () => Promise<any>, index: number, binders: IFunctionBinder[]) {
		if (Cron.runningJobs[index]) return;
		Cron.runningJobs[index] = true;

		try {
			console.info(`${Cron.getDate()} 	CronJob: ${jobConfig.cronTime} ${jobConfig.name}: 	started`);

			if (binders.length) {
				await FunctionBinder.bind(cronCommand, binders);
			} else {
				await cronCommand();
			}

			console.info(`${Cron.getDate()} 	CronJob: ${jobConfig.name}: 			end success`);
		} catch (e) {
			console.info(`${Cron.getDate()} 	CronJob: ${jobConfig.name}: 			end with error`);
			console.error(e);
		}
		Cron.runningJobs[index] = false;
	}

	private static getDate() {
		const d = new Date();
		return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
	}
}

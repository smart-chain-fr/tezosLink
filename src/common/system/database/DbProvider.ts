import { PrismaClient } from "@prisma/client";
import  IDatabaseConfig  from "../../config/IDatabaseConfig";

export default class DbProvider {
	protected client = new PrismaClient();

	constructor(protected config: IDatabaseConfig) {
	}

	public async connect(): Promise<void> {
		await this.client.$connect();
		console.info(`⚡️[Prisma]: Connected to ${this.config.name}`);// A Logger middleware is to be added here
	}

	public getClient() {
		return this.client;
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
		console.info(`⚡️[Prisma]: Disconnected from ${this.config.name}`); // A Logger middleware is to be added here
	}
}

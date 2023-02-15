import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import  IDatabaseConfig  from "../../config/IDatabaseConfig";

dotenv.config();

export default class DbProvider {
	protected client = new PrismaClient({
		datasources: {
			db: {
			  url: `postgres://${process.env["DATABASE_USER"]}:${process.env["DATABASE_PASSWORD"]}@${process.env["DATABASE_HOSTNAME"]}:${process.env["DATABASE_PORT"]}/${process.env["DATABASE_NAME"]}`,
			},
		  },
	});

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

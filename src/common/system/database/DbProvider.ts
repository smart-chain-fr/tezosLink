import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import IDatabaseConfig from "../interfaces/database/IDatabaseConfig";
import { BackendVariables } from "@Common/config/variables/Variables";
import Container from "typedi";

dotenv.config();

export default class DbProvider {
	protected readonly variables = Container.get(BackendVariables);
	protected client = new PrismaClient({
		datasources: {
			db: {
				url: `postgres://${this.variables.DATABASE_USER}:${this.variables.DATABASE_PASSWORD}@${this.variables.DATABASE_HOSTNAME}:${this.variables.DATABASE_PORT}/${this.variables.DATABASE_NAME}`,
			},
		},
	});

	constructor(protected config: IDatabaseConfig) {}

	public async connect(): Promise<void> {
		await this.client.$connect();
		console.info(`⚡️[Prisma]: Connected to ${this.config.name}`); // A Logger middleware is to be added here
	}

	public getClient() {
		return this.client;
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
		console.info(`⚡️[Prisma]: Disconnected from ${this.config.name}`); // A Logger middleware is to be added here
	}
}

import { Service } from "typedi";
import DbProvider from "@Common/system/database";
import dotenv from "dotenv";

dotenv.config();

@Service()
export default class TezosLink {
	protected readonly dbProvider: DbProvider;
	constructor() {
		this.dbProvider = new DbProvider({
			name: this.getDatabaseName(),
		});
	}
	public getClient() {
		return this.dbProvider.getClient();
	}
	public async connect() {
		await this.dbProvider.connect();
		return this.dbProvider.getClient();
	}

	private getDatabaseName(): string {
		const dbUrl = process.env["DATABASE_URL"];
		if (!dbUrl) throw new Error("Database url is undefined!. Add url of db in the .env file.");
		const dbSegments = dbUrl.split("/") ?? [];
		const name = dbSegments[dbSegments.length - 1];
		if (!name) throw new Error("Database name is undefined!. Add name of db in the url.");
		return name;
	}
}


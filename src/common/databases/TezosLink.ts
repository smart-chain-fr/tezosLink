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
		const name = process.env["DATABASE_NAME"];
		if (!name) throw new Error("Database name is undefined!. Add name of db in the url.");
		return name;
	}
}


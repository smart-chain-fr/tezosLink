import { Service } from "typedi";
import DbProvider from "@Common/system/database";
import dotenv from "dotenv";
import { BackendVariables } from "@Common/config/variables/Variables";

dotenv.config();

@Service()
export default class TezosLink {
	protected readonly dbProvider: DbProvider;
	constructor(private variables: BackendVariables) {
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
		const name = this.variables.DATABASE_NAME;
		if (!name) throw new Error("Database name is undefined!. Add name of db in the url.");
		return name;
	}
}


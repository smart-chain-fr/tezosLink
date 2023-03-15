import { Service } from "typedi";
import { validateOrReject, IsNotEmpty, IsOptional } from "class-validator";
import dotenv from "dotenv";

@Service()
export class BackendVariables {
	@IsNotEmpty()
	public readonly DATABASE_PORT!: string;

	@IsNotEmpty()
	public readonly DATABASE_HOSTNAME!: string;

	@IsNotEmpty()
	public readonly DATABASE_USER!: string;

	@IsNotEmpty()
	public readonly DATABASE_PASSWORD!: string;

	@IsNotEmpty()
	public readonly DATABASE_NAME!: string;

	@IsOptional()
	public readonly WEB_LABEL: string;

	@IsNotEmpty()
	public readonly WEB_PORT!: string;

	@IsNotEmpty()
	public readonly WEB_ROOT_URL!: string;

	@IsNotEmpty()
	public readonly API_HOSTNAME!: string;

	@IsOptional()
	public readonly API_LABEL!: string;

	@IsNotEmpty()
	public readonly API_PORT!: string;

	@IsNotEmpty()
	public readonly API_ROOT_URL!: string;

	@IsOptional()
	public readonly RPC_GATEWAY_LABEL!: string;

	@IsNotEmpty()
	public readonly RPC_GATEWAY_PORT!: string;

	@IsNotEmpty()
	public readonly RPC_GATEWAY_ROOT_URL!: string;

	@IsNotEmpty()
	public readonly RPC_GATEWAY_MAINNET_URL!: string;

	@IsNotEmpty()
	public readonly RPC_GATEWAY_TESTNET_URL!: string;

	@IsNotEmpty()
	public readonly ARCHIVE_NODES_URL!: string;

	@IsNotEmpty()
	public readonly ARCHIVE_NODES_PORT!: string;

	@IsNotEmpty()
	public readonly ROLLING_NODES_URL!: string;

	@IsNotEmpty()
	public readonly ROLLING_NODES_PORT!: string;

	@IsNotEmpty()
	public readonly TEZOS_NETWORK!: string;

	public readonly NODE_ENV = process.env.NODE_ENV;

	constructor() {
		dotenv.config();
		this.DATABASE_PORT = process.env["DATABASE_PORT"]!;
		this.DATABASE_HOSTNAME = process.env["DATABASE_HOSTNAME"]!;
		this.DATABASE_USER = process.env["DATABASE_USER"]!;
		this.DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"]!;
		this.DATABASE_NAME = process.env["DATABASE_NAME"]!;
		this.WEB_LABEL = process.env["WEB_LABEL"]!;
		this.WEB_PORT = process.env["WEB_PORT"]!;
		this.WEB_ROOT_URL = process.env["WEB_ROOT_URL"]!;
		this.API_HOSTNAME = process.env["API_HOSTNAME"]!;
		this.API_LABEL = process.env["API_LABEL"]!;
		this.API_PORT = process.env["API_PORT"]!;
		this.API_ROOT_URL = process.env["API_ROOT_URL"]!;
		this.RPC_GATEWAY_LABEL = process.env["RPC_GATEWAY_LABEL"]!;
		this.RPC_GATEWAY_PORT = process.env["RPC_GATEWAY_PORT"]!;
		this.RPC_GATEWAY_ROOT_URL = process.env["RPC_GATEWAY_ROOT_URL"]!;
		this.RPC_GATEWAY_MAINNET_URL = process.env["RPC_GATEWAY_MAINNET_URL"]!;
		this.RPC_GATEWAY_TESTNET_URL = process.env["RPC_GATEWAY_TESTNET_URL"]!;
		this.ARCHIVE_NODES_URL = process.env["ARCHIVE_NODES_URL"]!;
		this.ARCHIVE_NODES_PORT = process.env["ARCHIVE_NODES_PORT"]!;
		this.ROLLING_NODES_URL = process.env["ROLLING_NODES_URL"]!;
		this.ROLLING_NODES_PORT = process.env["ROLLING_NODES_PORT"]!;
		this.TEZOS_NETWORK = process.env["TEZOS_NETWORK"]!;
	}
	public async validate() {
		await validateOrReject(this);
		return this;
	}
}


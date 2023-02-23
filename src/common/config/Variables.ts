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
	public readonly NEXT_PUBLIC_API_HOSTNAME!: string;

	@IsOptional()
	public readonly NEXT_PUBLIC_API_LABEL!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_API_PORT!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_API_ROOT_URL!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME!: string;

	@IsOptional()
	public readonly NEXT_PUBLIC_RPC_GATEWAY_LABEL!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_RPC_GATEWAY_PORT!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_PROXY_MAINNET_URL!: string;

	@IsNotEmpty()
	public readonly NEXT_PUBLIC_PROXY_TESTNET_URL!: string;

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
		this.NEXT_PUBLIC_API_HOSTNAME = process.env["NEXT_PUBLIC_API_HOSTNAME"]!;
		this.NEXT_PUBLIC_API_LABEL = process.env["NEXT_PUBLIC_API_LABEL"]!;
		this.NEXT_PUBLIC_API_PORT = process.env["NEXT_PUBLIC_API_PORT"]!;
		this.NEXT_PUBLIC_API_ROOT_URL = process.env["NEXT_PUBLIC_API_ROOT_URL"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME = process.env["NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_LABEL = process.env["NEXT_PUBLIC_RPC_GATEWAY_LABEL"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_PORT = process.env["NEXT_PUBLIC_RPC_GATEWAY_PORT"]!;
		this.NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL = process.env["NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL"]!;
		this.NEXT_PUBLIC_PROXY_MAINNET_URL = process.env["NEXT_PUBLIC_PROXY_MAINNET_URL"]!;
		this.NEXT_PUBLIC_PROXY_TESTNET_URL = process.env["NEXT_PUBLIC_PROXY_TESTNET_URL"]!;
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


import { Service } from "typedi";
import { validateOrReject, IsNotEmpty, IsOptional } from "class-validator";
import dotenv from "dotenv";

@Service()
export class BackendVariables {
	@IsNotEmpty({ groups: ["rpc_gateway", "api"] })
	public readonly DATABASE_PORT!: string;

	@IsNotEmpty({ groups: ["rpc_gateway", "api"] })
	public readonly DATABASE_HOSTNAME!: string;

	@IsNotEmpty({ groups: ["rpc_gateway", "api"] })
	public readonly DATABASE_USER!: string;

	@IsNotEmpty({ groups: ["rpc_gateway", "api"] })
	public readonly DATABASE_PASSWORD!: string;

	@IsNotEmpty({ groups: ["rpc_gateway", "api"] })
	public readonly DATABASE_NAME!: string;

	@IsOptional({ groups: ["api"] })
	public readonly API_LABEL!: string;

	@IsNotEmpty({ groups: ["api"] })
	public readonly API_PORT!: string;

	@IsNotEmpty({ groups: ["api"] })
	public readonly API_ROOT_URL!: string;

	@IsOptional({ groups: ["rpc_gateway"] })
	public readonly RPC_GATEWAY_LABEL!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly RPC_GATEWAY_PORT!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly RPC_GATEWAY_ROOT_URL!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly ARCHIVE_NODES_URL!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly ARCHIVE_NODES_PORT!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly ROLLING_NODES_URL!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly ROLLING_NODES_PORT!: string;

	@IsNotEmpty({ groups: ["rpc_gateway"] })
	public readonly TEZOS_NETWORK!: string;

	public readonly NODE_ENV = process.env.NODE_ENV;

	public constructor() {
		dotenv.config();
		this.DATABASE_PORT = process.env["DATABASE_PORT"]!;
		this.DATABASE_HOSTNAME = process.env["DATABASE_HOSTNAME"]!;
		this.DATABASE_USER = process.env["DATABASE_USER"]!;
		this.DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"]!;
		this.DATABASE_NAME = process.env["DATABASE_NAME"]!;
		this.API_LABEL = process.env["API_LABEL"]!;
		this.API_PORT = process.env["API_PORT"]!;
		this.API_ROOT_URL = process.env["API_ROOT_URL"]!;
		this.RPC_GATEWAY_LABEL = process.env["RPC_GATEWAY_LABEL"]!;
		this.RPC_GATEWAY_PORT = process.env["RPC_GATEWAY_PORT"]!;
		this.RPC_GATEWAY_ROOT_URL = process.env["RPC_GATEWAY_ROOT_URL"]!;
		this.ARCHIVE_NODES_URL = process.env["ARCHIVE_NODES_URL"]!;
		this.ARCHIVE_NODES_PORT = process.env["ARCHIVE_NODES_PORT"]!;
		this.ROLLING_NODES_URL = process.env["ROLLING_NODES_URL"]!;
		this.ROLLING_NODES_PORT = process.env["ROLLING_NODES_PORT"]!;
		this.TEZOS_NETWORK = process.env["TEZOS_NETWORK"]!;
	}
	public async validate(groups?: string[]) {
		const validationOptions = groups ? { groups } : undefined;
		await validateOrReject(this, validationOptions);
		return this;
	}
}


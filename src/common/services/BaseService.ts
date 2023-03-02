import { BackendVariables } from "@Common/config/Variables";
import Container from "typedi";

export default abstract class BaseService {
	/** @TODO place methods in a config file */
	public static readonly whitelisted: string[] = ["/chains/main/blocks"];
	public static readonly blacklisted: string[] = ["/context/contracts", "/monitor", "/network"];
	public static readonly rollingPatterns: string[] = ["/head", "/injection/operation"];
	public static readonly network: string = Container.get(BackendVariables).TEZOS_NETWORK;
}


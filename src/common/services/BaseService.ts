import { BackendVariables } from "@Common/config/variables/Variables";
import Container from "typedi";

export default abstract class BaseService {
	public static readonly whitelisted: string[] = ["/chains/main/blocks", "/chains/main/blocks/head"];
	public static readonly blacklisted: string[] = ["/context/contracts", "/monitor", "/network"];
	public static readonly rollingPatterns: string[] = ["/head", "/injection/operation"];
	public static readonly network: string = Container.get(BackendVariables).TEZOS_NETWORK;
}

import { BackendVariables } from "@Common/config/Variables";
import Container from "typedi";

export default abstract class BaseService {
	public static readonly whitelisted: string[] = ["/chains/main/blocks(.*?)", "/mockserver/status"];
	public static readonly blacklisted: string[] = ["(.*?)context/contracts$", "/monitor(.*?)", "/network(.*?)"];
	public static readonly rollingPatterns: string[] = ["(.*?)context/contracts$", "/monitor(.*?)", "/network(.*?)"];
	public static readonly network: string = Container.get(BackendVariables).TEZOS_NETWORK;
}


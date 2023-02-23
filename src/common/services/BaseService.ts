export default abstract class BaseService {
    public readonly whitelisted: string[] = ["/chains/main/blocks(.*?)", "/mockserver/status"];
    public readonly blacklisted: string[] = ["(.*?)context/contracts$", "/monitor(.*?)", "/network(.*?)"];
    public readonly rollingPatterns: string[] = ["(.*?)context/contracts$", "/monitor(.*?)", "/network(.*?)"];
    public readonly network: string = "mainnet";

    protected constructor() {}

    protected isWhitelisted(url: string): boolean {
        return this.whitelisted.some((item) => new RegExp(item).test(url));
    }
    
    protected isBlacklisted(url: string): boolean {
        return this.blacklisted.some((item) => new RegExp(item).test(url));
    }
}


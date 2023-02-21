export default abstract class BaseService {
    private readonly whitelisted: string[] = ["/chains/main/blocks(.*?)", "/mockserver/status"];
    private readonly blacklisted: string[] = ["(.*?)context/contracts$", "/monitor(.*?)", "/network(.*?)"];

    protected constructor() {}

    protected isWhitelisted(url: string): boolean {
        return this.whitelisted.some((item) => new RegExp(item).test(url));
    }
    
    protected isBlacklisted(url: string): boolean {
        return this.blacklisted.some((item) => new RegExp(item).test(url));
    }
}


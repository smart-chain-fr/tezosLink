import BaseService from "@Services/BaseService";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsRpcPathAllowed" })
export default class IsRpcPathAllowed implements ValidatorConstraintInterface {
	public validate(path: string) {
		return isAllowed(path);
	}

	public defaultMessage() {
		return `not a valid path!`;
	}
}

function isAllowed(path: string): boolean {
	const pureUrl = `/${path!.trim()}`;
	let nonWhitelistedPart = "";
	for (const whitelistPath of BaseService.whitelisted) {
		if (pureUrl.includes(whitelistPath)) {
			nonWhitelistedPart = pureUrl.slice(pureUrl.indexOf(whitelistPath) + whitelistPath.length);
			break;
		}
	}
	for (const blacklistPath of BaseService.blacklisted) {
		if (nonWhitelistedPart.includes(blacklistPath) || pureUrl.includes(blacklistPath)) {
			return false;
		}
	}
	return true;
}


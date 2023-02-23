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

function isAllowed(url: string): boolean {
	let isPathAllowed = false;
	const urls = url.split("?");
	url = "/" + urls[0]!.trim();

	for (const whiteListedPaths of BaseService.whitelisted) {
		if (whiteListedPaths.includes(url)) {
			isPathAllowed = true;
			for (const bl of BaseService.blacklisted) {
				if (bl.includes(url)) {
					isPathAllowed = false;
					break;
				}
			}
			break;
		}
	}

	return isPathAllowed;
}


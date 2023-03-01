export function getUUIDFromPath(path: string, re: RegExp): string {
	let uuid = "";
	const matches = path.match(re);
	if (matches !== null) {
		uuid = matches[matches.length - 1]!;
	}
	return uuid;
}

export function getRPCFromPath(basePath: string, path: string, re: RegExp): string {
	return path.replace("/" + basePath + getUUIDFromPath(path, re), "");
}


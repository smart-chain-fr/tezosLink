export class ORMBadQueryError extends Error {
	constructor(message: string, public error: Error) {
		super(message);
	}
}
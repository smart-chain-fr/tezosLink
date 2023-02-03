import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: "IsValidUuid" })
export default class IsValidUuid implements ValidatorConstraintInterface {

	public validate(uuid: string, args: ValidationArguments) {
		const isUuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return isUuidRegex.test(uuid);
	}

	public defaultMessage() {
		return `not a valid uuid!`;
	}
}

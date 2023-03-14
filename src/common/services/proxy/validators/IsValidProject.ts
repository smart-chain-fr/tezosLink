import ProjectsRepository from "@Repositories/projects/ProjectsRepository";
import BaseService from "@Services/BaseService";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import Container from "typedi";
import { RpcRequest } from "../ProxyService";


@ValidatorConstraint({ name: "IsValidProject" })
export default class IsValidProject implements ValidatorConstraintInterface {
	public async validate(uuid: string, args: ValidationArguments) {
		const projectRepository = Container.get(ProjectsRepository);

		if (args.constraints?.[0]?.network) {
			return Boolean(await projectRepository.findOne({ uuid, network: BaseService.network }));
		}
		return false;
	}

	public defaultMessage(args: ValidationArguments) {
		const network = args.constraints?.[0]!.network;
		const uuid = (args.object as RpcRequest).uuid;
		return `Project uuid: ${uuid} with network: ${network} does not exist`;
	}
}


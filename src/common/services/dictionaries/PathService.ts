import { TypeOfRequestEntity } from "@Common/ressources";
import TypeOfRequestRepository from "@Repositories/dictionnaries/TypeOfRequetsRepository";
import BaseService from "@Services/BaseService";
import { Service } from "typedi";

@Service()
export default class TypeOfRequestService extends BaseService {
	constructor(private typeOfRequestRepository: TypeOfRequestRepository) {
		super();
	}

	/**
	 * Get pods by criterias
	 * @returns {Promise<TypeOfRequestEntity[]>}
	 * @memberof PathService
	 * */
	public async getAllPaths(): Promise<TypeOfRequestEntity[]> {
		return await this.typeOfRequestRepository.findAll();
	}
	/**
	 * Save or update pod in database
	 * @param {TypeOfRequestEntity} typeOfRequestEntity
	 * @returns {Promise<TypeOfRequestEntity>}
	 * @memberof PathService
	 * */
	public async saveIfNotExists(typeOfRequestEntity: Partial<TypeOfRequestEntity>): Promise<Partial<TypeOfRequestEntity>> {
		return await this.typeOfRequestRepository.createIfNotExists(typeOfRequestEntity);
	}
}

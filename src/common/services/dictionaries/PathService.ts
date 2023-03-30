import { TypeOfRequestEntity } from "@Common/ressources";
import TypeOfRequestRepository from "@Repositories/dictionnaries/TypeOfRequetsRepository";
import BaseService from "@Services/BaseService";
import { Service } from "typedi";

@Service()
export default class PathService extends BaseService {
	constructor(private pathRepository: TypeOfRequestRepository) {
		super();
	}

	/**
	 * Get pods by criterias
	 * @returns {Promise<PathEntity[]>}
	 * @memberof PathService
	 * */
	public async getAllPaths(): Promise<TypeOfRequestEntity[]> {
		return await this.pathRepository.findAll();
	}
	/**
	 * Save or update pod in database
	 * @param {PathEntity} pathEntity
	 * @returns {Promise<PathEntity>}
	 * @memberof PathService
	 * */
	public async saveIfNotExists(pathEntity: Partial<TypeOfRequestEntity>): Promise<Partial<TypeOfRequestEntity>> {
		return await this.pathRepository.createIfNotExists(pathEntity);
	}
}

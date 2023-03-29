import { PathEntity } from "@Common/ressources";
import PathRepository from "@Repositories/dictionnaries/PathRepository";
import BaseService from "@Services/BaseService";
import { Service } from "typedi";

@Service()
export default class PathService extends BaseService {
	constructor(private pathRepository: PathRepository) {
		super();
	}

	/**
	 * Get pods by criterias
	 * @returns {Promise<PathEntity[]>}
	 * @memberof PathService
	 * */
	public async getAllPaths(): Promise<PathEntity[]> {
		return await this.pathRepository.findAll();
	}
	/**
	 * Save or update pod in database
	 * @param {PathEntity} pathEntity
	 * @returns {Promise<PathEntity>}
	 * @memberof PathService
	 * */
	public async saveIfNotExists(pathEntity: Partial<PathEntity>): Promise<Partial<PathEntity>> {
		return await this.pathRepository.createIfNotExists(pathEntity);
	}
}

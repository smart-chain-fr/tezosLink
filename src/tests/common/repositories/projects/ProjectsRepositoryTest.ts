import { Container } from "typedi";
import { beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import ProjectEntity from "@Entities/projects/ProjectEntity"
import ProjectsRepository from "@Repositories/projects/ProjectsRepository";

export default () => {
	describe("ProjectsRepository", () => {
		let projectsRepository: ProjectsRepository;

		const projectEntity =
			ObjectHydrate.hydrate(new ProjectEntity(),
				{ title: "title", network: "network" }
			);

		beforeAll(async () => {
			projectsRepository = await Container.get(ProjectsRepository);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without a valid uuid", async () => {
				await expect(
					projectsRepository.delete(projectEntity)
				).rejects.toBeInstanceOf(Error);
			});

			it("cannot delete entities without an existing uuid", async () => {
				const projectEntityWithUUID =
					ObjectHydrate.hydrate(new ProjectEntity(),
						{ title: "title", network: "network", uuid: uuidv4() }
					);
				await expect(
					projectsRepository.delete(projectEntityWithUUID)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				const createdEntity = await projectsRepository.create(projectEntity);
				expect(createdEntity).toBeDefined();
				await projectsRepository.delete(createdEntity);
			});
		});

		describe("⤞ Postcondition tests", () => {
			it("can delete newly created entities", async () => {
				const createdEntity = await projectsRepository.create(projectEntity);
				await expect(projectsRepository.delete(createdEntity)).resolves.toBeUndefined();
			});

			it("can find newly created entities", async () => {
				const createdEntity = await projectsRepository.create(projectEntity);
				await expect(projectsRepository.findOne(createdEntity)).resolves.toEqual(createdEntity);
				await projectsRepository.delete(createdEntity);
			});

			it("can find newly created entities by prisma query", async () => {
				const createdEntity = await projectsRepository.create(projectEntity);
				await expect(projectsRepository.findMany(
					{
						where: { title: createdEntity.title },
						include: { Metrics: true }
					}
				)).resolves.toEqual([createdEntity]);
				await projectsRepository.delete(createdEntity);
			});
		});
	});
};

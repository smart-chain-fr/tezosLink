import { Container } from "typedi";
import { beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import ProjectEntity from "@Entities/projects/ProjectEntity"
import ProjectsService from "@Services/project/ProjectsService";

export default () => {
	describe("ProjectsService", () => {
		let projectsService: ProjectsService;

		const projectEntity =
			ObjectHydrate.hydrate(new ProjectEntity(),
				{ title: "title", network: "network" }
			);

		beforeAll(async () => {
			projectsService = await Container.get(ProjectsService);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without a valid uuid", async () => {
				await expect(
					projectsService.delete(projectEntity)
				).rejects.toBeInstanceOf(Error);
			});

			it("cannot delete entities without an existing uuid", async () => {
				const projectEntityWithUUID =
					ObjectHydrate.hydrate(new ProjectEntity(),
						{ title: "title", network: "network", uuid: uuidv4() }
					);
				await expect(
					projectsService.delete(projectEntityWithUUID)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				const createdEntity = await projectsService.create(projectEntity);
				expect(createdEntity).toBeDefined();
				await projectsService.delete(createdEntity);
			});
		});

		describe("⤞ Postcondition tests", () => {
			it("can delete newly created entities", async () => {
				const createdEntity = await projectsService.create(projectEntity);
				await expect(projectsService.delete(createdEntity)).resolves.toBeUndefined();
			});

			it("can find newly created entities", async () => {
				const createdEntity = await projectsService.create(projectEntity);
				await expect(projectsService.getByUUID(createdEntity)).resolves.toEqual(createdEntity);
				await projectsService.delete(createdEntity);
			});
		});
	});
};

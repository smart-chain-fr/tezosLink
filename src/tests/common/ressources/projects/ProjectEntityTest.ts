import { describe, it } from "@jest/globals";
import { validateOrReject } from "class-validator";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import ProjectEntity from "@Entities/projects/ProjectEntity"

export default () => {
	describe("ProjectEntity", () => {
		it("must be hydrated", () => {
			expect(
				validateOrReject(new ProjectEntity(), { groups: ["create"] })
			).rejects.toBeTruthy();
		});
		it("must have non empty title and network", () => {
			const projectEntity =
				ObjectHydrate.hydrate(new ProjectEntity(),
					{ title: "title", network: "network" }
				);
			expect(
				validateOrReject(projectEntity, { groups: ["create"] })
			).resolves.toBeUndefined();
		});
	});
};

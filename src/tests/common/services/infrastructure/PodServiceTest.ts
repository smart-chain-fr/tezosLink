import { Container } from "typedi";
import { beforeAll, describe, it } from "@jest/globals";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import PodEntity from "@Entities/infrastructure/PodEntity"
import PodService from "@Services/infrastructure/PodService";

export default () => {
	describe("PodService", () => {
		let podService: PodService;

		const podEntity: PodEntity =
			ObjectHydrate.hydrate(new PodEntity(),
				{ name: "name", phase: "phase", type: "type" }
			);

		beforeAll(async () => {
			podService = await Container.get(PodService);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without an existing name", async () => {
				expect(
					podService.delete(podEntity)
				).rejects.toBeInstanceOf(Error);
			});
		});
	});
};

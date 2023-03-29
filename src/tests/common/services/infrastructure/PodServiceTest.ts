import { Container } from "typedi";
import { beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import PodEntity from "@Entities/infrastructure/PodEntity"
import PodService from "@Services/infrastructure/PodService";

export default () => {
	describe("PodService", () => {
		let podService: PodService;

		const podEntity: PodEntity =
			ObjectHydrate.hydrate(new PodEntity(),
				{ name: "name", namespace: "namespace", type: "type" }
			);

		beforeAll(async () => {
			podService = await Container.get(PodService);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without an existing name", async () => {
				await expect(
					podService.delete(podEntity)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				const newEntity =
					ObjectHydrate.hydrate(new PodEntity(),
						{ name: uuidv4(), namespace: "namespace", type: "type" }
					);
				const createdEntity = await podService.saveOrUpdatePod(newEntity);
				expect(createdEntity).toBeDefined();
				await podService.delete(createdEntity);
			});
		});

		describe("⤞ Postcondition tests", () => {
			it("updates only the namespace property on existing entities name", async () => {
				const newEntity =
					ObjectHydrate.hydrate(new PodEntity(),
						{ name: uuidv4(), namespace: "namespace", type: "type" }
					);
				const updatedEntity =
					ObjectHydrate.hydrate(new PodEntity(),
						{ ...newEntity, namespace: "other_namespace", type: "other_type" }
					)
				await podService.saveOrUpdatePod(newEntity);
				await expect(podService.saveOrUpdatePod(updatedEntity)).resolves.toMatchObject(
					{ ...newEntity, namespace: updatedEntity.namespace }
				);
				await podService.delete(newEntity);
			});
		});
	});
};

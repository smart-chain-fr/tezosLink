import { Container } from "typedi";
import { beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import PodEntity from "@Entities/infrastructure/PodEntity"
import PodService from "@Services/infrastructure/PodService";
import MetricInfrastructureEntity from "@Entities/infrastructure/MetricInfrastructureEntity"
import MetricInfrastructureService from "@Services/infrastructure/MetricInfrastructureService";

export default () => {
	describe("MetricInfrastructureService", () => {
		let podService: PodService;
		let podEntity: Partial<PodEntity>;

		let metricInfrastructureService: MetricInfrastructureService;
		let metricInfrastructureEntity: MetricInfrastructureEntity;

		beforeAll(async () => {
			podService = await Container.get(PodService);

			podEntity = await podService.saveOrUpdatePod(
				ObjectHydrate.hydrate(new PodEntity(),
					{ name: "name", namespace: "namespace", type: "type" }
				)
			);
		});

		beforeAll(async () => {
			metricInfrastructureService = await Container.get(MetricInfrastructureService);
			metricInfrastructureEntity =
				ObjectHydrate.hydrate(new MetricInfrastructureEntity(),
					{ uuid: uuidv4()
					, podName: podEntity.name
					, value: "value"
					, dateRequested: new Date()
					, type: "type"
					, pod: podEntity as PodEntity
					}
				);
		});

		afterAll(async () => {
			await podService.delete(podEntity);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without an existing name", async () => {
				await expect(
					metricInfrastructureService.delete(metricInfrastructureEntity)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				const createdEntity = await metricInfrastructureService.saveMetric(metricInfrastructureEntity);
				expect(createdEntity).toBeDefined();
				await metricInfrastructureService.delete(createdEntity);
			});
		});

		describe("⤞ Postcondition tests", () => {
			it("cannot find non-existing entities by criteria", async () => {
				await expect(metricInfrastructureService.getByCriterias(
					{ where: { uuid: metricInfrastructureEntity.uuid! }
					, include: { pod: true }
					}
				)).resolves.toMatchObject({ data: [] });
			});

			it("can find newly created entities by criteria", async () => {
				const createdEntity = await metricInfrastructureService.saveMetric(metricInfrastructureEntity);
				await expect(metricInfrastructureService.getByCriterias(
					{ where: { uuid: createdEntity.uuid! }
					, include: { MetricInfrastructure: true }
					}
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricInfrastructureService.delete(createdEntity);
			});
		});
	});
};

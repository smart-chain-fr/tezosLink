import { Container } from "typedi";
import { afterAll, beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import MetricEntity from "@Entities/metrics/MetricEntity"
import ProjectEntity from "@Entities/projects/ProjectEntity"
import MetricsService from "@Services/metric/MetricsService";
import ProjectsService from "@Services/project/ProjectsService";

export default () => {
	describe("MetricsService", () => {
		let projectsService: ProjectsService;
		let projectEntity: Partial<ProjectEntity>;

		let metricsService: MetricsService;
		let metricEntity: MetricEntity;

		beforeAll(async () => {
			projectsService = await Container.get(ProjectsService);

			projectEntity = await projectsService.create(
				ObjectHydrate.hydrate(new ProjectEntity(),
					{ title: "title", network: "network" }
				)
			);
		});

		beforeAll(async () => {
			metricsService = await Container.get(MetricsService);

			metricEntity =
				ObjectHydrate.hydrate(new MetricEntity(),
					{ uuid: uuidv4()
					, path: "path"
					, remoteAddress: "remoteAddress"
					, dateRequested: new Date()
					, node: "node"
					, status: "status"
					, projectUuid: projectEntity.uuid
					, project: projectEntity as ProjectEntity
				 	}
				);
		});

		afterAll(async () => {
			await projectsService.delete(projectEntity);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without an existing uuid", async () => {
				const metricEntityWithUUID =
					ObjectHydrate.hydrate(new MetricEntity(),
						{ uuid: uuidv4() }
					);
				await expect(
					metricsService.delete(metricEntityWithUUID)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				expect(createdEntity).toBeDefined();
				await metricsService.delete(createdEntity);
			});
		});

		describe("⤞ Postcondition tests", () => {
			it("can delete newly created entities", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.delete(createdEntity)).resolves.toBeUndefined();
			});

			it("can find newly created entities", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getLastMetrics(projectEntity.uuid!, 1)).resolves.toMatchObject([createdEntity]);
				await metricsService.delete(createdEntity);
			});

			it("can find newly created entities by criteria", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getByCriterias(
					{ where: createdEntity }
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricsService.delete(createdEntity);
			});

			it("can get the last metric", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getLastMetrics(projectEntity.uuid!, 1)).resolves.toHaveLength(1);
				await metricsService.delete(createdEntity);
			});

			it("can get a metric by criteria", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getByCriterias(
					{ where: createdEntity, take: 1 }
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricsService.delete(createdEntity);
			});

			it("is safe to ask for zero last metrics", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getLastMetrics(projectEntity.uuid!, 0)).resolves.toMatchObject([createdEntity]);
				await metricsService.delete(createdEntity);
			});

			it("is safe to ask for zero metrics by criteria", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getByCriterias(
					{ where: createdEntity, take: 0 }
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricsService.delete(createdEntity);
			});

			it("is safe to ask for a negative number of last metrics", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getLastMetrics(projectEntity.uuid!, -1)).resolves.toMatchObject([createdEntity]);
				await metricsService.delete(createdEntity);
			});

			it("is safe to ask for a negative number of metrics by criteria", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getByCriterias(
					{ where: createdEntity, take: -1 }
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricsService.delete(createdEntity);
			});

			it("has a metric count down to zero for non-existing project uuid", async () => {
				const badMetricEntity: MetricEntity =
					ObjectHydrate.hydrate(
						new MetricEntity(),
						{ ...metricEntity, projectUuid: uuidv4() }
					);
				await expect(metricsService.getCountAllMetricsByCriterias(badMetricEntity)).resolves.toBe(0);
			});

			it("has the right metrics count after one insertion", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getCountAllMetricsByCriterias(createdEntity)).resolves.toBe(1);
				await metricsService.delete(createdEntity);
			});
		});
	});
};

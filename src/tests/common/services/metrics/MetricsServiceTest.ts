import { Container } from "typedi";
import { afterAll, beforeAll, describe, it } from "@jest/globals";

import { v4 as uuidv4 } from "uuid";

import { CountRpcPathUsage } from "@Common/repositories/metrics/MetricsRepository";

import MetricEntity from "@Entities/metrics/MetricEntity"
import MetricsService from "@Services/metric/MetricsService";
import ObjectHydrate from "@Common/helpers/ObjectHydrate"
import ProjectEntity from "@Entities/projects/ProjectEntity"
import ProjectsService from "@Services/project/ProjectsService";

function newMetricEntity(projectEntity: Partial<ProjectEntity>, metricEntity?: Partial<MetricEntity>): MetricEntity {
	let newEntity = ObjectHydrate.hydrate(new MetricEntity(),
			{ uuid: uuidv4()
			, path: "path"
			, remoteAddress: "remoteAddress"
			, dateRequested: new Date()
			, node: "node"
			, status: "status"
			, projectUuid: projectEntity.uuid!
			, project: projectEntity as ProjectEntity
			});

	if (metricEntity) {
		ObjectHydrate.hydrate(newEntity, metricEntity);
	}

	return newEntity;
}

function adjustDate(date: Date, miliseconds: number): Date {
	return new Date(date.getTime() + miliseconds);
}

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
			metricEntity = newMetricEntity(projectEntity);
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

			it("has the right rpc path count after one insertion", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				const expectedRpcPathUsage =
					ObjectHydrate.hydrate(
						new CountRpcPathUsage(), { path: createdEntity.path!, count: 1 }
					)
				await expect(metricsService.getCountRpcPath(
					{ projectUuid: createdEntity.projectUuid! }
				)).resolves.toEqual([expectedRpcPathUsage]);
				await metricsService.delete(createdEntity);
			});

			it("gives empty group metrics requested by day after zero insertion", async () => {
				await expect(metricsService.getRequestsByDay(
					{ projectUuid: projectEntity.uuid! }
				)).resolves.toEqual([]);
			});

			it("gives valid group metrics by day after one insertion", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getRequestsByDay(
					{ projectUuid: createdEntity.projectUuid! }
				)).resolves.toMatchObject([{ count: 1 }]);
				await metricsService.delete(createdEntity);
			});

			it("gives valid group metrics by day after two insertions", async () => {
				const createdEntity1 = await metricsService.create(newMetricEntity(projectEntity));
				const createdEntity2 = await metricsService.create(newMetricEntity(projectEntity));
				await expect(metricsService.getRequestsByDay(
					{ projectUuid: projectEntity.uuid! }
				)).resolves.toMatchObject([{ count: 2 }]);
				await metricsService.delete(createdEntity1);
				await metricsService.delete(createdEntity2);
			});

			it("gives empty group metrics requested by day with out-of-range constraints", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getRequestsByDay(
					{ projectUuid: createdEntity.projectUuid!, from: adjustDate(metricEntity.dateRequested, 1).toISOString() }
				)).resolves.toMatchObject([]);
				await expect(metricsService.getRequestsByDay(
					{ projectUuid: createdEntity.projectUuid!, to: adjustDate(metricEntity.dateRequested, -1).toISOString() }
				)).resolves.toMatchObject([]);
				await metricsService.delete(createdEntity);
			});

			it("can find newly created entity after removeThreeMontsOldMetrics", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.removeThreeMontsOldMetrics()).resolves.toBeUndefined();
				await expect(metricsService.getByCriterias(
					{ where: createdEntity }
				)).resolves.toMatchObject({ data: [ createdEntity ] });
				await metricsService.delete(createdEntity);
			});

			it("cannot find an old entity after removeThreeMontsOldMetrics", async () => {
				let metricEntity = newMetricEntity(projectEntity);
				metricEntity.dateRequested.setMonth(metricEntity.dateRequested.getMonth() - 4);
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.removeThreeMontsOldMetrics()).resolves.toBeUndefined();
				await expect(metricsService.getByCriterias(
					{ where: createdEntity }
				)).resolves.toMatchObject({ data: [] });
			});

			it("gives a valid path dictionary after one insertion", async () => {
				const createdEntity = await metricsService.create(metricEntity);
				await expect(metricsService.getPathDictionary()).resolves.toEqual([metricEntity.path]);
				await metricsService.delete(createdEntity);
			});

			it("gives a valid path dictionary with multiple path occurence", async () => {
				const createdEntity1 = await metricsService.create(newMetricEntity(projectEntity));
				const createdEntity2 = await metricsService.create(newMetricEntity(projectEntity));
				await expect(metricsService.getPathDictionary()).resolves.toEqual([metricEntity.path]);
				await metricsService.delete(createdEntity1);
				await metricsService.delete(createdEntity2);
			});

			it("gives a valid path dictionary with multiple path occurence", async () => {
				const createdEntity1 = await metricsService.create(
					newMetricEntity(projectEntity, { path: "path1" })
				);
				const createdEntity2 = await metricsService.create(
					newMetricEntity(projectEntity, { path: "path2" })
				);
				expect((await metricsService.getPathDictionary()).sort()).toEqual(
					[createdEntity1.path, createdEntity2.path].sort()
				);
				await metricsService.delete(createdEntity1);
				await metricsService.delete(createdEntity2);
			});
		});
	});
};

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
					, remote_address: "remote_address"
					, date_requested: new Date()
					, projectUuid: projectEntity.uuid
					, project: projectEntity as ProjectEntity
				 	}
				);
		});

		afterAll(async () => {
			projectsService.delete(projectEntity);
		});

		describe("🗹 Validity tests", () => {
			it("cannot delete entities without an existing uuid", async () => {
				const metricEntityWithUUID =
					ObjectHydrate.hydrate(new MetricEntity(),
						{ uuid: uuidv4() }
					);
				expect(
					metricsService.delete(metricEntityWithUUID)
				).rejects.toBeInstanceOf(Error);
			});

			it("can create entities", async () => {
				console.log(metricEntity);
				const createdEntity = await metricsService.create(metricEntity);
				expect(createdEntity).toBeDefined();
				metricsService.delete(createdEntity);
			});
		});
	});
};

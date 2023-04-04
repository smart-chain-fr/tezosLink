import { Container } from "typedi";
import TypeOfRequestController from "./dictionaries/TypeOfRequestsController";
import InfrastructureController from "./infrastructure/InfrastructureController";
import MetricsController from "./metrics/MetricsController";
import ProjectsController from "./projects/ProjectsController";

export default {
	start: () => {
		Container.get(ProjectsController);
		Container.get(MetricsController);
		Container.get(InfrastructureController);
		Container.get(TypeOfRequestController);
	},
};

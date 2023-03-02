import { Container } from "typedi";
import MetricsController from "./metrics/MetricsController";
import ProjectsController from "./projects/ProjectsController";

export default {
    start: () => {
        Container.get(ProjectsController);
        Container.get(MetricsController);
    }
}

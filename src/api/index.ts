import { Container } from "typedi";
import ProjectController from "./ProjectController";

export default {
    start: () => {
        Container.get(ProjectController);
    }
}




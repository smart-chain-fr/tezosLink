import { Container } from "typedi";
import Home from "./Home";
import Page2 from "./Page2";

export default {
    start: () => {
        Container.get(Home);
        Container.get(Page2);
    }
}
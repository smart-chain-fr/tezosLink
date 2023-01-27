import Home from "./Home";
import { Container } from "typedi";

export default {
    start:() => {
        Container.get(Home);
    } 
}
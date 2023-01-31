import { Container } from "typedi";
import Rpc from "./Rpc";


export default {
    start: () => {
        Container.get(Rpc);
    }
}
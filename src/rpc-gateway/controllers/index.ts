import { Container } from "typedi";
import Rpc from "./ProxyController";


export default {
    start: () => {
        Container.get(Rpc);
    }
}
import "module-alias/register";
import "reflect-metadata";
import dotenv from "dotenv";
import { Container } from "typedi";
import Server from "./Server";
import routes from "./routes";
import EventEmitter from "@Services/EventEmitter";
console.log(EventEmitter);
dotenv.config();

Container.get(Server).init();
routes.start();




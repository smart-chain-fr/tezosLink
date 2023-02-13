import { Service } from "typedi";
import BaseController from "@Common/system/controller-pattern/BaseController";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";

@Service()
export default abstract class ApiController extends BaseController {}

export { HttpCodes as ResponseStatusCodes };


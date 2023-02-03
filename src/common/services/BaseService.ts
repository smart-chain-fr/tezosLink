import ObjectHydrate from "@Common/helpers/ObjectHydrate";
import { IsNumber, IsObject, IsOptional } from "class-validator";

export class QueryService<Q = any> {
  @IsOptional()
  @IsNumber()
  page?: number | null = null;

  @IsOptional()
  @IsNumber()
  limit?: number | null = null;

  @IsOptional()
  @IsObject()
  sort?: { [key: string]: 1 | -1 } | null = null;

  @IsOptional()
  @IsObject()
  query?: Q | null = null;

  public static createFrom<Q = any>(object: { [key: string]: any }): typeof QueryService {
    return ObjectHydrate.hydrate(new this<Q>(), object);
}
}

export default class BaseService {
/*  WIP - Handling pagination  */
}

import { plainToClassFromExist } from "class-transformer";

export default abstract class ObjectHydrate {
	public static hydrate<T = { [key: string]: any }>(object: { [key: string]: any }, from: { [key: string]: any }): T {
		return plainToClassFromExist(object, from) as T;
	}
}

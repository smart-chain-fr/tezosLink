import { type ClassTransformOptions, plainToClass, plainToClassFromExist } from "class-transformer";

export default abstract class ObjectHydrate {
	public static hydrate<T = {}>(object: T, from: Partial<T>, options?: ClassTransformOptions): T {
		return plainToClassFromExist(object, from, options);
	}

	public static map<T = {}>(ClassEntity: { new (): T }, fromArray: Partial<T>[], options?: ClassTransformOptions): T[] {
		return fromArray.map((from) => {
			return plainToClass(ClassEntity, from, options);
		});
	}
}

import { describe, test, it } from "@jest/globals";
import ObjectHydrate from "@Common/helpers/ObjectHydrate";

class User {
	public age!: number;

	isAdult(): boolean {
		return this.age >= 18;
	}
}

export default () => {
	describe("ObjectHydrate", () => {
		describe("Hydrate plain object from plain object", () => {
			test("hydrate from an empty object is the identity", () => {
				const object = { id: 1 };
				const from = {};
				expect(ObjectHydrate.hydrate(object, from)).toEqual({ id: 1 });
			});
			test("hydrate an empty object returns the source object", () => {
				const object = {};
				const from = { id: 1 };
				expect(ObjectHydrate.hydrate(object, from)).toEqual(from);
			});
			it("can hydrate an object with more properties", () => {
				const object = { id: 0 };
				const from = { id: 1, age: 27 };
				expect(ObjectHydrate.hydrate(object, from)).toEqual(from);
			});
			it("can hydrate an object partially", () => {
				const object = { id: 0, age: 27 };
				const from = { id: 1 };
				expect(ObjectHydrate.hydrate(object, from)).toEqual({ id: 1, age: 27 });
			});
		});
		describe("Hydrate class object from plain object", () => {
			test("hydrate modifies the instance object in-place", () => {
				const object = new User();
				const from = { age: 27 };
				ObjectHydrate.hydrate(object, from);
				expect(object.isAdult()).toBe(true);
			});
			it("can hydrate a class object with non-class properties", () => {
				const object = new User();
				const from = { age: 27, id: 0 };
				ObjectHydrate.hydrate(object, from);
				expect(Object(object).id).toEqual(from.id);
			});
			it("can hydrate an array of objects", () => {
				const from = [{ age: 18 }, { age: 19 }, { age: 27 }];
				const objects = ObjectHydrate.map(User, from);
				expect(objects.every((user) => user.isAdult())).toBe(true);
			});
		});
		describe("Hydrate plain object from class object", () => {
			it("can hydrate a plain object with class object", () => {
				const object = new User();
				const from = { age: 27 };
				ObjectHydrate.hydrate(object, from);
				expect(ObjectHydrate.hydrate({}, object)).toEqual(from);
			});
		});
	});
};

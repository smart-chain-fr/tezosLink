export type IFunctionBinder = (next?: IFunctionBinder) => Promise<void>;
/**
 * @description execute functions on body of another function
 * @example `
 * 	const binders = [fooA, fooB, fooC];
 *
 *  //Will be something like
 * 	function fooA(fooB, fooC, next) {
 * 		//code...
 * 		fooB(fooC, next);
 * 		//code...
 * 	}
 * 	function fooB(fooC, next) {
 * 		//code...
 * 		fooC(next);
 * 		//code...
 * 	}
 *
 *  function fooC(next) {
 * 		//code...
 * 		next();
 * 		//code...
 * 	}
 * `
 * fooC will be executed in body of fooB and fooB in body of fooA
 */
export default abstract class FunctionBinder {
	public static async bind(next: () => Promise<any>, binders: IFunctionBinder[]) {
		let currentBinder = async function () {
			await next();
		};

		let index = binders.length;
		while (index--) {
			const localIndex = index;
			const nextBinder = currentBinder;
			currentBinder = async () => binders[localIndex]!(nextBinder);
		}

		await currentBinder();
	}
}

import { IFunctionBinder } from "@Common/helpers/FunctionBinder";

export default interface IConfig {
	binders: IFunctionBinder[];
	jobs: {
		name: string;
		description?: string;
		cronTime: string | Date;
		onTick: () => Promise<any>;
		enabled?: boolean;
	}[];
}

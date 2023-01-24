import StoreWorkflow from "Stores/StoreWorkflow";

/**
 * Service that will automatically instanciate other services on load
 */
export default class AutoLoadServices {
	private static instance: AutoLoadServices;

	private constructor() {
		this.init();
	}

	public static load(): AutoLoadServices {
		return (this.instance = this.instance ?? new AutoLoadServices());
	}

	private init() {
		StoreWorkflow.getInstance();
	}
}

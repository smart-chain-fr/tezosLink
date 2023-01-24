import developmentConfig from "./development.json";
import productionConfig from "./production.json";
import stagingConfig from "./staging.json";
import preprodConfig from "./preprod.json";

export default class Module {
	private static ctx: Module;
	private config: typeof developmentConfig = developmentConfig;

	constructor() {
		if (Module.ctx) return Module.ctx;
		Module.ctx = this;
		this.setConfig();
		return Module.ctx;
	}

	public static getInstance() {
		if (!Module.ctx) new this();
		return Module.ctx;
	}

	public get() {
		return this.config;
	}

	private setConfig() {
		switch (process.env["REACT_APP_ENV_NAME"]) {
			case "staging":
				this.config = stagingConfig;
				break;
			case "preprod":
				this.config = preprodConfig;
				break;
			case "production":
				this.config = productionConfig;
				break;
		}
	}
}

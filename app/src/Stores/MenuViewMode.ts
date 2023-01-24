import EventEmitter from "events";

export enum EMenuViewMode {
	OFFICE = "office",
	ADMINISTRATION = "administration",
}

export default class MenuViewMode {
	private static ctx: MenuViewMode;
	private readonly event = new EventEmitter();
	private _menuViewMode: EMenuViewMode = EMenuViewMode.OFFICE;

	private constructor() {
		MenuViewMode.ctx = this;
	}

	public static getInstance() {
		if (!MenuViewMode.ctx) new this();
		return MenuViewMode.ctx;
	}

	public get menuViewMode() {
		return this._menuViewMode;
	}

	public set menuViewMode(type: EMenuViewMode) {
		this._menuViewMode = type;
		this.event.emit("switch", type);
	}

	public onSwitch(callback: (menuViewMode: EMenuViewMode) => void) {
		this.event.on("switch", callback);
		return () => {
			this.event.off("switch", callback);
		};
	}
}

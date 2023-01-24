import { IAppUser } from "Entities/AuthFactory/User";
import EventService from "@/Services/EventEmitter";

export default class UserStore {
	private static instance: UserStore;
	private readonly event = new EventService();

	private user: IAppUser | null = null;

	private constructor() {}

	public static getInstance(): UserStore {
		return (this.instance = this.instance ?? new UserStore());
	}

	public getUser() {
		return this.user;
	}

	public onChange(callback: (user: IAppUser | null) => void) {
		this.event.on("change", callback);
		return () => {
			this.event.off("change", callback);
		};
	}

	public setUser(user: IAppUser | null) {
		this.user = user;
		this.event.emit("change", user);
	}

	public disconnect() {
		this.setUser(null);
	}
}

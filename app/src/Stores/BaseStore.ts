import EventService from "@/Services/EventEmitter";

export default abstract class BaseStore {
	protected readonly event = new EventService();

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	protected constructor() {}

	public onChange<T>(callback: (params: T) => void) {
		this.event.on("change", callback);
		return () => {
			this.event.off("change", callback);
		};
	}
}

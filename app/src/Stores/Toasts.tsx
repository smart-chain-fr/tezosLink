import I18n from "Components/Elements/I18n";
import EventService from "@/Services/EventEmitter";

export enum EToastPriority {
	HIGH = "high",
	LOW = "low",
}

export interface IToast {
	id?: number;
	title: string | JSX.Element;
	text: string | JSX.Element;
	buttonText?: string | JSX.Element;
	buttonUrl?: string;
	time?: number;
	closable?: boolean;
	priority?: EToastPriority;
}

export default class Toasts {
	private static ctx: Toasts;
	private readonly event = new EventService();
	private toastList: IToast[] = [];
	private uid: number = 0;

	private defaultTime: IToast["time"] = 4000;
	private defaultClosable: IToast["closable"] = true;
	private defaultPriority: IToast["priority"] = EToastPriority.LOW;

	private constructor() {
		Toasts.ctx = this;
	}

	public get toasts() {
		return this.toastList;
	}

	public static getInstance() {
		if (!Toasts.ctx) new this();
		return Toasts.ctx;
	}

	/**
	 * An utility static method you can use to quickly display an error toast
	 * with a custom error message.
	 *
	 * @param message_key a key to a l18n message.
	 */
	public static errorToast(message_key: string) {
		Toasts.getInstance().open({
			text: <I18n map={message_key} />,
			title: <I18n map="toast.an_error_occured" />,
			closable: true,
			priority: EToastPriority.HIGH,
		});
	}

	/**
	 * @returns removelistener callback
	 */
	public onChange(callback: (toastList: IToast[]) => void) {
		this.event.on("change", callback);
		return () => this.event.off("change", callback);
	}

	public open(toast: IToast): () => void {
		const index = this.toastList.indexOf(toast);
		if (index !== -1) return () => this.close(toast);

		toast.id = toast.id ?? this.uid++;
		toast.time = toast.time ?? this.defaultTime;
		toast.closable = toast.closable ?? this.defaultClosable;
		toast.priority = toast.priority ?? this.defaultPriority;

		const highToasts = this.toastList.filter((toast, index) => {
			return toast.priority === EToastPriority.HIGH;
		});

		const lowToasts = this.toastList.filter((toast, index) => {
			return toast.priority === EToastPriority.LOW;
		});

		if (toast.priority === EToastPriority.HIGH) {
			highToasts.unshift(toast);
		} else {
			lowToasts.unshift(toast);
		}

		this.toastList.splice(0);
		this.toastList.unshift(...lowToasts);
		this.toastList.unshift(...highToasts);

		this.event.emit("change", this.toastList);

		return () => this.close(toast);
	}

	public close(toast: IToast) {
		const index = this.toastList.indexOf(toast);
		if (index === -1) return;
		this.toastList.splice(index, 1);
		this.event.emit("change", this.toastList);
	}
}

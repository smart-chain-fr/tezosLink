export default class LocalStorageService {
	private static instance: LocalStorageService;

	private constructor() {}

	public static getInstance(): LocalStorageService {
		return (this.instance = this.instance ?? new LocalStorageService());
	}

	public items = {
		accessToken: {
			get: () => this.getValue<string>("accessToken"),
			set: (item: string) => this.setValue("accessToken", item),
			delete: () => this.delete("accessToken"),
		},
		refreshToken: {
			get: () => this.getValue<string>("refreshToken"),
			set: (item: string) => this.setValue("refreshToken", item),
			delete: () => this.delete("refreshToken"),
		},
	};

	private getValue<T>(key: keyof typeof this.items): T | null {
		const item = localStorage.getItem(key);
		if (!item) {
			return null;
		}

		const isArrayOrObject = item.match(/[{[]/);

		return (isArrayOrObject ? JSON.parse(item) : item) as T;
	}

	private setValue<T>(key: keyof typeof this.items, item: T) {
		localStorage.setItem(key, typeof item === "string" ? item : JSON.stringify(item));
	}

	private delete(key: keyof typeof this.items) {
		localStorage.removeItem(key);
	}
}

import Presign from "Api/NotIT/AppAuth/Presign";
import MyAccount from "Api/NotIT/AppUser/MyAccount";
import { JwtPair } from "Entities/AuthFactory/AccessToken";
import jwtDecode, { JwtPayload } from "jwt-decode";
import JwtStore from "Stores/JwtStore";
import UserStore from "Stores/UserStore";

export default class StoreWorkflow {
	private static instance: StoreWorkflow;
	private readonly jwtStore = JwtStore.getInstance();
	private readonly userStore = UserStore.getInstance();

	private constructor() {
		this.initEvents();
	}

	public static getInstance(): StoreWorkflow {
		return (this.instance = this.instance ?? new StoreWorkflow());
	}

	private async initEvents() {
		await this.autoLogin();
		this.onJwtPairChange();
	}

	private async autoLogin() {
		try {
			const jwtPair = { accessToken: this.jwtStore.accessToken, refreshToken: this.jwtStore.refreshToken };
			!jwtPair.accessToken && !jwtPair.refreshToken ? await this.setJwtPairPresign() : await this.tryToLogin();
		} catch (error) {
			console.error(error);
		}
	}

	private async tryToLogin() {
		try {
			const accessToken = this.jwtStore.accessToken;
			if (!accessToken) return await this.setJwtPairPresign();

			const decodedToken = jwtDecode<JwtPayload>(accessToken);
			if (!decodedToken.sub) return;

			const user = await MyAccount.getInstance().get();
			this.userStore.setUser(user);
		} catch (error) {
			console.error(error);
		}
	}

	private onJwtPairChange() {
		this.jwtStore.onChange(async (jwtPair?: JwtPair) => {
			try {
				if (!jwtPair) {
					this.userStore.setUser(null);
					return;
				}

				const decodedToken = jwtDecode<JwtPayload>(jwtPair.accessToken);
				if (!decodedToken.sub) {
					this.userStore.setUser(null);
					return;
				}

				const user = await MyAccount.getInstance().get();
				this.userStore.setUser(user);
			} catch (error) {
				console.error(error);
			}
		});
	}

	private async setJwtPairPresign() {
		const { jwtPair } = await Presign.getInstance().post();
		this.jwtStore.setJwtPair(jwtPair);
	}
}

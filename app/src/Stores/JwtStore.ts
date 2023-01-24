import jwtDecode from "jwt-decode";
import LocalStorageService from "@/Services/LocalStorageService";

import { DecodedAccessToken, JwtPair } from "Entities/AuthFactory/AccessToken";

import BaseStore from "./BaseStore";

export default class JwtStore extends BaseStore {
	private static instance: JwtStore;
	private readonly localStorageService = LocalStorageService.getInstance();
	private _accessToken: string | null = this.localStorageService.items.accessToken.get();
	private _refreshToken: string | null = this.localStorageService.items.refreshToken.get();

	private constructor() {
		super();
	}

	public static getInstance(): JwtStore {
		return (this.instance = this.instance ?? new JwtStore());
	}

	public get accessToken() {
		return this._accessToken;
	}

	public get refreshToken() {
		return this._refreshToken;
	}

	public set accessToken(token: string | null) {
		this._accessToken = token;
	}

	public set refreshToken(token: string | null) {
		this._refreshToken = token;
	}

	public setJwtPair(jwtPair: JwtPair) {
		this.accessToken = jwtPair.accessToken;
		this.localStorageService.items.accessToken.set(jwtPair.accessToken);

		this.refreshToken = jwtPair.refreshToken;
		this.localStorageService.items.refreshToken.set(jwtPair.refreshToken);

		this.event.emit("change", jwtPair);
	}

	public hasRule(name: string, action: string) {
		if (!this.accessToken) {
			return false;
		}
		const decodedToken = jwtDecode(this.accessToken) as DecodedAccessToken;
		return !!decodedToken?.appRoles?.some((role) => role.appRules.some((rule) => rule.action === action && rule.name === name));
	}
}

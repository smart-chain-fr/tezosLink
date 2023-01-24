import React, { ReactNode } from "react";
import ModuleConfig from "@/Configs/Module";
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

type IProps = {
	isPage?: boolean;
	from: {
		enabled: boolean;
		props?: {
			[key: string]: any;
		};
	};
	children?: ReactNode;
};

type IState = {};

export default class Module extends React.Component<IProps, IState> {
	public override render(): React.ReactNode | null {
		// const router : AppRouterInstance = useRouter();

		//TO DO : Find a way to navigate with the next Router
		if (!this.props.from.enabled) {
            // if (this.props.isPage) router.push("/");
            return null;
        }
		return <>{this.props.children}</>;
	}

	public static get config() {
		return ModuleConfig.getInstance().get().modules;
	}
}
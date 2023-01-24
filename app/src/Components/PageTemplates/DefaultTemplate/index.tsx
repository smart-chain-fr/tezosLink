import React, { ReactNode } from "react";

import Footer from "@/Components/Materials/Footer";
import Header from "@/Components/Materials/Header";

import classes from "./classes.module.scss";
import Module from "@/Components/Elements/Module";

type IProps = {
	title: string;
	children?: ReactNode;
	/**
	 * @description scroll top with number or disabled with null
	 */
	scrollTop: number | null;
};
type IState = {};

export default class DefaultTemplate extends React.Component<IProps, IState> {
	public static defaultProps = {
		scrollTop: 0,
	};

	public override render(): JSX.Element {
		return (
			<>
				<Module from={Module.config.Header}>
					<Header />
				</Module>
				<div className={classes["root"]}>
					<div className={classes["content"]}>{this.props.children}</div>
				</div>
				<Module from={Module.config.Footer}>
					<Footer />
				</Module>
			</>

		);
	}

	public override componentDidMount() {
		window.document.title = this.props.title;
		if (this.props.scrollTop !== null) {
			window.scrollTo(0, this.props.scrollTop);
		}
	}
}
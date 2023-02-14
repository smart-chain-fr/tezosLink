import StatusNode from "../../Elements/StatusNode";
import StatusProxy from "../../Elements/StatusProxy";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate"
import classes from "./classes.module.scss";

type IProps = {
	MainnetProxyStatus: boolean,
	MainnetArchiveStatus: boolean,
	MainnetRollingStatus: boolean,
	TestnetName: string,
	TestnetProxyStatus: boolean,
	TestnetArchiveStatus: boolean,
	TestnetRollingStatus: boolean,
	Date: string
}

export default class StatusLayout extends BasePage<IProps> {
	public override render(): JSX.Element {
		return (
			<DefaultTemplate title={"Status"}>
				<div className={classes["root"]}>
					<div className={classes["content"]}>
						<h2>Services status</h2>
						<StatusProxy proxyStatus={this.props.MainnetProxyStatus}
							network={"Mainnet"} date={this.props.Date} />
						<StatusNode nodeArchiveStatus={this.props.MainnetArchiveStatus}
							nodeRollingStatus={this.props.MainnetRollingStatus} network={"Mainnet"} />
						<StatusProxy proxyStatus={this.props.TestnetProxyStatus}
							network={this.props.TestnetName} date={this.props.Date} />
						<StatusNode nodeArchiveStatus={this.props.TestnetArchiveStatus}
							nodeRollingStatus={this.props.TestnetRollingStatus} network={this.props.TestnetName} />
					</div>
				</div>
			</DefaultTemplate>
		);
	}
}

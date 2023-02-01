import StatusNodeService from "./StatusNodeService";
import StatusProxyService from "./StatusProxyService";
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

export default class Status extends BasePage<IProps> {
	public override render(): JSX.Element {
		return (
			<DefaultTemplate title={"Status"}>
				<div className={classes["root"]}>
					<div className={classes["content"]}>
						<h2>Services status</h2>
						<StatusProxyService proxyStatus={this.props.MainnetProxyStatus}
							network={"Mainnet"} date={this.props.Date} />
						<StatusNodeService nodeArchiveStatus={this.props.MainnetArchiveStatus}
							nodeRollingStatus={this.props.MainnetRollingStatus} network={"Mainnet"} />
						<StatusProxyService proxyStatus={this.props.TestnetProxyStatus}
							network={this.props.TestnetName} date={this.props.Date} />
						<StatusNodeService nodeArchiveStatus={this.props.TestnetArchiveStatus}
							nodeRollingStatus={this.props.TestnetRollingStatus} network={this.props.TestnetName} />
					</div>
				</div>
			</DefaultTemplate>
		);
	}
}

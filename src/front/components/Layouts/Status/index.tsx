import StatusNode from "../../Elements/StatusNode";
import StatusProxy from "../../Elements/StatusProxy";
import BasePage from "@Components/Layouts/Base";
import DefaultTemplate from "@Components/LayoutTemplates/DefaultTemplate";
import classes from "./classes.module.scss";

type IState = {};

export type IProps = {
  status: {
    MainnetProxyStatus: boolean;
    MainnetArchiveStatus: boolean;
    MainnetRollingStatus: boolean;
    TestnetName: string;
    TestnetProxyStatus: boolean;
    TestnetArchiveStatus: boolean;
    TestnetRollingStatus: boolean;
    Date: string;
  };
};

export default class StatusLayout extends BasePage<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
  }
  public override render(): JSX.Element | null {
    const status = this.props.status;
    return (
      <DefaultTemplate title={"Status"}>
        <div className={classes["root"]}>
          <div className={classes["content"]}>
            <h2>Services status</h2>
            <StatusProxy
              proxyStatus={status!.MainnetProxyStatus}
              network={"Mainnet"}
              date={status.Date!}
            />
            <StatusNode
              nodeArchiveStatus={status!.MainnetArchiveStatus}
              nodeRollingStatus={status.MainnetRollingStatus}
              network={"Mainnet"}
            />
            <StatusProxy
              proxyStatus={status.TestnetProxyStatus}
              network={status.TestnetName}
              date={status.Date!}
            />
            <StatusNode
              nodeArchiveStatus={status.TestnetArchiveStatus}
              nodeRollingStatus={status.TestnetRollingStatus}
              network={status.TestnetName}
            />
          </div>
        </div>
      </DefaultTemplate>
    );
  }
}

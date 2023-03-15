import { BackendVariables } from "@Common/config/Variables";
import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import Status from "@Front/Api/Status";
import StatusLayout, { IProps } from "@Front/components/Layouts/Status";
import { GetServerSideProps } from "next";
import Container from "typedi";

export default function Route(props: IProps) {
  return <StatusLayout {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const status = await getStatus();
  return {
    props: { status },
  };
};

async function getInstanceStatus(instance: Status, url: string) {
  const health = await instance.getHealthByUrl(url).catch((error) => {
    return { status: error.status };
  });
  const status = await instance.getStatusByUrl(url).catch((error) => {
    return {
      archive_node: { status: error.status },
      rolling_node: { status: error.status },
    };
  });

  return {
    ProxyStatus: health.status !== HttpCodes.SUCCESS ? false : true,
    ArchiveStatus:
      status.archive_node.status !== HttpCodes.SUCCESS ? false : true,
    RollingStatus:
      status.rolling_node.status !== HttpCodes.SUCCESS ? false : true,
  };
}

async function getStatus(): Promise<IProps["status"]> {
  const variables = Container.get(BackendVariables);

  const instance = Status.getInstance();

  const mainnetStatus = await getInstanceStatus(
    instance,
    variables.RPC_GATEWAY_MAINNET_URL
  );
  const testnetStatus = await getInstanceStatus(
    instance,
    variables.RPC_GATEWAY_TESTNET_URL
  );

  return {
    mainnetProxyStatus: mainnetStatus.ProxyStatus,
    mainnetArchiveStatus: mainnetStatus.ArchiveStatus,
    mainnetRollingStatus: mainnetStatus.RollingStatus,
    /** @TODO */
    testnetName: "LIMANET",
    testnetProxyStatus: testnetStatus.ProxyStatus,
    testnetArchiveStatus: testnetStatus.ArchiveStatus,
    testnetRollingStatus: testnetStatus.RollingStatus,
    date: new Date(Date.now()).toISOString().slice(0, 10),
  };
}

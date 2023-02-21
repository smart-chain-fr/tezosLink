import HttpCodes from "@Common/system/controller-pattern/HttpCodes";
import Status from "@Front/Api/Status";
import StatusLayout from "@Front/components/Layouts/Status";
import { GetServerSideProps } from "next";

type IProps = {
  MainnetProxyStatus: boolean;
  MainnetArchiveStatus: boolean;
  MainnetRollingStatus: boolean;
  TestnetName: string;
  TestnetProxyStatus: boolean;
  TestnetArchiveStatus: boolean;
  TestnetRollingStatus: boolean;
  Date: string;
};

async function getInstanceStatus(instance: Status, url: string) {
  const health = await instance.getHealthByUrl(url).catch((error) => {
    return { status: error.status};
  });
  const status = await instance.getStatusByUrl(url).catch((error) => {
    return {
      archive_node: { status: error.status },
      rolling_node: { status: error.status },
    };
  });
  console.log(health, status);
  return {
    ProxyStatus: health.status !== HttpCodes.SUCCESS ? false : true,
    ArchiveStatus:
      status.archive_node.status !== HttpCodes.SUCCESS ? false : true,
    RollingStatus:
      status.rolling_node.status !== HttpCodes.SUCCESS ? false : true,
  };
}

async function getStatus(): Promise<IProps> {
  const {
    NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME,
    NEXT_PUBLIC_RPC_GATEWAY_PORT,
    NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL,
  } = process.env;

  const mainnetProxyUrl = `${NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME}:${NEXT_PUBLIC_RPC_GATEWAY_PORT}`;
  const testnetProxyUrl = `${NEXT_PUBLIC_RPC_GATEWAY_HOSTNAME}:${NEXT_PUBLIC_RPC_GATEWAY_PORT}${NEXT_PUBLIC_RPC_GATEWAY_ROOT_URL}`;

  const instance = Status.getInstance();

  if (!instance) {
    throw new Error("Status instance not found");
  }

  const mainnetStatus = await getInstanceStatus(instance, mainnetProxyUrl);
  const testnetStatus = await getInstanceStatus(instance, testnetProxyUrl);

  return {
    MainnetProxyStatus: mainnetStatus.ProxyStatus,
    MainnetArchiveStatus: mainnetStatus.ArchiveStatus,
    MainnetRollingStatus: mainnetStatus.RollingStatus,
    TestnetName: "LIMANET",
    TestnetProxyStatus: testnetStatus.ProxyStatus,
    TestnetArchiveStatus: testnetStatus.ArchiveStatus,
    TestnetRollingStatus: testnetStatus.RollingStatus,
    Date: new Date(Date.now()).toISOString().slice(0, 10),
  };
}

export default function Route(props: IProps) {
  return <StatusLayout {...props} />;
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  try {
    const currentStatus = await getStatus();
    return {
      props: currentStatus,
    };
  } catch (e) {
    console.error(e);
    return {
      redirect: {
        permanent: false,
        destination: "/status-not-found",
      },
    };
  }
};

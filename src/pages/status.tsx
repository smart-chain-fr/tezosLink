import Status from "@Front/Api/Status";
import StatusLayout from "@Front/components/Layouts/Status";
import { IStatus } from "@Front/interfaces";
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

export default function Route(currentStatus: IStatus) {
  const props: IProps = {
    MainnetProxyStatus: currentStatus.archive_node,
    MainnetArchiveStatus: currentStatus.archive_node,
    MainnetRollingStatus: currentStatus.rolling_node,
    TestnetName: "LIMANET",
    TestnetProxyStatus: currentStatus.archive_node,
    TestnetArchiveStatus: currentStatus.archive_node,
    TestnetRollingStatus: currentStatus.rolling_node,
    Date: new Date(Date.now()).toLocaleString(),
  };
  return <StatusLayout {...props} />;
}

export const getServerSideProps: GetServerSideProps<IStatus> = async () => {
  const instance = Status.getInstance();
  if (!instance) {
    return {
      redirect: {
        permanent: false,
        destination: "/status-not-found",
      },
    };
  }
  const health = await instance.getHealth();
  if (health.status !== "success") return { notFound: true };
  return {
    props: await instance.getStatus(),
  };
};

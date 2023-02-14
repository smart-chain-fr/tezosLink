import StatusLayout from "@Front/components/Layouts/Status";


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

export default function Route(props: IProps) {
  return <StatusLayout {...props} />;
}

/* export const getServerSideProps: GetServerSideProps<IStatus> = async () => {
  return {
      props: await Status.getInstance().getStatus(),
  };
} */

import Dashboard from "@Components/Layouts/Dashboard"
import { GetServerSideProps } from "next"

type requestByDay = {
    date: string,
    value: number
}

type RPCUsage = {
    id: string
    label: string
    value: number
}

type IProps = {
    id: number,
    network: string,
    title: string,
    uuid: string,
    firstTime: boolean,
    requestByDays: requestByDay[],
    lastRequests: string[],
    rpcUsage: RPCUsage[],
    rpcTotalCount: number
}

export default function Route(props: IProps) {
    return <Dashboard {...props} />
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    const uuid = context.params?.['uuid'];
    const ft = context.query?.['ft'];
    
    if (!ft || Array.isArray(ft) || !uuid || Array.isArray(uuid) || !uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
    return {
        redirect: {
            permanent: false,
                destination: "/project-not-found",
            },
        }
    }
    return {
        props: {
            id: 1,
            network: "MAINNET",
            title: "TEST PROJECT",
            uuid: uuid,
            firstTime: ft === "true" ? true : false,
            requestByDays: [{ date: "2023-01-01", value: 10 },
                            { date: "2023-01-02", value: 9 },
                            { date: "2023-01-03", value: 10 },
                            { date: "2023-01-04", value: 3 },
                            { date: "2023-01-05", value: 0 },
                            { date: "2023-01-06", value: 7 },
                            { date: "2023-01-07", value: 9 },
                            { date: "2023-01-08", value: 4 },
                            { date: "2023-01-09", value: 1 },
                            { date: "2023-01-10", value: 6 },
                            { date: "2023-01-11", value: 8 },
                            { date: "2023-01-12", value: 10 },
                            { date: "2023-01-13", value: 10 },
                            { date: "2023-01-14", value: 9 },
                            { date: "2023-01-15", value: 1 },
                            { date: "2023-01-16", value: 7 },
                            { date: "2023-01-17", value: 9 },
                            { date: "2023-01-18", value: 4 },
                            { date: "2023-01-19", value: 1 },
                            { date: "2023-01-20", value: 6 },
                            { date: "2023-01-21", value: 8 },
                            { date: "2023-01-22", value: 10 },
                            { date: "2023-01-23", value: 10 },
                            { date: "2023-01-24", value: 9 },
                            { date: "2023-01-25", value: 1 },
                            { date: "2023-01-26", value: 7 },
                            { date: "2023-01-27", value: 9 },
                            { date: "2023-01-28", value: 4 },
                            { date: "2023-01-29", value: 1 },
                            { date: "2023-01-30", value: 6 },
                            { date: "2023-01-31", value: 8 },
                            ],
            rpcUsage: [{ id: "1", label: "/chains/block/head", value: 2 },
            { id: "2", label: "/chains/block/network/head", value: 5 }],
            rpcTotalCount: 7,
            lastRequests: ["/chains/<chains_id>", "/network", "monitor/active_chains"]
      }
  }
}
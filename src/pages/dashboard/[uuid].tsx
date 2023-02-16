import Dashboard from "@Components/Layouts/Dashboard"
import Project from "src/front/Api/Project"
import { IProject } from "src/front/interfaces"
import { GetServerSideProps } from "next"
import { getLastRequest, getRequestByDays, getRpcUsage } from "@Components/Layouts/Dashboard/extractData"

type requestByDay = {
    date: Date,
    value: number
}

type RPCUsage = {
    label: string
    value: number
}

type IProps = {
    network: string,
    title: string,
    uuid: string,
    firstTime: boolean,
    requestByDays: requestByDay[],
    lastRequests: string[],
    rpcUsage: RPCUsage[],
    rpcTotalCount?: number | undefined
}

export default function Route(currentProject: IProject) {
    const props: IProps = {
        network: currentProject.network,
        title: currentProject.title,
        uuid: currentProject.uuid,
        firstTime: false,
        lastRequests: getLastRequest(currentProject.metrics, 5),
        rpcTotalCount: currentProject.metrics?.length,
        rpcUsage: getRpcUsage(currentProject.metrics),
        requestByDays: getRequestByDays(currentProject.metrics)
    }
    return <Dashboard {...props} />
}

export const getServerSideProps: GetServerSideProps<IProject> = async (context) => {
    const uuid = context.params?.['uuid'];
    try {
        if (!uuid || Array.isArray(uuid) || !uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')) {
            return {
                redirect: {
                    permanent: false,
                        destination: "/project-not-found",
                    },
                }
        }
        const project = await Project.getInstance().getOneProject(uuid);
        if (!project) { return { notFound: true } }
        return {
            props: project,
        };
    } catch (error) {
        return {
            redirect: {
                permanent: false,
                destination: "/project-not-found",
            },
        }
    }
}
export interface IMetrics {
    id: number,
    path: string,
    uuid: string,
    remote_address: string,
    date_requested: Date,
    projectId: number,
    project: IProject[],
    createdAt: Date,
    updatedAt: Date,
}

export interface IProject {
    id: number,
    title: string,
    uuid: string,
    createdAt: Date,
    updatedAt: Date,
    network: string,
    metrics?: IMetrics[]
}


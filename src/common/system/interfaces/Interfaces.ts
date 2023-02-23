export interface IHttpReponse {
	status: number;
	reason: string | null;
}

export interface IStatusNode {
	archive_node: IHttpReponse;
	rolling_node: IHttpReponse;
}
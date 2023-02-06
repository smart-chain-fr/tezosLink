import Status from "@Components/Layouts/Status"

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

export default function Route(props: IProps) {
    return <Status {...props} />
}
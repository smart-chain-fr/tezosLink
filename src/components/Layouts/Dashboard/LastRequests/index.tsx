import classes from "./classes.module.scss"

type IProps = {
    lastRequests : string[]
}

export default function LastRequests(props: IProps): JSX.Element {

    const showRequests = (request: string, isFirst: boolean) => {
        const stringLength = isFirst ? 40 : 60
        if (request.length > stringLength) {
          return request.substring(0, stringLength) + '...'
        }
        return request;
      }

    return <div className={classes["root"]}>
        <div className={classes["title"]}>Last Requests</div>
        {props.lastRequests && props.lastRequests.length > 0 ? (
            <div className={classes["list"]}>
                {props.lastRequests.slice(0, 5).map((request: string, index: number) => {
                    return (
                        <div className={classes["item"]} key={index}>
                            <div className={classes["tooltip"]} data-tooltip={request}>
                                {showRequests(request, index === 0)}
                            </div>
                        </div>
                    )
                })}
            </div>
        ) : (
            <div className={classes["no-data"]}>No data</div>
        )}
    </div>
}
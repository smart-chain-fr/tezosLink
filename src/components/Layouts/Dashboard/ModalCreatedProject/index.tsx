import classes from "./classes.module.scss"
import { Button } from "@Components/Elements/Button"
import TokenCopy from "../TokenCopy"
import Confettis from "../Confettis"

type IProps = {
    uuid: string,
    firstTime: boolean,
    closeModal: () => void
}
export default function ModalCreatedProject(props: IProps) {
    return (<>
        <div className={classes["overlay"]} />
        <div className={classes["root"]}>
            {props.firstTime && <Confettis />}
            <div className={classes["title"]} id={'modal-title'}><h2>Well Down!</h2></div>
            <>
                <h3>Usage</h3>
                <p>
                    We've generated a Project ID for you, this identifier is both your <b>login to this dashboard</b> and
                    <b> your credential to access the request URL.</b>
                </p>
                <div className={classes["code"]}>{'curl https://<network>.tezoslink.net/v1/YOUR-PROJECT-ID'}</div>
                <h3>Your Project ID</h3>
                <b>Make sure to save the following Project ID:</b>
                <TokenCopy token={props.uuid} />
                <Button color={'secondary'} onClick={props.closeModal} text="Got it!" />
            </>
        </div>
    </>
    )
}
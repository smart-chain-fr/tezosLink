import React from "react"
import classes from "./classes.module.scss"

type IProps = {}
type IState = {}

export default class Footer extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
    }

    public override render(): JSX.Element {
        return (
            <div className={classes["HomeFooter"]}>
                <div className={classes["HomeFooterGrid"]}>
                    <img alt="logo" src="/images/logo.svg" />
                    <div>
                        <p>About Tezos Link</p>
                        <a href="https://github.com/octo-technology/tezos-link" target="_blank">
                            Github
                        </a>
                        <a href="mailto:beta@octo.com" target="_blank">
                            Support
                        </a>
                        <a href="https://www.reddit.com/r/tezos/" target="_blank">
                            Reddit
                        </a>
                    </div>
                    <div>
                        <p>About OCTO</p>
                        <a href="https://octo.com" target="_blank">
                            Homepage
                        </a>
                        <a href="https://blog.octo.com" target="_blank">
                            Our blog
                        </a>
                    </div>
                    <div>
                        <p>About the devs</p>
                        <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank">
                            Aymeric Bethencourt
                        </a>
                        <a href="https://www.linkedin.com/in/adrien-boulay-2679aa113/" target="_blank">
                            Adrien Boulay
                        </a>
                        <a href="https://www.linkedin.com/in/loup-theron-b1785397/" target="_blank">
                            Loup Theron
                        </a>
                    </div>
                    <img alt="octo" src="/images/brought.svg" />
                </div>
            </div>
        )

    }
}
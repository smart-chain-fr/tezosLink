import Link from "next/link";
import React from "react"
import classes from "./classes.module.scss"
import { Button } from "@/Components/Elements/Button"

type IProps = {}
type IState = {}

export default class Header extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
    }

    public override render(): JSX.Element {
        return (
            <div className={classes["HeaderStyled"]}>
                <div className={classes["HeaderMenu"]}>
                    <Link href="/">
                        <img alt="Tezos Link" src="/link_logo.svg" />
                    </Link>
                </div>

                <div className="header-triangle"></div>
                <div className={classes["HeaderLogo"]}>
                    <Link href="/">
                        <img alt="entire stack" src="/logo.svg" />
                    </Link>
                </div>

                {this.loggedOutHeader()}
            </div>
        )

    }

    public loggedOutHeader() : JSX.Element {
        return (
          <div className={classes["HeaderLoggedOut"]}>
            <Link href="/sign-in-project">
              <Button color="transparent" text="EXPLORE" icon="login" />
            </Link>
            <Link href="/new-project">
              <Button text="CREATE" icon="plus-card" />
            </Link>
          </div>
        )
      }
}
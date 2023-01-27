import Link from "next/link"
import classes from "./classes.module.scss"
import { Button } from "../Button"

export default function HomeTrusted() {
    return <div className={classes["HomeTrusted"]}>
    <h1>Trusted by hundreds of developers</h1>
    <h3>
      Used worldwide by dozens of production applications without having to install or manage a single node.
    </h3>
    <div className={classes["HomeTrustedGrid"]}>
      <img alt="accenture" src="/images/accenture.svg" />
      <img alt="nomadic" src="/images/nomadic.svg" />
      <img alt="tq" src="/images/tq.svg" />
    </div>
    <a href="mailto:beta@octo.com" target="_blank">
      <Button text="CONTACT US FOR ENTERPRISE INFOS" icon="plus-card" />
    </a>
  </div>
}
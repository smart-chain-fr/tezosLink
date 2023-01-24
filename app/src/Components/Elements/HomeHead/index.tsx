import Link from "next/link"
import classes from "./classes.module.scss"
import { Button } from "../Button"

export default function HomeHead() {
    return <div className={classes["HomeHead"]}>
    <div className={classes["HomeLeft"]}>
      <div className={classes["HomeLeftInside"]}>
        <h1>Your gateway to the tezos network</h1>
        <h3>Free and scalable API access to the Tezos network</h3>
        <h3>and usage analytics for your projects</h3>
        <Link href="/new-project">
          <Button text="NEW PROJECT" icon="plus-card" />
        </Link>
      </div>
    </div>
    <div className={classes["HomeRight"]}>
      <img alt="torus" className={classes["torus-cables"]} src="/images/torus-cables.svg" />
      <img alt="torus" className={classes["torus-bg"]} src="/images/torus-bg.svg" />
      <div className={classes["meteor meteor1"]} />
      <div className={classes["meteor meteor2"]} />
      <div className={classes["meteor meteor3"]} />
      <div className={classes["meteor meteor4"]} />
      <img alt="torus" className={classes["torus-fg"]} src="/images/torus-fg.svg" />
      <img alt="torus" className={classes["torus-logo"]} src="/images/torus-logo.svg" />
    </div>
  </div>
}
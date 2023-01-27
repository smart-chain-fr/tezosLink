import Link from "next/link"
import classes from "./classes.module.scss"
import { Button } from "@/Components/Elements/Button"

export default function HomeGetStarted() {
    return <div className={classes["HomeGetStarted"]}>
        <h1>Connect to TEZOS now</h1>
        <Link href="/new-project">
            <Button text="GET STARTED" icon="plus-card" />
        </Link>
        <img className="left" alt="torus" src="/images/mini-torus.png" />
        <img className="right" alt="torus" src="/images/mini-torus.png" />
    </div>
}
import Link from "next/link"
import classes from "./classes.module.scss"

export default function HomePanels() {
    return <div className={classes["HomePanels"]}>
    <Link href="/documentation">
      <div className={classes["HomePanel"]}>
        <img className="logo" alt="books" src="/icons/books.svg" />
        <div>
          <h3>DOCUMENTATION</h3>
          <p>Learn how to use Tezos Link</p>
        </div>
        <img className="arrow" alt="arrow" src="/icons/arrow-black.svg" />
      </div>
    </Link>
    <a href="mailto:beta@octo.com" target="_blank">
      <div className={classes["HomePanel2"]}>
        <img className="logo" alt="books" src="/icons/support.svg" />
        <div>
          <h3>SUPPORT</h3>
          <p>Ask us your questions</p>
        </div>
        <img className="arrow" alt="arrow" src="/icons/arrow-white.svg" />
      </div>
    </a>
  </div>
}
import classes from "./classes.module.scss"

export default function HomeMetrics() {
  return <div className={classes["HomeMetrics"]}>
    <h1>Insights from your app</h1>
    <h3>The Tezos Link dashboard allows you to get valuable statistics from your utilization of the APIs</h3>
    <img alt="metrics" src="/images/metrics.png" />
  </div>
}
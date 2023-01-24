import classes from "./classes.module.scss"
import classNames from "classnames"
import HomeBuiltArg from "../HomeBuiltArg";

type Side = 'right' | 'left';

type IProps = {
  title: string,
  description: string,
  image_src: string,
  image_alt: string,
  side: Side
}

export default function HomeBuilt() {
  const args: IProps[] = [
    {
      title: "BUILT FOR DEVELOPERS",
      description: "Connect your app immediately with our instant access APIs. We support RPC over HTTPS interfaces, providing high speed connections to the Tezos network.",
      image_src: "/images/arg1.svg",
      image_alt: "tezos",
      side: "right"
    },
    {
      title: "BUILT FOR EASE",
      description: "Start using Tezos Link with a single URL. Our 24/7 team of experts is ready to handle all network changes and upgrades so you can focus on building your applications.",
      image_src: "/images/arg2.svg",
      image_alt: "tezos",
      side: "left"
    },
    {
      title: "BUILT FOR BUILDERS",
      description: "We believe in a future powered by decentralized networks and protocols. We provide world-class infrastructure for developers so you can spend your time building and creating.",
      image_src: "/images/arg3.svg",
      image_alt: "tezos",
      side: "right"
    },
    {
      title: "SCALABLE",
      description: "Our architecture supports the workload required by your project, by scaling up Tezos nodes when we see an increase of requests. The infrastructure is open-sourced in our<a href=\"https://github.com/octo-technology/tezos-link\" target=\"_blank\"> Github project</a>",
      image_src: "/images/architecture.png",
      image_alt: "tezos",
      side: "left"
    },
  ];

  return <div className={classes["HomeBuilt"]}>
    <div className={classes["HomeSection"]}>
      <h1>Develop now with our Tezos APIs</h1>
      <h3>
        Tezos Link's infrastructure will ensure your decentralized application scales to meet your user demand.
      </h3>
      {
        args.map(arg => {
          return <HomeBuiltArg {...arg} />
        })}
    </div>
  </div>
}
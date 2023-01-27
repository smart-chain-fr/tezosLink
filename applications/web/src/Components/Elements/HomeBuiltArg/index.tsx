import classes from "./classes.module.scss"
import classNames from "classnames"

type Side = 'right' | 'left';

type IProps = {
  title: string,
  description: string,
  image_src: string,
  image_alt: string,
  side: Side
}

export default function HomeBuiltArg(props: IProps) {
  return <div className={classNames(classes["HomeBuiltArg"], props.side === 'left' ? classes["HomeBuiltArgRev"] : '')}>
    <img className={classes["HomeBuiltArgImg"]} alt={props.image_alt} src={props.image_src} />
    <div>
      <div className={classes["HomeBuiltArgTitle"]}>{props.title}</div>
      <div className={classes["HomeBuiltArgText"]}>{props.description}</div>
    </div>
  </div>
}
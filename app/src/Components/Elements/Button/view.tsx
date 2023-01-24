import * as PropTypes from 'prop-types'
import * as React from 'react'
import classNames from "classnames"

import { BUTTON, ButtonColors, PRIMARY } from './constants'
import classes from "./classes.module.scss"

type ButtonViewProps = {
  text: string
  icon?: string
  color: ButtonColors
  onClick?: () => void
  clickCallback: () => void
  clicked: boolean
  loading: boolean
}

export function ButtonView({ text, icon, color, onClick, clickCallback, clicked, loading }: ButtonViewProps) : JSX.Element {
  let buttonClasses : string  = clicked ? 'clicked' : loading ? 'loading' : '';
  return (
    <div className={classNames(classes["ButtonStyled"], classes[color], classes[buttonClasses])}
        onClick={() => {
          clickCallback()
          onClick && onClick()
        }}
      >
        <div className={classNames(classes["ButtonText"])}>
          {loading ? (
            <>
              Loading
              <div className={classes["ButtonLoadingIcon"]}>
                <use xlinkHref="/icons/sprites.svg#circle" />
              </div>
            </>
          ) : (
            <>
              {text}
              {icon && (
                <div className={classNames(classes["ButtonIcon"], classes[color])}>
                  <use xlinkHref={`/icons/sprites.svg#${icon}`} />
                </div>
              )}
            </>
          )}
        </div>
    </div>
  )
}

ButtonView.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  clickCallback: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool
}

ButtonView.defaultProps = {
  icon: undefined,
  color: PRIMARY,
  type: BUTTON,
  loading: false
}

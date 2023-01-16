import { primaryColor, secondaryColor, textColor, backgroundColor } from 'src/styles'
import styled, { keyframes } from 'styled-components/macro'

export const clickWave = keyframes`
  from {
    box-shadow: 0 0 0 0 ${primaryColor};
  }
  to {
    box-shadow: 0 0 0 5px ${primaryColor}00;
  }
`

export const ButtonStyled = styled.button`
  height: 36px;
  border: none;
  font-family: 'Proxima Nova', Helvetica, Arial, sans-serif;
  font-weight: normal;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
  will-change: box-shadow;
  width: 100%;
  user-select: none;

  &.clicked {
    animation: ${clickWave} 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    animation-fill-mode: forwards;
  }

  &.primary {
    color: ${backgroundColor};
    background-color: ${primaryColor};
  }

  &.secondary {
    color: white;
    background-color: ${secondaryColor};
  }

  &.transparent {
    color: ${textColor};
    background-color: initial;
  }

  &.loading {
    pointer-events: none;
    opacity: 0.8;
  }
`

export const ButtonText = styled.div`
  text-align: center;
  margin: auto;
  display: inline-block;
  line-height: 36px;
`

export const ButtonIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: sub;
  margin-left: 15px;

  &.primary {
    stroke: ${backgroundColor};
  }

  &.secondary {
    stroke: white;
  }

  &.transparent {
    stroke: ${textColor};
  }
`

const turn = keyframes`
  100% {
      transform: rotate(360deg);
  }
`

const path = keyframes`
  100% {
      stroke-dashoffset: 0;
  }
`

export const ButtonLoadingIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-left: 15px;
  vertical-align: sub;
  stroke: white;
  stroke-width: 1px;
  stroke-dashoffset: 94.248;
  stroke-dasharray: 47.124;
  animation: ${turn} 1.6s linear infinite forwards, ${path} 1.6s linear infinite forwards;
`

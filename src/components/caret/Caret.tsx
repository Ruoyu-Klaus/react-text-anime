import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

export type CaretTypes = {
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

const caretAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const StyledCaret = styled.span`
  animation: ${caretAnimation} 0.6s infinite ease;
  display: inline-block;
  height: auto;
  position: relative;
  ${(props) => ({ ...props.style })}
`

export class Caret extends PureComponent<CaretTypes> {
  constructor(props: CaretTypes | Readonly<CaretTypes>) {
    super(props)
  }

  render() {
    const { className, style, children } = this.props
    return (
      <StyledCaret className={'text-anime-caret ' + className} style={style}>
        {children || '_'}
      </StyledCaret>
    )
  }
}

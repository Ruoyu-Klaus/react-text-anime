import React from 'react'
import styled, { keyframes } from 'styled-components'

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
  position: relative;
  top: -0.14em;
  margin-left: 5px;
`

const Caret: React.FC<CaretProps> = () => {
  return <StyledCaret>&#95;</StyledCaret>
}

interface CaretProps {}

export default Caret

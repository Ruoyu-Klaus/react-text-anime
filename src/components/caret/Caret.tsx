import React from 'react'
import styled, { keyframes } from 'styled-components'

type CaretTypes = {
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

const Caret: React.FC<CaretTypes> = ({ className, style, children }) => {
  const StyledCaret = styled.span`
    animation: ${caretAnimation} 0.6s infinite ease;
    display: inline-block;
    height: auto;
    position: relative;
    margin-left: 5px;
    ${{ ...style }}
  `
  return (
    <StyledCaret className={'text-anime-caret ' + className}>
      {children || '_'}
    </StyledCaret>
  )
}

export default Caret

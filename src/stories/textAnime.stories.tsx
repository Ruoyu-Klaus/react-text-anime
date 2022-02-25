import React from 'react'
import TextAnime from '../components/text-anime/index'
import Text from '../components/text/index'
import { useSpring, animated } from 'react-spring'
import styled, { keyframes } from 'styled-components'

export default {
  title: 'TextAnime'
}

const textList = ['Lightweight', 'Customizable', 'Easy to use']

const caretAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const StyledCaret = styled.span`
  animation: ${caretAnimation} 0.8s infinite ease;
  display: inline-block;
  position: relative;
  top: -0.14em;
  left: 5px;
  margin-left: 5px;
`
export const TextAnimeExample = () => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 2000
  })

  return (
    <>
      <TextAnime>
        <Text>Hello world</Text>
        <Text>
          I can typify all text node by wrapping them as a react children
          component.
        </Text>
        <StyledCaret>I will fade in</StyledCaret>
        <ul>
          {textList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </TextAnime>
    </>
  )
}

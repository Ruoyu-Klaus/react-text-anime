import React from 'react'
import TextAnime from '../components/text-anime/index'
import Text from '../components/text/index'

export default {
  title: 'TextAnime'
}

const textList = [
  'Lightweight',
  'Customizable',
  'High performance',
  'Easy to use'
]

export const TextAnimeExample = () => {
  return (
    <>
      <TextAnime>
        <Text>Hello world</Text>
        <Text>
          I can typify all text node by wrapping them as a react children
          component.
        </Text>
        <ul>
          {textList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </TextAnime>
    </>
  )
}

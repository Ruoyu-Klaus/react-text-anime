import React from 'react'
import TextAnime from '../components/text-anime/index'

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
        <TextAnime.Text as='h2'>Hello world</TextAnime.Text>
        <TextAnime.Text>
          I can typify all text node by wrapping them as a react children
          component.
        </TextAnime.Text>
        <ul>
          {textList.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </TextAnime>
    </>
  )
}

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
      <TextAnime speed={200}>
        <TextAnime.Text as='h2'>Hello world</TextAnime.Text>
        <TextAnime.Text>
          I can typify all text node under the TextAnime.Text
        </TextAnime.Text>
        <button style={{ width: 80, height: 35 }}>
          <TextAnime.Text as='span'>Button</TextAnime.Text>
        </button>
        <ul>
          {textList.map((text) => (
            <TextAnime.Text as='li' key={text}>
              {text}
            </TextAnime.Text>
          ))}
        </ul>
      </TextAnime>
    </>
  )
}

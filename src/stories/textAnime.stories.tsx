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

export const CustomCaret = () => {
  return (
    <>
      <TextAnime
        speed={100}
        caretMark={' '}
        caretStyle={{
          color: 'red',
          borderLeft: '1px solid red',
          animationDuration: '1s'
        }}
      >
        <TextAnime.Text as='h2' style={{ color: 'red' }}>
          Hello world
        </TextAnime.Text>
      </TextAnime>
      <TextAnime
        speed={100}
        caretMark={'❓'}
        caretStyle={{
          color: 'red'
        }}
      >
        <TextAnime.Text as='h3' style={{ color: 'black' }}>
          Hello world
        </TextAnime.Text>
      </TextAnime>
    </>
  )
}

export const TextAnimeExample = () => {
  return (
    <>
      <TextAnime speed={100}>
        <TextAnime.Text>
          Delay <TextAnime.Delay time={1000} /> one second passed
        </TextAnime.Text>
        <TextAnime.Text>
          I can typify all text node under the TextAnime.Text
        </TextAnime.Text>
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

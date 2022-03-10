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
        typingSpeed={100}
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
        typingSpeed={100}
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
      <TextAnime typingSpeed={100}>
        <TextAnime.Text>
          <TextAnime.Delay time={2000} />
          Delay one second passed
        </TextAnime.Text>
        <TextAnime.Text>
          I <TextAnime.Delay time={1000} />
          can typify all text node under the TextAnime.Text
        </TextAnime.Text>
        <ul>
          {textList.map((text) => (
            <TextAnime.Text as='li' key={text}>
              <TextAnime.Delay time={1000} />
              {text}
            </TextAnime.Text>
          ))}
        </ul>
      </TextAnime>
    </>
  )
}

export const BackspaceExample = () => {
  return (
    <>
      <TextAnime typingSpeed={200}>
        <TextAnime.Text>
          I am a{' '}
          <TextAnime.Text as={'span'} backspace={true}>
            one
          </TextAnime.Text>
          <TextAnime.Text as={'span'}> node</TextAnime.Text>
        </TextAnime.Text>
      </TextAnime>
    </>
  )
}

import React from 'react'
import TextAnime from '../components/text-anime/index'
import './index.stories.css'
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
    <TextAnime
      typingSpeed={300}
      caretMark={'❓'}
      caretStyle={{
        color: 'red',
        animationDuration: '1s'
      }}
      style={{ color: 'red' }}
    >
      Hello world
    </TextAnime>
  )
}

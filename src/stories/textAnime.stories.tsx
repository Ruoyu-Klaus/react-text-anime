import React from 'react'
import TextAnime from '../components/text-anime/index'

export default {
  title: 'TextAnime',
}

const textList = ['Lightweight', 'Customizable', 'Easy to use']

export const TextAnimeExample = () => {
  return (
    <TextAnime>
      <p style={{ color: 'red', fontSize: '28px' }}>Hello world</p>
      <div>
        <main style={{ color: 'blue' }}>
          <p>
            I can typify all text node by wrapping them as a react children
            component.
          </p>
        </main>
      </div>
      <ul>
        {textList.map(text => (
          <li>{text}</li>
        ))}
      </ul>
    </TextAnime>
  )
}

import React from 'react'
import TextAnime from '../components/text-anime/index'

export default {
  title: 'TextAnime',
}

export const TextAnimeExample = () => {
  return (
    <TextAnime>
      <p>hello world</p>
      <div>
        div
        <main>I'm just a text </main>
      </div>
    </TextAnime>
  )
}

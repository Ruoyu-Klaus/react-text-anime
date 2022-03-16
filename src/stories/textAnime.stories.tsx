import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import {
  TextAnime as TextAnimeUI,
  TextAnimeTypes
} from '../components/text-anime/index'
import './index.stories.css'

export default {
  title: 'TextAnime',
  component: TextAnimeUI
}

const Template: Story<TextAnimeTypes> = (args) => (
  <TextAnimeUI
    typingSpeed={300}
    caretMark={'❓'}
    caretStyle={{
      color: 'red',
      animationDuration: '1s'
    }}
    style={{ color: 'red' }}
    {...args}
  >
    Hello world
  </TextAnimeUI>
)

export const CustomCaret = Template.bind({})

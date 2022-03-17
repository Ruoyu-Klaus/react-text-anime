import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import {
  TextAnime as TextAnimeUI,
  TextAnimeTypes
} from '../components/text-anime/index'
import './index.stories.css'

export default {
  title: 'Typing Effect',
  component: TextAnimeUI
}

const caretConfig = {
  caretMark: '❓',
  caretStyle: {
    color: 'red',
    animationDuration: '1s'
  }
}

const Template: Story<TextAnimeTypes> = (args) => (
  <TextAnimeUI {...args}>Hello world</TextAnimeUI>
)

export const CustomCaret = Template.bind(
  {},
  {
    as: 'h1',
    interval: 300,
    caretConfig: caretConfig
  }
)

export const DisableCaret = Template.bind(
  {},
  {
    as: 'h1',
    interval: 100,
    caretConfig: { enabled: false }
  }
)

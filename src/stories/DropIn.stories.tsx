import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import {
  TextAnime as TextAnimeUI,
  TextAnimeTypes
} from '../components/text-anime/index'
import './index.stories.css'

export default {
  title: 'DropIn Effect',
  component: TextAnimeUI
}

const Template: Story<TextAnimeTypes> = (args) => (
  <TextAnimeUI {...args} style={{ overflow: 'hidden' }}>
    Hello world
  </TextAnimeUI>
)
export const DropIn = Template.bind(
  {},
  {
    as: 'h1',
    springConfig: { duration: 3000 },
    mode: 'dropIn'
  }
)

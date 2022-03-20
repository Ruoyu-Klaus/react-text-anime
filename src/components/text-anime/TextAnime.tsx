import { SpringConfig } from '@react-spring/web'
import React from 'react'
import { createCharacterReactNode, generateUniqueId } from '../../utils'
import { Caret } from '../caret'
import { SpringCaret } from '../springCaret'
import { SpringCharacter } from '../springCharacter'
import { presetsType, TextAnimation } from './presets'

export type CaretConfig = {
  enabled?: boolean
  caretMark?: React.ReactNode
  caretStyle?: React.CSSProperties
  caretClassName?: string
}

export type TextAnimeTypes = {
  as?: React.ElementType
  interval?: number
  style?: React.CSSProperties
  children?: string
  mode?: string
  animations?: presetsType[]
  caretConfig?: CaretConfig
  springConfig?: SpringConfig
}

export class TextAnime extends React.Component<TextAnimeTypes> {
  private TextElement: React.ElementType
  interval: number
  enableCaret: boolean
  springConfig: SpringConfig
  myRef: React.RefObject<HTMLDivElement>
  textAnimation: TextAnimation

  constructor(props: TextAnimeTypes) {
    super(props)
    const {
      as = 'div',
      interval = 200,
      springConfig = {},
      animations = []
    } = props
    this.TextElement = as
    this.interval = interval
    this.springConfig = springConfig
    this.myRef = React.createRef()
    this.textAnimation = new TextAnimation(animations)
  }

  componentDidMount() {}

  private hijackChildren = (children: string) => {
    // const mode = this.props?.mode || 'typing'
    const { mode = 'typing', caretConfig = {} } = this.props
    const { enabled: enableCaret = true } = caretConfig
    return createCharacterReactNode(children).map((characterNode, index) => {
      const id = generateUniqueId()
      const lastChildIndex = children.length - 1
      return (
        <SpringCharacter
          className='text-anime-character'
          key={id}
          index={index}
          interval={this.interval}
          springConfig={this.springConfig}
          textAnimation={this.textAnimation}
          mode={mode}
        >
          {characterNode}
          {enableCaret && mode === 'typing' ? (
            <SpringCaret
              key={id}
              index={index}
              shouldHide={lastChildIndex !== index}
              interval={this.interval}
              springConfig={this.springConfig}
            >
              {this.renderCaret()}
            </SpringCaret>
          ) : null}
        </SpringCharacter>
      )
    })
  }
  private renderCaret = () => {
    const { caretConfig = {} } = this.props
    const { caretMark, caretStyle, caretClassName } = caretConfig
    return (
      <Caret
        className={caretClassName ? caretClassName : ''}
        {...{ style: caretStyle }}
      >
        {caretMark}
      </Caret>
    )
  }

  render() {
    const { children, style } = this.props
    const TextElement = this.TextElement
    return (
      <TextElement
        className='TextAnime'
        aria-label='TextAnime'
        ref={this.myRef}
        style={style}
      >
        {children && this.hijackChildren(children)}
      </TextElement>
    )
  }
}

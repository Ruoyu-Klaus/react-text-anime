import { SpringConfig } from '@react-spring/web'
import React from 'react'
import { createCharacterReactNode, generateUniqueId } from '../../utils'
import { Caret } from '../caret'
import { SpringCaret } from '../springCaret'
import { SpringCharacter } from '../springCharacter'

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
  caretConfig?: CaretConfig
  springConfig?: SpringConfig
}

export class TextAnime extends React.Component<TextAnimeTypes> {
  private TextElement: React.ElementType
  caret: React.ReactElement
  interval: number
  enableCaret: boolean
  springConfig: SpringConfig
  myRef: React.RefObject<HTMLDivElement>

  constructor(props: TextAnimeTypes) {
    super(props)
    const {
      as = 'div',
      interval = 200,
      caretConfig = { enabled: true },
      springConfig = {}
    } = props
    this.TextElement = as
    this.interval = interval
    this.springConfig = springConfig
    this.myRef = React.createRef()

    const {
      caretMark,
      caretStyle,
      caretClassName,
      enabled = true
    } = caretConfig
    this.enableCaret = enabled

    this.caret = (
      <Caret
        className={caretClassName ? caretClassName : ''}
        {...{ style: caretStyle }}
      >
        {caretMark}
      </Caret>
    )
  }

  componentDidMount() {}

  private hijackChildren = (children: string) => {
    return createCharacterReactNode(children).map((characterNode, index) => {
      const id = generateUniqueId(0)
      const lastChildIndex = children.length - 1

      return (
        <SpringCharacter
          className='text-anime-character'
          key={id}
          index={index}
          interval={this.interval}
          springConfig={this.springConfig}
        >
          {characterNode}
          {this.enableCaret ? (
            <SpringCaret
              key={id}
              index={index}
              shouldHide={lastChildIndex !== index}
              interval={this.interval}
              springConfig={this.springConfig}
            >
              {this.caret}
            </SpringCaret>
          ) : null}
        </SpringCharacter>
      )
    })
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

import { animated, Spring, SpringConfig } from '@react-spring/web'
import React from 'react'
import { createCharacterReactNode, generateUniqueId } from '../../utils'
import { Caret } from '../caret'

export type TextAnimeTypes = {
  as?: React.ElementType
  typingSpeed?: number
  style?: React.CSSProperties
  children?: string
  caretClassName?: string
  caretMark?: React.ReactNode
  caretStyle?: React.CSSProperties
  springConfig?: SpringConfig
}

export class TextAnime extends React.Component<TextAnimeTypes> {
  private TextElement: React.ElementType
  caret: React.ReactElement
  styledSpan: React.ReactElement
  typingSpeed: number
  springConfig: SpringConfig
  steps: number
  myRef: React.RefObject<HTMLDivElement>

  constructor(props: TextAnimeTypes) {
    super(props)
    const {
      as = 'div',
      typingSpeed = 200,
      caretClassName,
      caretMark,
      caretStyle,
      springConfig = {}
    } = props
    this.TextElement = as
    this.typingSpeed = typingSpeed
    this.springConfig = springConfig
    this.myRef = React.createRef()
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
        <Spring
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          delay={this.typingSpeed * (index + 1)}
          config={{ ...this.springConfig }}
        >
          {(styles) => (
            <animated.span
              style={{ ...styles, position: 'relative' }}
              key={id}
              className='text-anime-character'
            >
              {characterNode}
              <Spring
                from={{ opacity: 1, display: 'inline-block' }}
                to={{
                  opacity: lastChildIndex !== index ? 0 : 1,
                  display: lastChildIndex !== index && 'none'
                }}
                delay={this.typingSpeed * (index + 2)}
                config={{ ...this.springConfig }}
              >
                {(styles) => (
                  <animated.span
                    style={{ ...styles, position: 'absolute' }}
                    key={id}
                    className='text-anime-caret'
                  >
                    {this.caret}
                  </animated.span>
                )}
              </Spring>
            </animated.span>
          )}
        </Spring>
      )
    })
  }

  render() {
    const { children } = this.props
    const TextElement = this.TextElement
    return (
      <TextElement
        className='TextAnime'
        aria-label='TextAnime'
        ref={this.myRef}
      >
        {this.hijackChildren(children)}
      </TextElement>
    )
  }
}

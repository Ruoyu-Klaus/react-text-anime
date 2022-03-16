import { animated, Spring, SpringConfig } from '@react-spring/web'
import React from 'react'
import { createCharacterReactNode, generateUniqueId } from '../../utils'
import Caret from '../caret'
import Text from '../text'

type TextAnimeTypes = {
  as?: React.ElementType
  typingSpeed?: number
  style?: React.CSSProperties
  children?: string
  caretClassName?: string
  caretMark?: React.ReactNode
  caretStyle?: React.CSSProperties
  springConfig?: SpringConfig
}

class TextAnime extends React.Component<TextAnimeTypes> {
  static Text: typeof Text
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

  componentDidMount() {
    console.log(this.myRef.current)
  }

  private hijackChildren = (children: string) => {
    const props = this.props
    return createCharacterReactNode(children).map((characterNode, index) => {
      const id = generateUniqueId(0)
      const lastChildIndex = children.length - 1
      const handleAsyncTo = async (next, cancel) => {
        await next({ opacity: 1 })
      }
      return (
        <>
          <Spring
            from={{ opacity: 0 }}
            to={handleAsyncTo}
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
                      className='text-anime-character'
                    >
                      <Caret
                        key={id}
                        className={
                          props.caretClassName ? props.caretClassName : ''
                        }
                        {...{ style: props.caretStyle }}
                      >
                        {props.caretMark}
                      </Caret>
                    </animated.span>
                  )}
                </Spring>
              </animated.span>
            )}
          </Spring>
        </>
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
TextAnime.Text = Text

export default TextAnime

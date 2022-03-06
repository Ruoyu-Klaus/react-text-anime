import React from 'react'
import Caret from '../caret'
import Text from '../text'
import Delay from '../delay'
import {
  delay,
  generateUniqueId,
  isAnimeTextElement,
  isDelayElement,
  omit
} from '../../utils'

type TextAnimeTypes = {
  typingSpeed?: number
  children?: React.ReactNode
  caretClassName?: string
  caretMark?: React.ReactNode
  caretStyle?: React.CSSProperties
}
class TextAnime extends React.Component<TextAnimeTypes> {
  static Text: typeof Text
  static Delay: typeof Delay
  caret: React.ReactElement
  styledSpan: React.ReactElement
  typingSpeed: number

  constructor(props: TextAnimeTypes) {
    super(props)
    const { typingSpeed = 200, caretClassName, caretMark, caretStyle } = props
    this.typingSpeed = typingSpeed
    this.caret = (
      <Caret className={caretClassName} style={caretStyle}>
        {caretMark}
      </Caret>
    )
  }

  componentDidMount(): void {
    this.startTyping()
  }

  injectAttributes = (children: React.ReactNode) => {
    const recurse = (element) => {
      if (typeof element === 'string' || typeof element === 'number') {
        return this.textSeparator(element).map((characterNode) => {
          const id = generateUniqueId(0)
          const caretNode = React.createElement(
            React.Fragment,
            { key: id },
            this.caret
          )
          return React.createElement('span', {
            key: id,
            id: id,
            className: 'text-anime-character',
            style: {
              whiteSpace: 'pre-wrap',
              visibility: 'hidden'
            },
            children: [characterNode, caretNode]
          })
        })
      }
      return this.injectAttributes(element)
    }
    return React.Children.map(children, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        if (isAnimeTextElement(child)) {
          const props = child.props
          const clonedElement = React.Children.map(props.children, recurse)
          return React.createElement(child.type, props, [...clonedElement])
        } else if (isDelayElement(child)) {
          return React.createElement('span', {
            id: child.props.time,
            className: `text-anime-character delayed`,
            style: { visibility: 'hidden' }
          })
        } else {
          const id = generateUniqueId(0)
          const clonedElement = React.Children.map(
            child.props.children,
            (innerChild: React.ReactNode) => {
              return this.injectAttributes(innerChild)
            }
          )
          return React.createElement(
            child.type,
            {
              ...omit(child.props, ['children']),
              id,
              key: id
            },
            [...clonedElement]
          )
        }
      }
      return child
    })
  }

  private async startTyping() {
    const allCharacters = document.querySelectorAll<HTMLSpanElement>(
      '.text-anime-character'
    )
    let base = 1
    for (let index = 0; index < allCharacters.length; index++) {
      await delay(this.typingSpeed)
      const character = allCharacters[index]
      if (character.classList.contains('delayed')) {
        await delay(Number(character.getAttribute('id')))
        base++
        continue
      }
      character.style.visibility = 'visible'
      // remove last caret
      if (index - base >= 0) {
        allCharacters[index - base].querySelector('.text-anime-caret').remove()
        base > 1 && base--
      }
    }
  }

  private textSeparator = (text) => {
    return text.split('').map((char) => {
      const id = generateUniqueId(1)
      return React.createElement(React.Fragment, { key: id }, char)
    })
  }

  render() {
    const { children } = this.props
    return (
      <div className='TextAnime' aria-label='TextAnime'>
        {this.injectAttributes(children)}
      </div>
    )
  }
}
TextAnime.Text = Text
TextAnime.Delay = Delay

export default TextAnime

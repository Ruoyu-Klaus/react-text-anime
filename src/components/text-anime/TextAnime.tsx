import React from 'react'
import Caret from '../caret'
import Text from '../text'
import Delay from '../delay'
import Backspace from '../backspace'
import {
  delay,
  generateUniqueId,
  isAnimeTextElement,
  isBackspaceElement,
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
  static Backspace: typeof Backspace
  caret: React.ReactElement
  styledSpan: React.ReactElement
  typingSpeed: number

  constructor(props: TextAnimeTypes) {
    super(props)
    const { typingSpeed = 200, caretClassName, caretMark, caretStyle } = props
    this.typingSpeed = typingSpeed
    this.caret = (
      <Caret className={caretClassName} {...{ style: caretStyle }}>
        {caretMark}
      </Caret>
    )
  }

  componentDidMount(): void {
    this.startTyping()
  }

  injectAttributes = (children: React.ReactNode) => {
    const recurse = (props, element) => {
      if (typeof element === 'string' || typeof element === 'number') {
        return this.textSeparator(element).map(
          (characterNode, index, array) => {
            const isLastCharacter = index === array.length - 1
            const id = generateUniqueId(0)
            const caretNode = React.createElement(
              React.Fragment,
              { key: id },
              this.caret
            )
            return React.createElement('span', {
              key: id,
              id: id,
              className: `text-anime-character ${
                props.backspace && 'backspace'
              } ${props.backspace && isLastCharacter ? 'backspace-last' : ''}`,
              style: {
                whiteSpace: 'pre-wrap',
                visibility: 'hidden'
              },
              index: index,
              children: [characterNode, caretNode]
            })
          }
        )
      }
      return this.injectAttributes(element)
    }
    return React.Children.map(children, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        const childKey = generateUniqueId(0)
        const caretNode = React.createElement(
          React.Fragment,
          { key: childKey },
          this.caret
        )
        if (isAnimeTextElement(child)) {
          const props = child.props
          const clonedElement = React.Children.map(
            props.children,
            recurse.bind(null, props)
          )
          return React.createElement(child.type, props, [...clonedElement])
        } else if (isDelayElement(child)) {
          return React.createElement('span', {
            id: child.props.time,
            className: `text-anime-character delayed`,
            style: { visibility: 'hidden' },
            children: [caretNode]
          })
        } else if (isBackspaceElement(child)) {
          return React.createElement('span', {
            id: child.props.count,
            className: `text-anime-character backspace`,
            style: { visibility: 'hidden' },
            children: [caretNode]
          })
        } else {
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
              id: childKey,
              key: childKey
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
    let backspaceStartIndex: number = null
    let backspaceEndIndex: number = null

    for (let index = 0; index < allCharacters.length; index++) {
      await delay(this.typingSpeed)
      const character = allCharacters[index]
      if (character.classList.contains('delayed')) {
        await delay(Number(character.getAttribute('id')))
      }

      // remove last caret
      if (index - 1 >= 0) {
        const caret: HTMLSpanElement =
          allCharacters[index - 1].querySelector('.text-anime-caret')
        caret.style.display = 'none'
      }
      character.style.visibility = 'visible'

      if (character.classList.contains('backspace-last')) {
        const count = Number(character.getAttribute('index'))
        for (
          let backspaceIndex = 0;
          backspaceIndex <= count;
          backspaceIndex++
        ) {
          await delay(this.typingSpeed)
          const character = allCharacters[index - backspaceIndex]
          const lastOneIndex = index - backspaceIndex - 1
          character.style.display = 'none'

          if (lastOneIndex >= 0) {
            const lastCharacter = allCharacters[lastOneIndex]
            const caret: HTMLSpanElement =
              lastCharacter.querySelector('.text-anime-caret')
            caret.style.display = 'inline-block'
          }
          if (index < allCharacters.length - 1) {
            const caret: HTMLSpanElement =
              allCharacters[index - count - 1].querySelector(
                '.text-anime-caret'
              )
            caret.style.display = 'none'
          }
        }
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
TextAnime.Backspace = Backspace

export default TextAnime

import React from 'react'
import Caret from '../caret'
import Text from '../text'
import Wait from '../wait'
import {
  delay,
  generateUniqueId,
  createCharacterReactNode,
  isAnimeTextElement,
  isDelayElement,
  isStringOrNumber,
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
  static Wait: typeof Wait
  caret: React.ReactElement
  styledSpan: React.ReactElement
  typingSpeed: number
  mediator: number

  constructor(props: TextAnimeTypes) {
    super(props)
    const { typingSpeed = 200, caretClassName, caretMark, caretStyle } = props
    this.typingSpeed = typingSpeed
    this.caret = (
      <Caret
        className={caretClassName ? caretClassName : ''}
        {...{ style: caretStyle }}
      >
        {caretMark}
      </Caret>
    )
  }

  componentDidMount(): void {
    this.startTyping()
  }

  private createCaretReactNode = (): React.ReactNode => {
    return React.createElement(
      React.Fragment,
      { key: generateUniqueId(0) },
      this.caret
    )
  }

  private hijackChildren = (children: React.ReactNode) => {
    return React.Children.map(children, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        if (isAnimeTextElement(child)) {
          const props = child.props
          const clonedElement = React.Children.map(
            props.children,
            this.recurseInterceptTextNode.bind(null, props, this.hijackChildren)
          )
          return React.createElement(child.type, props, [...clonedElement])
        } else if (isDelayElement(child)) {
          return React.createElement('span', {
            id: child.props.time,
            className: `text-anime-character delayed`,
            style: { visibility: 'hidden' },
            children: [this.createCaretReactNode()]
          })
        } else {
          const clonedElement = React.Children.map(
            child.props.children,
            (innerChild: React.ReactNode) => {
              return this.hijackChildren(innerChild)
            }
          )
          return React.createElement(
            child.type,
            {
              ...omit(child.props, ['children'])
            },
            [...clonedElement]
          )
        }
      }
      return child
    })
  }

  private recurseInterceptTextNode = (
    props: { backspace: boolean },
    recursionFunc: Function,
    element: React.ReactNode
  ) => {
    if (isStringOrNumber(element)) {
      return createCharacterReactNode(element.toString()).map(
        (characterNode, index, array) => {
          const isLastCharacter = index === array.length - 1
          const id = generateUniqueId(0)
          return React.createElement('span', {
            key: id,
            id: id,
            className: `text-anime-character ${
              props.backspace ? 'backspace' : ''
            } ${props.backspace && isLastCharacter ? 'backspace-last' : ''}`,
            style: {
              whiteSpace: 'pre-wrap',
              visibility: 'hidden'
            },
            index: index,
            children: [characterNode, this.createCaretReactNode()]
          })
        }
      )
    }
    return recursionFunc(element)
  }

  private async startTyping() {
    const allCharacters = document.querySelectorAll<HTMLSpanElement>(
      '.text-anime-character'
    )
    const toggleCaretByIndex = (index: number, show: boolean) => {
      const caret: HTMLSpanElement =
        allCharacters[index].querySelector('.text-anime-caret')
      caret.style.display = show ? 'inline-block' : 'none'
    }

    for (let index = 0; index < allCharacters.length; index++) {
      await delay(this.typingSpeed)
      const character = allCharacters[index]

      const shouldDelay = character.classList.contains('delayed')

      if (shouldDelay) {
        await delay(Number(character.getAttribute('id')))
        if (this.mediator) {
          toggleCaretByIndex(this.mediator, false)
          this.mediator = null
        }
      }
      character.style.visibility = 'visible'
      const previousIndex = index - 1
      if (previousIndex >= 0) {
        toggleCaretByIndex(previousIndex, false)
      }

      const isLastBackspaceCharacter =
        character.classList.contains('backspace-last')
      if (isLastBackspaceCharacter) {
        const numberForBackspace = Number(character.getAttribute('index'))
        for (let stepIndex = 0; stepIndex <= numberForBackspace; stepIndex++) {
          await delay(this.typingSpeed)
          const currentIndex = index - stepIndex
          const character = allCharacters[currentIndex]
          character.style.display = 'none'

          const previousIndex = currentIndex - 1
          if (previousIndex >= 0) {
            toggleCaretByIndex(previousIndex, true)
            this.mediator = previousIndex
          }
        }
      }
    }
  }

  render() {
    const { children } = this.props
    return (
      <div className='TextAnime' aria-label='TextAnime'>
        {this.hijackChildren(children)}
      </div>
    )
  }
}
TextAnime.Text = Text
TextAnime.Wait = Wait

export default TextAnime

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

const caret = <Caret />

type TextAnimeTypes = {
  speed?: number
  children?: React.ReactNode
}

class TextAnime extends React.Component<TextAnimeTypes> {
  static Text: typeof Text
  static Delay: typeof Delay
  speed: number

  state = {
    renderTextList: []
  }

  constructor(props: TextAnimeTypes) {
    super(props)
    const { speed = 200 } = props
    this.speed = speed
  }

  componentDidMount(): void {
    this.startTyping()
  }

  injectAnimation = (children: React.ReactNode) => {
    const recurse = (element) => {
      if (typeof element === 'string' || typeof element === 'number') {
        return this.textSeparator(element).map((characterNode) => {
          const id = generateUniqueId(0)
          const caretNode = React.createElement(
            React.Fragment,
            { key: id },
            caret
          )
          return React.createElement('span', {
            key: id,
            id: id,
            className: 'text-anime-character',
            style: { display: 'none' },
            children: [characterNode, caretNode]
          })
        })
      }
      return this.injectAnimation(element)
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
            style: { display: 'none' }
          })
        } else {
          const id = generateUniqueId(0)
          const clonedElement = React.Children.map(
            child.props.children,
            (innerChild: React.ReactNode) => {
              return this.injectAnimation(innerChild)
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
      await delay(this.speed)
      const character = allCharacters[index]
      if (character.classList.contains('delayed')) {
        await delay(Number(character.getAttribute('id')))
        base++
        continue
      }
      character.style.display = 'initial'
      if (index - base >= 0) {
        allCharacters[index - base].querySelector('span').style.display = 'none'
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
    return <div className={'TextAnime'}>{this.injectAnimation(children)}</div>
  }
}
TextAnime.Text = Text
TextAnime.Delay = Delay

export default TextAnime

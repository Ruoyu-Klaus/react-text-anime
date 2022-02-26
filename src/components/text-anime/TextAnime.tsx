import React from 'react'
import Caret from '../caret'
import Text from '../text'
import { generateUniqueId, isAnimeTextElement, omit } from '../../utils'

const caret = <Caret />

type TextAnimeTypes = {
  speed?: number
  children?: React.ReactNode
}

class TextAnime extends React.Component<TextAnimeTypes> {
  static Text: typeof Text
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

  private startTyping() {
    const allCharacters = document.querySelectorAll<HTMLSpanElement>(
      '.text-anime-character'
    )
    let index = 0
    const timer = setInterval(() => {
      if (index >= allCharacters.length) {
        clearInterval(timer)
        return
      }
      allCharacters[index].style.display = 'initial'
      if (index - 1 >= 0) {
        allCharacters[index - 1].querySelector('span').style.display = 'none'
      }
      index++
    }, this.speed)
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

export default TextAnime

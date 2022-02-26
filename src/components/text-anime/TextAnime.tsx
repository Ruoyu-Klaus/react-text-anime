import React from 'react'
import Caret from '../caret'
import Text from '../text'
import { generateUniqueId, omit } from '../../utils'

const caret = <Caret />

type TextAnimeTypes = {
  speed?: number
  children: React.ReactNode
}

class TextAnime extends React.Component {
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
    const allCharacters = document.querySelectorAll('.text-anime-character')
    let index = 0
    const timer = setInterval(() => {
      if (index >= allCharacters.length) {
        clearInterval(timer)
        return
      }
      allCharacters[index].setAttribute('style', `{visibility: 'visible'}`)
      if (index - 1 >= 0) {
        allCharacters[index - 1].querySelector('span').style.display = 'none'
      }
      index++
    }, 200)
  }

  injectAnimation = (children: React.ReactNode) => {
    return React.Children.map(children, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        if (child.type === TextAnime.Text) {
          const props = child.props
          const splitWords = props.children.split('').map((char) =>
            React.createElement('span', {
              key: generateUniqueId(0),
              id: generateUniqueId(0),
              className: 'text-anime-character',
              style: { color: 'blue', visibility: 'hidden' },
              children: [char, caret]
            })
          )
          return React.cloneElement(
            child,
            { ...props, style: { color: 'red' } },
            splitWords
          )
        } else {
          const tag = child.type
          const props = {
            ...omit(child.props, ['children']),
            id: generateUniqueId(0),
            key: generateUniqueId(0)
          }
          const clonedElement = React.Children.map(
            child.props.children,
            (innerChild: React.ReactNode) => {
              return this.injectAnimation(innerChild)
            }
          )
          return React.createElement(tag, props, [...clonedElement])
        }
      } else {
        return child
      }
    })
  }

  render() {
    const { children } = this.props
    return <div className={'TextAnime'}>{this.injectAnimation(children)}</div>
  }
}

export default Object.assign(TextAnime, { Text })

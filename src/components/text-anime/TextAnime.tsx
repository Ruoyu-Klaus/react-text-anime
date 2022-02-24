import React from 'react'
import Caret from '../caret'

const caret = <Caret />

type TextAnimeTypes = {
  speed?: number
  children: React.ReactNode
}

const getTextNode = (children: React.ReactNode) => {
  let textNodes: string[] = []
  React.Children.map(children, (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      React.Children.map(
        child.props.children,
        (innerChild: React.ReactNode) => {
          textNodes = [...textNodes, ...getTextNode(innerChild)]
        }
      )
    }
    if (Array.isArray(child)) {
      for (const text of child) {
        textNodes = [...textNodes, text]
      }
    }
    if (typeof child === 'string' || typeof child === 'number') {
      textNodes = [...textNodes, child.toString()]
    }
  })
  return textNodes
}

function omit(obj, keys) {
  const { [keys]: _, ...newObj } = obj
  return newObj
}

const hackChildrenInnerText = (
  children: React.ReactNode,
  renderTextList: object[],
  lineIndex: number
): [any, number] => {
  if (lineIndex >= renderTextList.length) {
    return [null, lineIndex]
  }
  let _lineIndex = lineIndex

  const recurse = el => {
    const [child, nextIndex] = hackChildrenInnerText(
      el,
      renderTextList,
      _lineIndex
    )
    _lineIndex = nextIndex
    if (child?.text) {
      const _caret = React.cloneElement(caret, {
        ...caret.props,
        key: child.text,
      })
      return React.createElement(React.Fragment, {}, [
        child.text,
        child.isDone || _caret,
      ])
    }
    return child
  }

  if (React.isValidElement(children)) {
    const clonedChildren =
      React.Children.map(children.props.children, recurse) || []
    const tag = children.type
    const props = {
      ...omit(children.props, ['children']),
      key: new Date().getUTCMilliseconds() + Math.random(),
    }
    const clonedElement = React.createElement(tag, props, [...clonedChildren])
    return [clonedElement, _lineIndex]
  }
  if (Array.isArray(children)) {
    return [children.map(recurse), _lineIndex]
  }

  return [renderTextList[_lineIndex], _lineIndex + 1]
}

export default class TextAnime extends React.Component {
  textNodes: string[]
  speed: number
  state = {
    renderTextList: [],
  }

  constructor(props: TextAnimeTypes) {
    super(props)
    const { children, speed = 200 } = props
    this.speed = speed
    this.textNodes = getTextNode(children)
    this.generateRenderText(getTextNode(children))
  }

  generateRenderText = (textNodes: string[]) => {
    if (!textNodes.length) {
      return []
    }
    let lineIndex = 0
    let wordCount = 1
    let initState: object[] = []
    const timer = setInterval(() => {
      if (lineIndex >= textNodes.length) {
        clearInterval(timer)
        return
      }
      let currentLine = textNodes[lineIndex]
      const typeCharacters = currentLine.substring(0, wordCount)
      initState[lineIndex] = { text: typeCharacters, isDone: false }
      this.setState({ renderTextList: initState })
      wordCount++
      if (wordCount > currentLine.length) {
        initState[lineIndex] = { text: typeCharacters, isDone: true }
        this.setState({ renderTextList: initState })
        lineIndex++
        wordCount = 1
      }
    }, this.speed)
  }

  render() {
    return (
      <div>
        {
          hackChildrenInnerText(
            this.props.children,
            this.state.renderTextList,
            0
          )[0]
        }
      </div>
    )
  }
}

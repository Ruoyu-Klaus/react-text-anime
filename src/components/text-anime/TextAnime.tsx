import React from 'react'
import Caret from '../caret'
import { getTextNode, omit } from '../../utils'

const caret = <Caret />

type TextAnimeTypes = {
  speed?: number
  children: React.ReactNode
}
type typeText = {
  text: string
  isDone: boolean
}
const hackChildrenInnerText = (
  children: React.ReactNode,
  renderTextList: typeText[],
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
  speed: number

  state = {
    renderTextList: [],
  }

  constructor(props: TextAnimeTypes) {
    super(props)
    const { children, speed = 200 } = props
    this.speed = speed
    this.generateRenderText(getTextNode(children))
  }

  generateRenderText = (textNodes: string[]) => {
    if (!textNodes.length) {
      return []
    }
    let lineIndex = 0
    let wordCount = 1
    const initState: object[] = []
    const timer = setInterval(() => {
      if (lineIndex >= textNodes.length) {
        clearInterval(timer)
        return
      }
      const currentLine = textNodes[lineIndex]
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
    const { children } = this.props
    const { renderTextList } = this.state
    return <div>{hackChildrenInnerText(children, renderTextList, 0)[0]}</div>
  }
}

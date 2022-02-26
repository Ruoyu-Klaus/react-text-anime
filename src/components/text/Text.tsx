import React, { PureComponent } from 'react'

type TextTypes = {
  as?: React.ElementType
  children?: string
  className?: string
  style?: React.CSSProperties
}

export default class Text extends PureComponent<TextTypes> {
  TextElement
  constructor(props: TextTypes) {
    super(props)
    this.TextElement = props.as || 'p'
  }

  render() {
    const { children, ...rest } = this.props
    const TextElement = this.TextElement
    return <TextElement {...rest}>{children}</TextElement>
  }
}

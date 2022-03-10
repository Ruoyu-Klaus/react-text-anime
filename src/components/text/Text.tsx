import React, { PureComponent } from 'react'

type TextTypes = {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  backspace?: boolean
}

export default class Text extends PureComponent<TextTypes> {
  private TextElement: React.ElementType
  constructor(props: TextTypes) {
    super(props)
    this.TextElement = props.as || 'p'
  }

  render() {
    const { children, backspace, ...rest } = this.props
    const TextElement = this.TextElement
    return <TextElement {...rest}>{children}</TextElement>
  }
}

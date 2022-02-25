import React, { PureComponent } from 'react'

type TextTypes = {
  as?: React.ElementType
  children?: string
}

export default class Text extends PureComponent {
  constructor(props: TextTypes) {
    super(props)
  }

  render() {
    const { children, ...rest } = this.props
    return <p {...rest}>{children}</p>
  }
}

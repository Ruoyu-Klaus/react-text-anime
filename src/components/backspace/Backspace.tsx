import React, { PureComponent } from 'react'

type BackspaceType = {
  count: number
}

export default class Backspace extends PureComponent<BackspaceType> {
  constructor(props) {
    super(props)
  }

  render() {
    return <span></span>
  }
}

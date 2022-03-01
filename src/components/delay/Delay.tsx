import React, { PureComponent } from 'react'

type DelayType = {
  time: number
}

export default class Delay extends PureComponent<DelayType> {
  constructor(props) {
    super(props)
  }

  render() {
    return <span></span>
  }
}

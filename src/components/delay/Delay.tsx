import React, { PureComponent } from 'react'

type DelayType = {
  time: number
}

export default class Delay extends PureComponent<DelayType> {
  constructor(props: DelayType | Readonly<DelayType>) {
    super(props)
  }

  render() {
    return <span></span>
  }
}

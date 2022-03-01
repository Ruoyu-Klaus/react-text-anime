import { render } from '@testing-library/react'
import React from 'react'
import Delay from './Delay'

describe('Delay Component', () => {
  it('should have span tag with time props', () => {
    const { container } = render(<Delay time={1000} />)
    expect(container).toBeInTheDocument()
    expect(container.querySelector('span')).not.toBeNull()
  })
})

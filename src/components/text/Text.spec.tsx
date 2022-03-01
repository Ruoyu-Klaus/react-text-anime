import { render } from '@testing-library/react'
import React from 'react'
import Text from './Text'

describe('Delay Component', () => {
  it('should render a h1 element with class name text', () => {
    const { container } = render(<Text as='h1' className='text' />)
    expect(container.querySelector('h1')).toBeInTheDocument()
    expect(container.querySelector('h1')).toHaveClass('text')
  })
})

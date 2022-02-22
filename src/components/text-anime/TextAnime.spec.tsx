import { render } from '@testing-library/react'
import React from 'react'
import Button from './TextAnime'

describe('Test Component', () => {
  it('should have primary className with default props', () => {
    const { getByRole } = render(<Button />)
    expect(getByRole('button')).toBeInTheDocument()
  })
})

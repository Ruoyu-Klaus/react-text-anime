import { render } from '@testing-library/react'
import React from 'react'
import TextAnime from './TextAnime'

describe('Test Component', () => {
  it('should have primary className with default props', () => {
    const { getByRole } = render(<TextAnime />)
    expect(getByRole('div')).toBeInTheDocument()
  })
})

import { render } from '@testing-library/react'
import React from 'react'
import { TextAnime } from './TextAnime'

describe('TextAnime Component', () => {
  it('should have TextAnime className with default props', () => {
    const { container } = render(<TextAnime />)
    expect(container).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('TextAnime')
  })
})

import { render } from '@testing-library/react'
import CustomInput from './custom-input.component'
import Colors from '../../themes/theme.colors'

describe('Custom Input', () => {
  it('should render with error if hasError is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder='Lorem Ipsum' haserror={true} />
    )
    const input = getByPlaceholderText('Lorem Ipsum')

    expect(input).toHaveStyle({ border: `2px solid ${Colors.error}` })
  })
})

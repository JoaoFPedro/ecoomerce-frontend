import { FunctionComponent } from 'react'
import { InputErrorMessageContainer } from './input-error-message.styles'

const InputErrorMessage: FunctionComponent <any> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage

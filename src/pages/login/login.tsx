import Header from '../../components/header/header-component'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
    <>
        <Header />
        <LoginContainer>
        <LoginContent>
            
                <LoginHeadline> Entre com a sua conta</LoginHeadline>

                {/* Button */}

                <LoginSubtitle>ou entre com o seu email</LoginSubtitle>

                <LoginInputContainer>{/* Email Input */}</LoginInputContainer>
                <LoginInputContainer>{/* Passoward Input */}</LoginInputContainer>

            
        </LoginContent>
        </LoginContainer>
    </>
  )
}

export default LoginPage

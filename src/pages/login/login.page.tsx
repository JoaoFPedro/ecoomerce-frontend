import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header-component'
import { LoginContainer, LoginContent, LoginHeadline, LoginInputContainer, LoginSubtitle } from './login.styles'

const LoginPage = () => {
  return (
    <>
        <Header />
        <LoginContainer>
        <LoginContent>
            
                <LoginHeadline> Entre com a sua conta</LoginHeadline>

                <CustomButton startIcon={<BsGoogle size={18}/>}>Entrar com o google</CustomButton>

                <LoginSubtitle>ou entre com o seu email</LoginSubtitle>

                <CustomButton startIcon={<FiLogIn size={18}/>}>Log In</CustomButton>

                <LoginInputContainer>{/* Email Input */}</LoginInputContainer>
                <LoginInputContainer>{/* Passoward Input */}</LoginInputContainer>

            
        </LoginContent>
        </LoginContainer>
    </>
  )
}

export default LoginPage

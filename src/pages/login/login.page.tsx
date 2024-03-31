import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header-component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import CustomInput from '../../components/custom-input/custom-input.component'
import { useForm } from 'react-hook-form'

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log({ data })
  }


  console.log({ errors })

  
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent>
          <LoginHeadline> Entre com a sua conta</LoginHeadline>

          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu email</LoginSubtitle>

          <LoginInputContainer>
            <p>Email</p>
            <CustomInput
            hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', { required: true })}
            />
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
             hasError={!!errors?.passowrd}
              placeholder='Digite sua senha'
              {...register('passowrd', { required: true })}
            />
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Log In
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage

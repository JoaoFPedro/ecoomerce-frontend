import { useForm } from 'react-hook-form'
import CustomInput from '../custom-input/custom-input.component'
import Header from '../header/header-component'
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.page.styles'
import CustomButton from '../custom-button/custom-button.component'
import { FiLogIn } from 'react-icons/fi'

interface SignUpForm{

}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log({ data })
  }
  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Criar sua conta</SignUpHeadline>
          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              {...register('name', {
                required: true
              })}
              hasError={!!errors?.name}
              placeholder='Digite seu nome '
            ></CustomInput>
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              {...register('lastname', {
                required: true
              })}
              placeholder='Digite seu sobrenome '
              hasError={!!errors?.lastname}
            ></CustomInput>
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Email</p>
            <CustomInput placeholder='Digite seu email '></CustomInput>
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha '
              {...register}
            ></CustomInput>
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmar Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha novamente'
            ></CustomInput>
          </SignUpInputContainer>
          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Criar Conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  )
}

export default SignUpPage

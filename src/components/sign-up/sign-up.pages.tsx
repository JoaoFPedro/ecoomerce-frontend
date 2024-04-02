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
import { isEmail } from 'validator'
import InputErrorMessage from '../input-error-message/input-error-message.component'

interface SignUpForm {
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>()

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
            /> {errors?.name?.type === 'required' && (
              <InputErrorMessage>O nome é obrigatório</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              {...register('lastName', {
                required: true
              })}
              placeholder='Digite seu sobrenome '
              hasError={!!errors?.lastName}
            />
            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>O Sobrenome é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Email</p>
            <CustomInput
              {...register('email', {
                required: true,
                validate: (value) => {
                  return isEmail(value)
                }
              })}
              placeholder='Digite seu email '
              hasError={!!errors?.email}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha '
              {...register('password', {
                required: true
              })}
              hasError={!!errors?.password}
            /> {errors?.password?.type === 'required' && (
              <InputErrorMessage> A senha é obrigatória.</InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmar Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha novamente'
              {...register('passwordConfirmation', { required: true })}
              hasError={!!errors?.passwordConfirmation}
            /> {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>Confirme sua senha.</InputErrorMessage>
            )}
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

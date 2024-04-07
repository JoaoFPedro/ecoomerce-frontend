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
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../config/firebase.config'
import { addDoc, collection } from 'firebase/firestore'

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
    formState: { errors },
    watch,
    setError
  } = useForm<SignUpForm>()

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log({ userCredentials })
      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        name: data.name,
        lastName: data.lastName,
        email: userCredentials.user.email,
        provider: 'firebase'
      })
    } catch (error) {
      console.log(error)
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyExist' })
      }
      if (_error.code === AuthErrorCodes.WEAK_PASSWORD) {
        return setError('password', { type: 'passwordWeek' })
      }
    }
  }
  const watchPassword = watch('password')
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
              haserror={!!errors?.name}
              placeholder='Digite seu nome '
            />{' '}
            {errors?.name?.type === 'required' && (
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
              haserror={!!errors?.lastName}
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
              haserror={!!errors?.email}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === 'alreadyExist' && (
              <InputErrorMessage>Email ja existente.</InputErrorMessage>
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
              haserror={!!errors?.password}
            />{' '}
            {errors?.password?.type === 'required' && (
              <InputErrorMessage> A senha é obrigatória.</InputErrorMessage>
            )}
            {errors?.password?.type === 'passwordWeek' && (
              <InputErrorMessage>
                A senha deve conter mais de 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <p>Confirmar Senha</p>
            <CustomInput
              type='password'
              placeholder='Digite sua senha novamente'
              {...register('passwordConfirmation', {
                required: true,
                validate: (value) => {
                  return value === watchPassword
                }
              })}
              haserror={!!errors?.passwordConfirmation}
            />{' '}
            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>As senhas nao coincidem.</InputErrorMessage>
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

import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import validator from 'validator'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'

import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

// Styles
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import Header from '../../components/header/header-component'
import { auth, db, googleProvider } from '../../config/firebase.config'
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Loading from '../../components/loading/loading.component'

import { useAppSelector } from '../../hooks/redux.hook'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginForm>()

  // const { isAuthenticated } = useContext(userContext)

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const navigate = useNavigate()

  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      setIsloading(true)
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      console.log({ userCredentials })
    } catch (error) {
      const _error = error as AuthError

      console.log(_error)

      if (_error.code === AuthErrorCodes.INVALID_IDP_RESPONSE) {
        setError('email', { type: 'invalidEmail' })
      }
      if (_error.code === AuthErrorCodes.INVALID_IDP_RESPONSE) {
        setError('password', { type: 'invalidPassword' })
      }
    } finally {
      setIsloading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      setIsloading(true)
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredentials.user.uid)
        )
      )

      const user = querySnapshot.docs[0]?.data()

      console.log(user)

      if (!user) {
        const firstName = userCredentials.user.displayName?.split(' ')[0]
        const lastName = userCredentials.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={handleSignInWithGoogle}
          >
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu e-mail</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              haserror={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value)
                }
              })}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Por favor, insira um e-mail válido.
              </InputErrorMessage>
            )}
            {errors?.email?.type === 'invalidEmail' && (
              <InputErrorMessage>Email ou senha inválidos.</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              haserror={!!errors?.password}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', { required: true })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
            )}
            {errors?.password?.type === 'invalidPassword' && (
              <InputErrorMessage>Email ou senha inválidos.</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage

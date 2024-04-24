import { FunctionComponent, useContext, useEffect } from 'react'
import { userContext } from '../contexts/user.context'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/header-component'
import Loading from '../components/loading/loading.component'

interface childrenProps {
  children: any
}

const Authentication: FunctionComponent<childrenProps> = ({ children }) => {
  const { isAuthenticated } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading message='Você precisa estar logado para terminar a sua compra. Você será redirecionado para tela de login!' />
      </>
    )
  }
  return <>{children}</>
}

export default Authentication

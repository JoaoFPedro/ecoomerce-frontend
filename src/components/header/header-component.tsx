import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { useContext } from 'react'
import { userContext } from '../../contexts/user.context'

const Header = () => {
  const { isAuthenticated } = useContext(userContext)

  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleHomeClick = () => {
    navigate('/')
  }
  const handleSignUpClick = () => {
    navigate('/sign-up')
  }
  const handleLogClick = () => {
    navigate('/')
  }
  const handleExploreClick = () => {
    navigate('/explore')
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogClick}>CLUB CLOTHING</HeaderTitle>

      <HeaderItems>
       
        <HeaderItem onClick={handleHomeClick}>Home</HeaderItem>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
          </>
        )}
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header

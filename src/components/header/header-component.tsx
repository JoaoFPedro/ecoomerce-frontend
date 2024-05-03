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

import { CartContext } from '../../contexts/cart.context'

import { useSelector, useDispatch } from 'react-redux'
import { logOutUser } from '../../store/reducers/user/user.actions'
import { toggleCart } from '../../store/reducers/cart/cart.actions'

const Header = () => {
  // const { isAuthenticated } = useContext(userContext)

  const { productsCart /* toggleCart */ } = useContext(CartContext)

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  const dispatch = useDispatch<any>()

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
  const handleSignOutClick = () => {
    dispatch(logOutUser())
    signOut(auth)
    navigate('/login')
  }
  const handleCartClick = () => {
    dispatch(toggleCart())
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
            <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
          </>
        )}
        <HeaderItem onClick={handleCartClick}>
          <BsCart3 size={25} />
          <p style={{ marginLeft: 5 }}>{productsCart}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header

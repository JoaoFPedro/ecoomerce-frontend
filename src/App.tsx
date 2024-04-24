import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './components/sign-up/sign-up.pages'
import { FunctionComponent, useContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { userContext } from './contexts/user.context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converts/firestore.converts'
import Loading from './components/loading/loading.component'
import ExplorePage from './pages/explore/explore.page'
import CategoryDetailsPage from './pages/category-details/category.details.page'
import Cart from './components/cart/cart.component'
import CheckOutPage from './pages/checkout/checkout.page'
import Authentication from './guards/authenticaton.component'

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(userContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      logoutUser()
      return setIsInitializing(false)
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user.uid)
        )
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore)

      return setIsInitializing(false)
    }
    return setIsInitializing(false)
  })
  if (isInitializing) return <Loading />

  console.log({ isAuthenticated })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />}></Route>
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category-details/:id' element={<CategoryDetailsPage/>} />
        <Route path='/checkout' element={<Authentication><CheckOutPage></CheckOutPage></Authentication>} />
      </Routes>

      <Cart />
    </BrowserRouter>
  )
}

export default App

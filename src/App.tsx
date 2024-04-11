import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './components/sign-up/sign-up.pages'
import { FunctionComponent, useContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { userContext } from './contexts/user.context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converts/firestore.converts'

const App: FunctionComponent = () => {
  const { isAuthenticated, loginUser, logoutUser } =
    useContext(userContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      return logoutUser()
    }

    const isSigningIn = !isAuthenticated && user
    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users').withConverter(userConverter), where('id', '==', user.uid))
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()
      return loginUser(userFromFirestore)
    }
  })


  console.log({ isAuthenticated })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './components/sign-up/sign-up.pages'
import { FunctionComponent } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase.config'

const App: FunctionComponent = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user)
  })
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

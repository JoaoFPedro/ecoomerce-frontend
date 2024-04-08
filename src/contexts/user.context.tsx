import { FunctionComponent, ReactNode, createContext, useState } from 'react'

interface UserContext {
    currentUser: any
}

const userContext = createContext<UserContext>({
  currentUser: null
})

const UserContextProvider: FunctionComponent<{children: ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserContext>()

  return (
    <userContext.Provider value={{ currentUser }}>
      {children}
    </userContext.Provider>
  )
}
export default UserContextProvider

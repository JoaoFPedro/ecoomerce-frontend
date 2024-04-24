import { FunctionComponent } from 'react'
import { LoadingContainer } from './loading.style'
import { SyncLoader } from 'react-spinners'

interface LoginProps {
  message?: string
}

const Loading: FunctionComponent<LoginProps> = ({ message }) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}

      <SyncLoader size={30} />
    </LoadingContainer>
  )
}

export default Loading

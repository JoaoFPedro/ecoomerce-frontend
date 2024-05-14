import { FunctionComponent, useEffect } from 'react'
import Header from '../../components/header/header-component'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome
} from 'react-icons/ai'
import CustomButton from '../../components/custom-button/custom-button.component'

import { useDispatch } from 'react-redux'
import { clearProducts } from '../../store/toolkit/cart/cart.slice'


const PaymentConfirmation: FunctionComponent = () => {
  // const { clearProduct } = useContext(CartContext)

  const [searchParams] = useSearchParams()

  const navigate = useNavigate()

  const disptach = useDispatch()
  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled') === 'true'

  useEffect(() => {
    if (status === 'true') {
      disptach(clearProducts())
    }
  }, [status])

  const handleReturnToHomePageClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />

      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} />
              <p>Sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente!
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleReturnToHomePageClick}
          >
            Voltar para o inicio
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmation

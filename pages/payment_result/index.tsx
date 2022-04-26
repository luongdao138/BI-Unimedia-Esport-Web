import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import PaymentResultContainer from '@containers/PaymentResult'
const PaymentResult: PageWithLayoutType = () => {
  return (
    <PlainLayout>
      <PaymentResultContainer />
    </PlainLayout>
  )
}

export default PaymentResult

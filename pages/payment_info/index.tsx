import PageWithLayoutType from '@constants/page'
import StreamerRequireLayout from '@layouts/StreamerRequireLayout'
import PaymentInfoContainer from '@containers/PaymentInfoContainer'

const PaymentInfoPage: PageWithLayoutType = () => {
  return (
    <StreamerRequireLayout>
      <PaymentInfoContainer />
    </StreamerRequireLayout>
  )
}

export default PaymentInfoPage

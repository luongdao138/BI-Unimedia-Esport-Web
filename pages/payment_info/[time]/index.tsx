import PageWithLayoutType from '@constants/page'
import PaymentInfoDetailContainer from '@containers/PaymentInfoDetailContainer'
import StreamerRequireLayout from '@layouts/StreamerRequireLayout'

const PaymentInfoDetailPage: PageWithLayoutType = () => {
  return (
    <StreamerRequireLayout>
      <PaymentInfoDetailContainer />
    </StreamerRequireLayout>
  )
}

export default PaymentInfoDetailPage

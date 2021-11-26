import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import PaymentInfoDetailContainer from '@containers/PaymentInfoDetailContainer'

const PaymentInfoDetailPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <PaymentInfoDetailContainer />
    </StreamLayout>
  )
}

export default PaymentInfoDetailPage

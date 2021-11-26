import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import PaymentInfoContainer from '@containers/PaymentInfoContainer'

const PaymentInfoPage: PageWithLayoutType = () => {
  return (
    <StreamLayout loginRequired>
      <PaymentInfoContainer />
    </StreamLayout>
  )
}

export default PaymentInfoPage

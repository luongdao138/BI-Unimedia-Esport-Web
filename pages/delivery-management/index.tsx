import PageWithLayoutType from '@constants/page'
import StreamLayout from '@layouts/StreamLayout'
import DeliveryManagementContainer from '@containers/DeliveryManagementContainer'

const DeliveryManagementPage: PageWithLayoutType = () => {
  return <StreamLayout>
      <DeliveryManagementContainer />
    </StreamLayout>
}

export default DeliveryManagementPage

import StreamLayout from '@layouts/StreamLayout'
import PageWithLayoutType from '@constants/page'
import DeliveryManagement from '@containers/DeliveryManagement'

const DeliveryManagementPage: PageWithLayoutType = () => {
  return <StreamLayout loginRequired>
      <DeliveryManagement />
    </StreamLayout>
}

export default DeliveryManagementPage

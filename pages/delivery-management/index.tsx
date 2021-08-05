import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import DeliveryManagementContainer from '@containers/DeliveryManagementContainer'

const DeliveryManagementPage: PageWithLayoutType = () => {
  return <DeliveryManagementContainer />
}

DeliveryManagementPage.Layout = MainLayout

export default DeliveryManagementPage

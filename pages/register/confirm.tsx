import ConfirmContainer from '@containers/Confirm'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const ConfirmPage: PageWithLayoutType = () => {
  return <ConfirmContainer />
}

export default withNoAuth(ConfirmPage)

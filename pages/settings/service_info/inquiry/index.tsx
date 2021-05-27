import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESInquiry from '@containers/Inquiry'

const InquirySetingsPage: PageWithLayoutType = () => {
  return <ESInquiry />
}

InquirySetingsPage.Layout = MainLayout

export default InquirySetingsPage

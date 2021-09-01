import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ESInquiry from '@containers/Inquiry'

const InquirySetingsPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={false}>
      <ESInquiry />
    </MainLayout>
  )
}

export default InquirySetingsPage

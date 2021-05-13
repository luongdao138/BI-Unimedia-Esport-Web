import { useRouter } from 'next/router'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const Message: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return <>roomID:{id}</>
}

Message.Layout = MainLayout

export default Message

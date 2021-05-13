import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'

const Room: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return <>roomID:{id}</>
}

Room.Layout = MessageLayout

export default Room

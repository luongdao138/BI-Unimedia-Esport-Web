import { useRouter } from 'next/router'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const Room: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return <>roomID:{id}</>
}

Room.Layout = MainLayout

export default Room

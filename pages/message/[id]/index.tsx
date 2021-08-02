import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ChatRoomContainer from '@containers/ChatRoomContainer'
import { withAuth } from '@utils/withAuth'

// TODO get this data from endpoint

// const useStyles = makeStyles((theme) => ({
//   selectInputContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottom: `1px solid ${Colors.grey['100']}`,
//     paddingBottom: theme.spacing(1.5),
//     paddingTop: theme.spacing(1.5),
//     paddingRight: theme.spacing(1),
//   },
// }))

const Room: PageWithLayoutType = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <MessageLayout>
      <ChatRoomContainer router={router} roomId={id} />
    </MessageLayout>
  )
}

export default withAuth(Room)

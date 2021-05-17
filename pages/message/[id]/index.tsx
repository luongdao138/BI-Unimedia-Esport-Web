import { useRouter } from 'next/router'
import MessageLayout from '@layouts/MessageLayout'
import PageWithLayoutType from '@constants/page'
import ESSelectInput from '@components/SelectInput'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

// TODO get this data from endpoint
const top100Films = [
  {
    id: 1,
    nickname: 'Long nickname Long nickname Long nickname Long nickname Long nickname ',
    avatar: 'https://robohash.org/consequaturquidemcorporis.png?size=50x50&set=set1',
    user_code: 'long usercode long usercode long usercode long usercode long usercode ',
  },
  {
    id: 2,
    nickname: 'Peggy',
    avatar: 'https://robohash.org/quosdoloremoccaecati.png?size=50x50&set=set1',
    user_code: 'pmeus1',
  },
  {
    id: 3,
    nickname: 'Katerine',
    avatar: 'https://robohash.org/eanihiltempore.png?size=50x50&set=set1',
    user_code: 'kgionettitti2',
  },
]

const useStyles = makeStyles((theme) => ({
  selectInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${Colors.grey['100']}`,
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    paddingRight: theme.spacing(1),
  },
}))

const Room: PageWithLayoutType = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()
  const { id } = router.query

  const handleSelectedItems = (selectedItems) => {
    // eslint-disable-next-line no-console
    console.log(selectedItems)
  }

  return (
    <>
      roomID:{id}
      <Box className={classes.selectInputContainer}>
        <Box paddingLeft={2} paddingRight={2}>
          <Typography variant="h2" noWrap>
            {t('common:chat.destination')}
          </Typography>
        </Box>
        <ESSelectInput items={top100Films} onItemsSelected={handleSelectedItems} />
      </Box>
    </>
  )
}

Room.Layout = MessageLayout

export default Room

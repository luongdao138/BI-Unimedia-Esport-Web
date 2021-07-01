import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESMenuItem from '@components/Menu/MenuItem'
import ESMenu from '@components/Menu'
import { useRouter } from 'next/router'

interface Props {
  data: any
}

const BlockedUserItem: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  const user = data.attributes
  const router = useRouter()
  const classes = useStyles()

  return (
    <div>
      <Box margin={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden" className={classes.wrap}>
          <ESAvatar
            alt={user.nickname}
            src={user.avatar}
            onClick={() => {
              router.push(`/profile/${user.user_code}`)
            }}
          />
          <Box overflow="hidden" textOverflow="ellipsis" ml={1} display="flex" flexDirection="column" justifyContent="center" width="100%">
            <Typography noWrap style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
              {user.nickname}
            </Typography>
            <Typography variant="caption" noWrap>
              {t('common:common.at')}
              {user.user_code}
            </Typography>
          </Box>
          <Box className={classes.menu}>
            <ESMenu>
              <ESMenuItem onClick={() => console.error('プロフィールを編集')}>{t('common:profile.unblock')}</ESMenuItem>
            </ESMenu>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    width: '100%',
    padding: theme.spacing(2),
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  menu: {
    alignSelf: 'center',
  },
}))

export default BlockedUserItem

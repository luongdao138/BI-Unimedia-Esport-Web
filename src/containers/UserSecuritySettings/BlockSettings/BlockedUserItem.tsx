import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface Props {
  data: any
}

const BlockedUserItem: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  const user = data.attributes

  const classes = useStyles()

  return (
    <div>
      <Box margin={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden" className={classes.wrap}>
          <ESAvatar alt={user.nickname} src={user.avatar} />
          <Box overflow="hidden" textOverflow="ellipsis" ml={1} display="flex" flexDirection="column" justifyContent="center" width="100%">
            <Typography noWrap style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
              {user.nickname}
            </Typography>
            <Typography variant="caption" noWrap>
              {t('common:common.at')}
              {user.user_code}
            </Typography>
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
}))

export default BlockedUserItem

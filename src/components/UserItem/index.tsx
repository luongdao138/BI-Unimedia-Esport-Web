import { Grid, Typography, Box } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface Props {
  data: any
  rightItem?: JSX.Element
}

const UserListItem: React.FC<Props> = ({ data, rightItem }) => {
  const { t } = useTranslation(['common'])
  const user = data.attributes
  return (
    <Grid item xs={12}>
      <Box margin={3} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden">
          <ESAvatar alt={user.nickname} src={user.avatar} />
          <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
            <Box color={Colors.white}>
              <Typography variant="h3" noWrap>
                {user.nickname}
              </Typography>
            </Box>
            <Typography variant="caption" noWrap>
              {t('common:common.at')}
              {user.user_code}
            </Typography>
          </Box>
        </Box>
        {rightItem}
      </Box>
    </Grid>
  )
}

export default UserListItem

import { Grid, Typography, Box } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'

interface Props {
  data: any
}

const NotificationListItem: React.FC<Props> = ({ data }) => {
  const notification = data.attributes
  return (
    <Grid item xs={12}>
      <Box marginY={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden">
          <ESAvatar alt={notification.nickname} src={notification.full_message} />
          <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
            <Box color={Colors.white}>
              <Typography variant="h3" noWrap>
                {notification.nickname}
              </Typography>
            </Box>
            <Typography variant="caption" noWrap>
              {notification.message}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default NotificationListItem

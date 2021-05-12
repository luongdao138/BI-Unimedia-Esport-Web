import { Typography, Box, makeStyles, Grid } from '@material-ui/core'
import ESChip from '@components/Chip'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ACTIVITY_ACTION_TYPE } from '@constants/common.constants'

interface Props {
  activity: any
}

const useStyles = makeStyles(() => ({
  targetText: {
    textDecoration: 'underline',
  },
  chip: {
    backgroundColor: Colors.black,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
}))
const ActivityItem: React.FC<Props> = ({ activity }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = activity.attributes
  const target = data.target_name != undefined ? data.target_name : null
  const action = data.action_type
  const actionTitle: { prefix: string; suffix: string } = {
    prefix: '',
    suffix: '',
  }
  switch (action) {
    case ACTIVITY_ACTION_TYPE.TOPIC_CREATE:
      actionTitle.prefix = t('common:action_types.topic_create_px')
      actionTitle.suffix = t('common:action_types.topic_create_sx')
      break
    case ACTIVITY_ACTION_TYPE.TOPIC_COMMENT:
      actionTitle.prefix = t('common:action_types.topic_comment_px')
      actionTitle.suffix = t('common:action_types.topic_comment_sx')
      break
    case ACTIVITY_ACTION_TYPE.COMMUNITY_CREATE:
      actionTitle.prefix = t('common:action_types.community_create_px')
      actionTitle.suffix = t('common:action_types.community_create_sx')
      break
    case ACTIVITY_ACTION_TYPE.COMMUNITY_JOIN:
      actionTitle.prefix = t('common:action_types.community_join_px')
      actionTitle.suffix = t('common:action_types.community_join_sx')
      break
    case ACTIVITY_ACTION_TYPE.USER_FOLLOWS:
      actionTitle.prefix = t('common:action_types.user_follows_px')
      actionTitle.suffix = t('common:action_types.user_follows_sx')
      break
    case ACTIVITY_ACTION_TYPE.RECRUITMENT_CREATE:
      actionTitle.prefix = t('common:action_types.recruitment_create_px')
      actionTitle.suffix = t('common:action_types.recruitment_create_sx')
      break
    case ACTIVITY_ACTION_TYPE.RECRUITMENT_JOIN:
      actionTitle.prefix = t('common:action_types.recruitment_entry_px')
      actionTitle.suffix = t('common:action_types.recruitment_entry_sx')
      break
    case ACTIVITY_ACTION_TYPE.TOURNAMENT_CREATE:
      actionTitle.prefix = t('common:action_types.tournament_create_px')
      actionTitle.suffix = t('common:action_types.tournament_create_sx')
      break
    case ACTIVITY_ACTION_TYPE.TOURNAMENT_JOIN:
      actionTitle.prefix = t('common:action_types.tournament_entry_px')
      actionTitle.suffix = t('common:action_types.tournament_entry_sx')
      break
    default:
      break
  }

  return (
    <Grid item xs={12}>
      <Box my={1}>
        <ESChip
          className={classes.chip}
          variant="outlined"
          color="default"
          label={
            <Box display="flex" flexDirection="row">
              <Typography>{actionTitle.prefix}</Typography>
              <Typography className={classes.targetText} color="primary">
                {target}
              </Typography>
              <Typography>{actionTitle.suffix}</Typography>
            </Box>
          }
        ></ESChip>
      </Box>
    </Grid>
  )
}

export default ActivityItem

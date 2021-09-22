import { Typography, Box, makeStyles, Grid, ButtonBase } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ACTIVITY_ACTION_TYPE } from '@constants/common.constants'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { ActivityLog } from '@services/user.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface Props {
  activity: ActivityLog
}

const ActivityItem: React.FC<Props> = ({ activity }) => {
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = activity.attributes
  const target = data.target_name != undefined ? data.target_name : null
  const targetId = data.target_id

  const time = CommonHelper.staticSmartTime(data.created_at)

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

  const handleTarget = () => {
    if (targetId) {
      switch (action) {
        case ACTIVITY_ACTION_TYPE.TOPIC_CREATE:
          router.push(`${ESRoutes.TOPIC}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.TOPIC_COMMENT:
          router.push(`${ESRoutes.TOPIC}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.COMMUNITY_CREATE:
          router.push(`${ESRoutes.COMMUNITY}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.COMMUNITY_JOIN:
          router.push(`${ESRoutes.COMMUNITY}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.USER_FOLLOWS:
          router.push(`${ESRoutes.PROFILE}/${data.user_code}`)
          break
        case ACTIVITY_ACTION_TYPE.RECRUITMENT_CREATE:
          router.push(`${ESRoutes.LOBBY}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.RECRUITMENT_JOIN:
          router.push(`${ESRoutes.LOBBY}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.TOURNAMENT_CREATE:
          router.push(`${ESRoutes.ARENA}/${data.hash_key}`)
          break
        case ACTIVITY_ACTION_TYPE.TOURNAMENT_JOIN:
          router.push(`${ESRoutes.ARENA}/${data.hash_key}`)
          break
        default:
          break
      }
    }
  }

  return (
    <Grid item xs={12}>
      <Box className={classes.container}>
        <ButtonBase onClick={handleTarget}>
          <Typography className={classes.textLine} component="div">
            {actionTitle.prefix}
            <Typography className={classes.targetText} color="primary">
              {target}
            </Typography>
            {actionTitle.suffix}
          </Typography>
        </ButtonBase>
        <Box className={classes.secondContainer}>
          <Typography className={classes.date}>{time}</Typography>
        </Box>
      </Box>
    </Grid>
  )
}

export default ActivityItem

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.black,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  textLine: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'start',
    wordBreak: 'break-all',
  },
  targetText: {
    textDecoration: 'underline',
    // textAlign: 'start',
    // flexWrap: 'wrap',
    // wordWrap: 'break-word',
  },
  date: {
    whiteSpace: 'nowrap',
    fontSize: 12,
    color: Colors.white_opacity[30],
  },
  secondContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
}))

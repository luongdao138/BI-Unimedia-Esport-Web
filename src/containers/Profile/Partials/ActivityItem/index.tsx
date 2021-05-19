import { Typography, Box, makeStyles, Grid, ButtonBase } from '@material-ui/core'
import ESChip from '@components/Chip'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ACTIVITY_ACTION_TYPE } from '@constants/common.constants'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

interface Props {
  activity: any
}

const useStyles = makeStyles(() => ({
  targetText: {
    textDecoration: 'underline',
  },
  chip: {
    maxWidth: '100%',
    backgroundColor: Colors.black,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnContainer: {
    width: '100%',
  },
}))

const ActivityItem: React.FC<Props> = ({ activity }) => {
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = activity.attributes
  const target = data.target_name != undefined ? data.target_name : null
  const targetId = data.target_id

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
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.TOPIC_COMMENT:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.COMMUNITY_CREATE:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.COMMUNITY_JOIN:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.USER_FOLLOWS:
          router.push(`${ESRoutes.PROFILE}/${data.user_code}`)
          break
        case ACTIVITY_ACTION_TYPE.RECRUITMENT_CREATE:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.RECRUITMENT_JOIN:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.TOURNAMENT_CREATE:
          // TODO: target detail
          break
        case ACTIVITY_ACTION_TYPE.TOURNAMENT_JOIN:
          // TODO: target detail
          break
        default:
          break
      }
    }
  }

  return (
    <Grid item xs={12}>
      <Box my={1} py={1}>
        <ButtonBase className={classes.btnContainer} onClick={handleTarget}>
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
        </ButtonBase>
      </Box>
    </Grid>
  )
}

export default ActivityItem

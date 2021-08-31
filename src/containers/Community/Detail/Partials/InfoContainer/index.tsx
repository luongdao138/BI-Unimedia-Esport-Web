import ESChip from '@components/Chip'
import { Box, Theme, Typography, ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
import ESAvatar from '@components/Avatar'
import _ from 'lodash'
import { CommunityDetail } from '@services/community.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { OPEN_RANGE, JOIN_CONDITION } from '@constants/community.constants'

const InfoContainer: React.FC<{ data: CommunityDetail['attributes'] }> = ({ data }) => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const toProfile = (user_code) => router.push(`${ESRoutes.PROFILE}/${user_code}`)
  return (
    <>
      {(!_.isEmpty(data.game_titles) || !_.isEmpty(data.features)) && (
        <Box marginTop={2}>
          {!_.isEmpty(data.game_titles) && (
            <Box mr={1} display="inline">
              {data.game_titles.map((game) => {
                return <ESChip key={game.id} className={classes.chip} label={game.display_name} />
              })}
            </Box>
          )}
          {!_.isEmpty(data.features) &&
            data.features.map((item) => {
              return <ESChip key={item.id} className={classes.chip} label={item.feature} />
            })}
        </Box>
      )}
      <Box marginTop={2}>
        <Typography>{data.description}</Typography>
      </Box>

      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={3}>
        <Box className={classes.label}>
          <Typography>{t('common:community.area')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>{data.area_name}</Typography>
        </Box>
      </Box>

      {/* disclosure range */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.disclosure_range')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>
            {Number(data.open_range) == OPEN_RANGE.SEARCHABLE ? t('common:community_create.public') : t('common:community_create.private')}
          </Typography>
        </Box>
      </Box>

      {/* approval method */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.approval_method')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Typography>
            {Number(data.join_condition) == JOIN_CONDITION.MANUAL
              ? t('common:community_create.approval_manual')
              : t('common:community_create.approval_automatic')}
          </Typography>
        </Box>
      </Box>

      {/* caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.caretaker')}</Typography>
        </Box>
        <Box className={classes.value} flexDirection="column">
          {data.admin && (
            <Box display="flex" flexDirection="row" alignItems="center">
              <LoginRequired>
                <ButtonBase onClick={() => toProfile(data.admin.user_code)}>
                  <ESAvatar alt={data.admin.nickname} src={data.admin.avatar_image_url} />
                </ButtonBase>
                <Typography className={classes.breakWord}>{data.admin.nickname}</Typography>
              </LoginRequired>
            </Box>
          )}
        </Box>
      </Box>

      {/* //TODO when co organizer added to backend */}
      {/* deputy caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
        <Box className={classes.label}>
          <Typography>{t('common:community.deputy_caretaker')}</Typography>
        </Box>
        <Box className={classes.value} flexDirection="column">
          {data.co_organizers ? (
            data.co_organizers.map((organizer, i) => (
              <Box key={i} display="flex" flexDirection="row" alignItems="center" mt={0}>
                <LoginRequired>
                  <ButtonBase onClick={() => toProfile(organizer.user_code)}>
                    <ESAvatar alt={organizer.nickname} src={organizer.avatar_image_url} />
                  </ButtonBase>
                  <Typography className={classes.breakWord}>{organizer.nickname}</Typography>
                </LoginRequired>
              </Box>
            ))
          ) : (
            <Typography>-</Typography>
          )}
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    display: 'flex',
    flex: 2,
  },
  value: {
    display: 'flex',
    flex: 8,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
  },
  breakWord: {
    wordBreak: 'break-word',
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    label: {
      flex: 3.5,
    },
    value: {
      flex: 6.5,
    },
  },
}))

export default InfoContainer

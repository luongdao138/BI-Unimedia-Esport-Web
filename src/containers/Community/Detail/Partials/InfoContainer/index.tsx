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
import Linkify from 'react-linkify'
import { Colors } from '@theme/colors'

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
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
              {decoratedText}
            </a>
          )}
        >
          <Typography>{data.description}</Typography>
        </Linkify>
      </Box>

      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={3}>
        <Box className={classes.label}>
          <Typography>{t('common:community.area')}</Typography>
        </Box>
        <Box className={classes.value}>
          <Box display="flex" flexDirection="column">
            <Typography>{data.area_name}</Typography>
            <Typography>{data.address ? data.address : t('common:common.dash_separator')}</Typography>
          </Box>
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
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1} width="100%">
        <Box className={classes.userLabel}>
          <Typography>{t('common:community.caretaker')}</Typography>
        </Box>
        <Box className={classes.userValue}>
          {data.admin && (
            <Box display="flex" flexDirection="row" alignItems="center">
              <LoginRequired>
                <ButtonBase onClick={() => toProfile(data.admin.user_code)}>
                  <ESAvatar alt={data.admin.nickname} src={data.admin.avatar_image_url} />
                </ButtonBase>

                <Typography className={classes.ellipsis}>{data.admin.nickname}</Typography>
              </LoginRequired>
            </Box>
          )}
        </Box>
      </Box>

      {/* deputy caretaker */}
      <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1} width="100%">
        <Box className={classes.userLabel}>
          <Typography>{t('common:community.deputy_caretaker')}</Typography>
        </Box>
        <Box className={classes.userValue}>
          {!_.isEmpty(data.co_organizers) ? (
            data.co_organizers.map((organizer, i) => (
              <Box key={i} display="flex" flexDirection="row" alignItems="center" mt={0}>
                <LoginRequired>
                  <ButtonBase onClick={() => toProfile(organizer.user_code)}>
                    <ESAvatar alt={organizer.nickname} src={organizer.avatar_image_url} />
                  </ButtonBase>

                  <Typography className={classes.ellipsis}>{organizer.nickname}</Typography>
                </LoginRequired>
              </Box>
            ))
          ) : (
            <Typography>{t('common:common.dash_separator')}</Typography>
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
  linkify: {
    color: Colors.white,
    textDecoration: 'underline',
    wordBreak: 'break-all',
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
  userLabel: {
    display: 'flex',
    width: '20%',
  },
  userValue: {
    display: 'flex',
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
    flexDirection: 'column',
    width: '80%',
  },
  breakWord: {
    wordBreak: 'break-word',
    marginLeft: theme.spacing(1),
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing(1),
  },

  [theme.breakpoints.down('xs')]: {
    label: {
      flex: 3.5,
    },
    value: {
      flex: 6.5,
    },
    userLabel: {
      display: 'flex',
      width: '35%',
    },
    userValue: {
      display: 'flex',
      wordBreak: 'break-word',
      whiteSpace: 'pre-wrap',
      width: '65%',
    },
  },
}))

export default InfoContainer

import { ReactNode, useState } from 'react'
import { Grid, Box, makeStyles, Typography, Theme, Icon, ButtonBase } from '@material-ui/core'
import ESChip from '@components/Chip'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { LobbyDetail } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import useLobbyHelper from '@containers/lobby/hooks/useLobbyHelper'
import ESReport from '@containers/Report'
import { REPORT_TYPE } from '@constants/common.constants'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import LoginRequired from '@containers/LoginRequired'
import * as commonActions from '@store/common/actions'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import Linkify from 'react-linkify'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import _ from 'lodash'

interface Props {
  detail: LobbyDetail
  extended?: boolean
  toEdit?: () => void
  bottomButton?: ReactNode
}

const DetailInfo: React.FC<Props> = ({ detail, extended, toEdit, bottomButton }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const data = detail.attributes
  const game = data.game_title?.data ? data.game_title.data.attributes.display_name : ''
  const tag = data.game_title?.data ? data.game_title.data.attributes.display_name : ''
  const hardware = data.game_hardware?.data ? data.game_hardware.data.attributes.name : ''
  const [openReport, setOpenReport] = useState(false)
  const helper = useLobbyHelper(detail)
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const handleCopy = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.toString())
    }
    dispatch(commonActions.addToast(t('common:arena.copy_toast')))
  }

  const toProfile = (user_code) => router.push(`${ESRoutes.PROFILE}/${user_code}`)

  const handleReportOpen = () => setOpenReport(true)

  return (
    <Grid container className={classes.container}>
      <Box color={Colors.grey[300]} display="flex" flex="1" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box pt={1} color={Colors.white}>
            <Typography className={classes.title} variant="h3">
              {data.title}
            </Typography>
          </Box>
          {extended && (
            <Box ml={1} display="flex" flexDirection="row" flexShrink={0}>
              {helper.isEditable && toEdit && (
                <LoginRequired>
                  <ButtonPrimary style={{ padding: '12px 8px' }} size="small" gradient={false} onClick={toEdit}>
                    {t('common:arena.edit_arena_info')}
                  </ButtonPrimary>
                </LoginRequired>
              )}
              <ESMenu>
                <LoginRequired>
                  <ESMenuItem onClick={handleReportOpen}>{t('common:tournament.report')}</ESMenuItem>
                </LoginRequired>
              </ESMenu>
            </Box>
          )}
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>{`${t('common:tournament.tournament_id')}${detail.id}`}</Typography>
          {extended && (
            <>
              <Box display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography>{t('common:tournament.copy_shared_url')}</Typography>
              </Box>
              {/* <ButtonBase href="#" target="_blank">
                <img className={classes.twitter_logo} src="/images/twitter_logo.png" />
              </ButtonBase> */}
            </>
          )}
        </Box>

        <Box marginTop={2}>
          <ESChip className={classes.gameChip} label={game} />
        </Box>

        <Box marginTop={2}>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                {decoratedText}
              </a>
            )}
          >
            <Typography className={classes.multiline}>{data.overview}</Typography>
          </Linkify>
        </Box>

        {/* entry period */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={extended ? 2 : 3}>
          <Box className={classes.label}>
            <Typography>{t('common:tournament.entry_period')}</Typography>
          </Box>
          <Box className={classes.value}>
            <Typography>
              {TournamentHelper.formatDate(data.acceptance_start_date)} ~ {TournamentHelper.formatDate(data.acceptance_end_date)}
            </Typography>
          </Box>
        </Box>

        {/* holding period */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
          <Box className={classes.label}>
            <Typography>{t('common:recruitment.date_time')}</Typography>
          </Box>
          <Box className={classes.value}>
            <Typography>{TournamentHelper.formatDate(data.start_date)}</Typography>
          </Box>
        </Box>
        {extended && (
          <>
            {/* venue */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:tournament.venue')}</Typography>
              </Box>
              <Box className={classes.value} flexDirection="column">
                <Typography>{data.area_name ? data.area_name : '-'}</Typography>
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                      {decoratedText}
                    </a>
                  )}
                >
                  <Typography>{data.address}</Typography>
                </Linkify>
              </Box>
            </Box>

            {/* organizer */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:tournament.admin_organizer')}</Typography>
              </Box>
              <Box className={classes.value}>
                {data.owner && (
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <LoginRequired>
                      <ButtonBase onClick={() => toProfile(data.owner.data.attributes.user_code)}>
                        <ESAvatar alt={data.owner.data.attributes.nickname} src={data.owner.data.attributes.avatar} />
                      </ButtonBase>
                    </LoginRequired>
                    <Typography className={classes.breakWord}>{data.owner.data.attributes.nickname}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* organizer name */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:lobby_create.organizer_name')}</Typography>
              </Box>
              <Box className={classes.value}>
                <Typography>{_.isEmpty(data.organizer_name) ? '-' : data.organizer_name}</Typography>
              </Box>
            </Box>

            {/* game */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:tournament.game')}</Typography>
              </Box>
              <Box className={classes.value}>
                <Typography>{game}</Typography>
              </Box>
            </Box>

            {/* hardware  */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:tournament.game_hardware')}</Typography>
              </Box>
              <Box className={classes.value}>
                {/* TODO: array bolj bgaa yum shig bna */}
                <Typography>{hardware}</Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Category tag */}
        <Box marginTop={2}>
          <ESChip className={classes.tagChip} label={tag} />
          <ESChip className={classes.tagChip} label={tag} />
          <ESChip className={classes.tagChip} label={tag} />
        </Box>

        {!extended && (
          <Box display="flex" flexDirection="row" flexWrap="wrap" marginTop={2}>
            <Box mt={1} mr={1}>
              <ESChip label={data.area_name == t('common:tournament.online') ? data.area_name : t('common:tournament.offline')} />
            </Box>
            <Box mt={1} mr={1}>
              <ESChip label={TournamentHelper.participantTypeText(data.participant_type)} />
            </Box>
            <Box mt={1} mr={1}>
              <ESChip label={TournamentHelper.ruleText(data.rule)} />
            </Box>
            {!!data.has_prize && (
              <Box mt={1} mr={1}>
                <ESChip label={t('common:tournament.has_prize_true')} />
              </Box>
            )}
            <Box mt={1}>
              <ESChip label={hardware} />
            </Box>
          </Box>
        )}
        {!bottomButton ? null : (
          <Box textAlign="center" mt={2}>
            {bottomButton}
          </Box>
        )}
      </Box>
      {isAuthenticated && (
        <ESReport
          reportType={REPORT_TYPE.TOURNAMENT}
          target_id={Number(detail.id)}
          data={detail}
          open={openReport}
          handleClose={() => setOpenReport(false)}
        />
      )}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  twitter_logo: {
    height: 23,
    width: '100%',
    paddingLeft: 12,
  },
  multiline: {
    whiteSpace: 'pre-wrap',
  },
  linkify: {
    color: Colors.white,
    textDecoration: 'underline',
  },
  container: {
    padding: 24,
  },
  gameChip: {
    maxWidth: '85vw',
    minWidth: 177,
    justifyContent: 'flex-start',
  },
  tagChip: {
    maxWidth: '85vw',
    minWidth: 'fit-content',
    justifyContent: 'flex-start',
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  title: {
    wordBreak: 'break-word',
  },
  breakWord: {
    wordBreak: 'break-word',
    marginLeft: theme.spacing(1),
  },
  urlCopy: {
    marginLeft: 20,
    cursor: 'pointer',
    color: '#EB5686',
  },
  link: {
    marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  [theme.breakpoints.down('md')]: {
    label: {
      flex: 3,
    },
  },
  [theme.breakpoints.down('sm')]: {
    label: {
      flex: 5,
    },
  },
}))

DetailInfo.defaultProps = {
  extended: false,
}

export default DetailInfo

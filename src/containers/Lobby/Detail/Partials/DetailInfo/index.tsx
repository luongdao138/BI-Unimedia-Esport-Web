import { useState } from 'react'
import { Grid, Box, makeStyles, Typography, Theme, Icon, ButtonBase } from '@material-ui/core'
import ESChip from '@components/Chip'
import { Colors } from '@theme/colors'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import { LobbyHelper } from '@utils/helpers/LobbyHelper'
import { LobbyDetail } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import useLobbyHelper from '@containers/Lobby/hooks/useLobbyHelper'
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
import ESTwitterShareButton from '@components/TwitterShareButton'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface Props {
  detail: LobbyDetail
  extended?: boolean
  toEdit?: () => void
}

const DetailInfo: React.FC<Props> = ({ detail, extended, toEdit }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const data = detail.attributes
  const gameChip = _.get(data, 'game_title.data.attributes.display_name', '')
  const game = _.get(data, 'game_title.data.attributes.display_name', t('common:common.dash'))
  const hardware = _.get(data, 'game_hardware.data.attributes.name', t('common:common.dash'))
  const [openReport, setOpenReport] = useState(false)
  const helper = useLobbyHelper(detail)
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const handleCopy = () => {
    if (window.navigator.clipboard) {
      window.navigator.clipboard.writeText(window.location.toString())
    }
    dispatch(commonActions.addToast(t('common:lobby.copy_toast')))
  }

  const toProfile = (user_code) => {
    CommonHelper.checkUserCode(user_code, () => {
      router.push(`${ESRoutes.PROFILE}/${user_code}`)
    })
  }

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
                  <ButtonPrimary className={classes.editButton} size="small" gradient={false} onClick={toEdit}>
                    {t('common:lobby.edit_button')}
                  </ButtonPrimary>
                </LoginRequired>
              )}
              <ESMenu>
                <LoginRequired>
                  <ESMenuItem onClick={handleReportOpen}>{t('common:lobby.report')}</ESMenuItem>
                </LoginRequired>
              </ESMenu>
            </Box>
          )}
        </Box>
        <Box className={classes.labelUrlShareContainer}>
          <Typography>{`${t('common:lobby.detail.label_id')}${detail.id}`}</Typography>
          {extended && (
            <>
              <Box display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
                <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
                <Typography>{t('common:lobby.copy_shared_url')}</Typography>
              </Box>
              <ESTwitterShareButton
                title={detail.attributes.title}
                utm={`utm_source=twitter&utm_medium=social&utm_campaign=lobby&utm_content=${detail.id}`}
                url={window.location.toString()}
                games={data.game_title}
              />
            </>
          )}
        </Box>
        {!_.isEmpty(gameChip) ? (
          <Box marginTop={2}>
            <ESChip className={classes.gameChip} label={gameChip} />
          </Box>
        ) : null}

        <Box marginTop={2}>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key} className={classes.linkify}>
                {decoratedText}
              </a>
            )}
          >
            <Typography className={classes.multiline}>{data.message}</Typography>
          </Linkify>
        </Box>

        {/* entry period */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={extended ? 2 : 3}>
          <Box className={classes.label}>
            <Typography>{t('common:lobby.detail.entry_period')}</Typography>
          </Box>
          <Box className={classes.value}>
            {data.entry_start_datetime && data.entry_end_datetime ? (
              <Typography>
                {LobbyHelper.formatDate(data.entry_start_datetime)} ~ {LobbyHelper.formatDate(data.entry_end_datetime)}
              </Typography>
            ) : (
              <Typography>{t('common:common.dash')}</Typography>
            )}
          </Box>
        </Box>

        {/* holding period */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
          <Box className={classes.label}>
            <Typography>{t('common:lobby.detail.start_date')}</Typography>
          </Box>
          <Box className={classes.value}>
            {data.start_datetime ? (
              <Typography>{LobbyHelper.formatDate(data.start_datetime)}</Typography>
            ) : (
              <Typography>{t('common:common.dash')}</Typography>
            )}
          </Box>
        </Box>
        {extended && (
          <>
            {/* venue */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:lobby.venue')}</Typography>
              </Box>
              <Box className={classes.value} flexDirection="column">
                <Typography>{data.area_name ? data.area_name : t('common:common.dash')}</Typography>
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
                <Typography>{t('common:lobby.detail.organizer')}</Typography>
              </Box>
              <Box className={classes.value}>
                {data.organizer && (
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <LoginRequired>
                      <ButtonBase onClick={() => toProfile(data.organizer.user_code)}>
                        <ESAvatar alt={data.organizer.nickname} src={data.organizer_avatar} size={35} />
                      </ButtonBase>
                    </LoginRequired>
                    <Typography className={classes.breakWord}>{data.organizer.nickname}</Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* game */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:lobby.game')}</Typography>
              </Box>
              <Box className={classes.value}>
                <Typography>{game}</Typography>
              </Box>
            </Box>

            {/* hardware  */}
            <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
              <Box className={classes.label}>
                <Typography>{t('common:lobby.game_hardware')}</Typography>
              </Box>
              <Box className={classes.value}>
                <Typography>{hardware}</Typography>
              </Box>
            </Box>
          </>
        )}

        {/* Category tag */}
        <Box marginTop={2}>
          {(data.categories || []).map((category, key) => (
            <ESChip className={classes.tagChip} label={category.name} key={key} />
          ))}
        </Box>
      </Box>
      {isAuthenticated && (
        <ESReport
          reportType={REPORT_TYPE.LOBBY}
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
  editButton: {
    padding: '12px 8px',
    '&.MuiButtonBase-root.button-primary:active': {
      background: 'transparent',
    },
    '&.MuiButtonBase-root.button-primary:focus': {
      background: 'transparent',
    },
  },
  labelUrlShareContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  multiline: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  linkify: {
    color: Colors.white,
    textDecoration: 'underline',
  },
  container: {
    padding: 24,
  },
  gameChip: {
    maxWidth: 'auto',
    minWidth: 'auto',
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
    labelUrlShareContainer: {
      marginTop: theme.spacing(2),
    },
  },
}))

DetailInfo.defaultProps = {
  extended: false,
}

export default DetailInfo

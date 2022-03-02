import { TournamentStatus } from '@services/arena.service'
import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { ReactNode, useEffect, useState } from 'react'
import Tabs from '@components/Tabs'
import Tab from '@components/Tab'
import GoogleAd from '@components/GoogleAd'

type TournamentHeaderProps = {
  title: string
  status: TournamentStatus
  cover: string | null
  children?: ReactNode
  onHandleBack: () => void
  showTab?: boolean
}
const TournamentHeader: React.FC<TournamentHeaderProps> = ({ title, status, children, cover, onHandleBack, showTab = true }) => {
  const _theme = useTheme()
  const { t } = useTranslation(['common'])
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const classes = useStyles()
  const [tab, setTab] = useState(4)
  useEffect(() => {
    switch (status) {
      case 'ready':
        setTab(0)
        break
      case 'recruiting':
        setTab(1)
        break
      case 'recruitment_closed':
      case 'ready_to_start':
        setTab(2)
        break
      case 'in_progress':
        setTab(3)
        break
      case 'completed':
        setTab(4)
        break
      default:
        setTab(5)
    }
  }, [status])
  return (
    <>
      {/* GADS: detail arena/**** */}
      <GoogleAd id={{ idPatten1: 'ad_arena_d' }} />
      <Box>
        <Box className={classes.backContainer}>
          <IconButton onClick={onHandleBack} className={classes.iconButtonBg2}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <div style={{ overflow: 'hidden' }}>
            {!isMobile && (
              <Typography variant="h2" className={classes.wrapOne}>
                {title}
              </Typography>
            )}
          </div>
        </Box>
        <Box
          style={{
            background: `url(${cover})`,
            paddingTop: '30.21756647864625%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
          className={classes.coverWrapper}
        ></Box>
        <div className={classes.root}>
          {showTab && (
            <Tabs
              value={tab}
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onChange={() => {}}
              classes={{ indicator: classes.tabIndicator, flexContainer: classes.flexContainer, fixed: classes.tabsFixed }}
            >
              <Tab label={t('common:arena.status.ready')} icon={<Icon className="fa fa-desktop" />} classes={{ root: classes.tabRoot }} />
              <Tab
                label={t('common:arena.status.recruiting')}
                icon={<Icon className="fa fa-door-open" />}
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label={t('common:arena.status.recruitment_closed')}
                icon={<Icon className="fa fa-hourglass-start" />}
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label={t('common:arena.status.in_progress')}
                icon={<Icon className="fa fa-headset" />}
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label={t('common:arena.status.completed')}
                icon={<Icon className="fa fa-trophy" />}
                classes={{ root: classes.tabRoot }}
              />
              <Tab style={{ display: 'none' }} />
            </Tabs>
          )}
          <Box>{children}</Box>
        </div>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: theme.spacing(0.5),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: Colors.black,
  },
  coverWrapper: {
    marginBottom: theme.spacing(3),
  },
  tabIndicator: {
    visibility: 'hidden',
  },
  tabRoot: {
    cursor: 'initial',
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 'fit-content',
  },
  tabsFixed: {
    display: 'flex',
    justifyContent: 'center',
  },
  backContainer: {
    position: 'fixed',
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.black,
    opacity: 0.7,
    zIndex: 100,
    maxWidth: 840,
  },
  iconButtonBg2: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.up('md')]: {
    flexContainer: {
      justifyContent: 'space-around',
      maxWidth: theme.spacing(50),
      minWidth: theme.spacing(50),
    },
  },
  [theme.breakpoints.down('lg')]: {
    flexContainer: {
      justifyContent: 'space-around',
      maxWidth: theme.spacing(50),
      minWidth: theme.spacing(35),
    },
  },
  [theme.breakpoints.down('sm')]: {
    tabWrapper: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    backContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    coverWrapper: {
      marginBottom: theme.spacing(2),
    },
    backContainer: {
      paddingLeft: theme.spacing(1.5),
    },
  },
  ['@media (max-width: 960px)']: {
    backContainer: {
      maxWidth: 'none',
    },
  },
}))

export default TournamentHeader

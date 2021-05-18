import { TournamentStatus } from '@services/tournament.service'
import { Box, Icon, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ArrowBack'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactNode, useEffect, useState } from 'react'
import Tabs from '@components/Tabs'
import Tab from '@components/Tab'

type TournamentHeaderProps = {
  status: TournamentStatus
  cover: string | null
  children?: ReactNode
  onHandleBack: () => void
}
const TournamentHeader: React.FC<TournamentHeaderProps> = ({ status, children, cover, onHandleBack }) => {
  const classes = useStyles()
  const [tab, setTab] = useState(4)
  useEffect(() => {
    switch (status) {
      case 'recruiting':
        setTab(0)
        break
      case 'ready_to_start':
        setTab(1)
        break
      case 'in_progress':
        setTab(2)
        break
      case 'completed':
        setTab(3)
        break
      default:
        setTab(4)
    }
  }, [status])
  return (
    <>
      <Box
        style={{
          background: `url(${cover})`,
          height: 188,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        mb={3}
      >
        <IconButton onClick={onHandleBack} className={classes.backButton}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Box className={classes.root}>
        <Tabs
          value={tab}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          classes={{ indicator: classes.tabIndicator, flexContainer: classes.flexContainer, fixed: classes.tabsFixed }}
        >
          <Tab label="エントリー" icon={<Icon className="fa fa-door-open" />} classes={{ root: classes.tabRoot }} />
          <Tab label="開催前" icon={<Icon className="fa fa-hourglass-start" />} classes={{ root: classes.tabRoot }} />
          <Tab label="開催中" icon={<Icon className="fa fa-headset" />} classes={{ root: classes.tabRoot }} />
          <Tab label="大会終了" icon={<Icon className="fa fa-trophy" />} classes={{ root: classes.tabRoot }} />
          <Tab style={{ display: 'none' }} />
        </Tabs>
        <Box>{children}</Box>
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
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
  },
  tabIndicator: {
    visibility: 'hidden',
  },
  tabRoot: {
    minWidth: theme.spacing(10),
    cursor: 'initial',
  },
  tabsFixed: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexContainer: {
    justifyContent: 'space-around',
    maxWidth: theme.spacing(60),
  },
  backButton: { backgroundColor: `${Colors.grey['200']}80`, margin: 24, marginTop: 16, padding: 6 },
}))

export default TournamentHeader

import { createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, Typography } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import { Colors } from '@theme/colors'

const ArenaResultContext = createContext<TournamentRule | undefined>(undefined)
ArenaResultContext.displayName = 'ArenaResultContext'

const ResultList: React.FC<{ rule: TournamentRule; children: ReactNode }> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <ArenaResultContext.Provider value={props.rule}>
      <div className={classes.listHeader}>
        <Typography className={classes.headerTitle}>{t('arena.listHeaders.place')}</Typography>
        <Typography className={classes.headerTitle}>{t('arena.listHeaders.player')}</Typography>
        <Typography className={classes.headerTitle}>
          {props.rule === 'score_attack' ? t('arena.listHeaders.score') : props.rule === 'time_attack' ? t('arena.listHeaders.time') : ''}
        </Typography>
      </div>
      <div className={classes.listWrapper}>{props.children}</div>
    </ArenaResultContext.Provider>
  )
}

export const useArenaResult = () => {
  const context = useContext(ArenaResultContext)
  if (!context) throw new Error('useArenaResult must be within ResultList')
  return context
}

export default ResultList

const useStyles = makeStyles((theme) => ({
  listWrapper: {
    borderRadius: theme.spacing(0.5),
    border: `1px solid ${Colors.white_opacity['30']}`,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    background: Colors.black_opacity['70'],
    position: 'sticky',
    zIndex: 1,
  },
  listHeader: {
    background: theme.palette.common.black,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    position: 'relative',
  },
  headerTitle: {
    display: 'inline-block',
    '&:first-child': {
      paddingLeft: theme.spacing(5),
    },
    '&:nth-child(2)': {
      paddingLeft: theme.spacing(10),
    },
    '&:last-child': {
      position: 'absolute',
      right: theme.spacing(8),
      top: '50%',

      transform: 'translateY(-50%)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    headerTitle: {
      display: 'inline-block',
      '&:first-child': {
        paddingLeft: theme.spacing(3),
      },
      '&:nth-child(2)': {
        paddingLeft: theme.spacing(10),
      },
    },
    listWrapper: {
      paddingRight: theme.spacing(1),
    },
  },
  [theme.breakpoints.down('xs')]: {
    headerTitle: {
      '&:last-child': {
        right: 20,
      },
      '&:nth-child(2)': {
        paddingLeft: theme.spacing(4.5),
      },
    },
  },
}))

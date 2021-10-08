import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, BoxProps } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

export interface BRListProps extends BoxProps {
  children?: ReactNode
  className?: string
  rule?: TournamentRule
}
const BRList: React.FC<BRListProps> = ({ children, rule, ...props }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <Box {...props}>
      <div className={classes.listHeader}>
        <Typography className={classes.headerTitle}>{t('common:arena.listHeaders.player')}</Typography>
        <Typography className={classes.headerTitle}>
          {rule === 'score_attack'
            ? t('common:arena.listHeaders.score')
            : rule === 'time_attack'
            ? t('common:arena.listHeaders.time')
            : rule === 'battle_royale'
            ? t('common:arena.listHeaders.place')
            : ''}
        </Typography>
      </div>
      {children}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.common.black,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerText: {
    display: 'inline-block',
    color: theme.palette.common.white,
    '&:first-child': {
      paddingLeft: 50,
    },
    '&:last-child': {
      paddingRight: 92,
    },
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
      paddingLeft: 54,
    },
    '&:nth-child(2)': {
      paddingLeft: theme.spacing(9),
    },
    '&:last-child': {
      position: 'absolute',
      right: theme.spacing(10),
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  [theme.breakpoints.down('xs')]: {
    headerText: {
      '&:first-child': {
        paddingLeft: 24,
      },
    },
    headerTitle: {
      '&:first-child': {
        paddingLeft: 32,
      },
      '&:last-child': {
        position: 'absolute',
        right: theme.spacing(6),
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
  },
}))

export default BRList

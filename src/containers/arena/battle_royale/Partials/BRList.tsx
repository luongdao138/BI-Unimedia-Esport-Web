import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { TournamentRule } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

export interface BRListProps {
  children?: ReactNode
  className?: string
  rule?: TournamentRule
}
function BRList({ children, className, rule }: BRListProps) {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <div className={className || ''}>
      <div className={classes.listHeader}>
        <Typography className={classes.headerTitle}>プレイヤー</Typography>
        <Typography className={classes.headerTitle}>{t('common:arena.rules.battle_royale_rule', { rule: rule })}</Typography>
      </div>
      {children}
    </div>
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
  [theme.breakpoints.down('xs')]: {
    headerText: {
      '&:first-child': {
        paddingLeft: 24,
      },
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
      paddingLeft: theme.spacing(5),
    },
    '&:nth-child(2)': {
      paddingLeft: theme.spacing(9),
    },
    '&:last-child': {
      position: 'absolute',
      right: theme.spacing(8),
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
}))

export default BRList

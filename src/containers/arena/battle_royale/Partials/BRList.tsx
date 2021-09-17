import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'

export interface BRListProps {
  children?: ReactNode
  headers?: string[]
  className?: string
}
function BRList({ children, headers, className }: BRListProps) {
  const classes = useStyles()
  return (
    <div className={className || ''}>
      <div className={classes.header}>
        {headers.map((header, idx) => (
          <Typography key={idx} className={classes.headerText}>
            {header}
          </Typography>
        ))}
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
}))

export default BRList

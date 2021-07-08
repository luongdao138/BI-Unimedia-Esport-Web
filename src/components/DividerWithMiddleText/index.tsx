import { makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'

type Props = {
  text: string
  marginSpace?: string
}

const DividerWithMiddleText: React.FC<Props> = ({ text, marginSpace }) => {
  const classes = useStyles({ marginSpace })

  return <div className={classes.root}>{text}</div>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    '&:before, &:after': {
      content: "''",
      flex: 1,
      borderTop: `1px solid ${Colors.white}30`,
    },
    '&:before': {
      marginRight: 13,
    },
    '&:after': {
      marginLeft: 13,
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      marginLeft: '-24px',
      marginRight: '-24px',
    },
  },
}))

export default DividerWithMiddleText

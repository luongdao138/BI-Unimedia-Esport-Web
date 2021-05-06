import { makeStyles } from '@material-ui/core'

type Props = {
  text: string
  marginSpace?: string
}

const DividerWithMiddleText: React.FC<Props> = ({ text, marginSpace }) => {
  const classes = useStyles({ marginSpace })

  return <div className={classes.root}>{text}</div>
}

const useStyles = makeStyles(() => ({
  root: (props: { marginSpace?: string }) => ({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',

    '&:before, &:after': {
      content: "''",
      flex: 1,
      border: '1px solid #FFFFFF30',
    },
    '&:before': {
      marginRight: props.marginSpace || 13,
    },
    '&:after': {
      marginLeft: props.marginSpace || 13,
    },
  }),
}))

export default DividerWithMiddleText

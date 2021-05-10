import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

export const Footer: React.FC = () => {
  const classes = useStyles()
  return <div className={classes.footer}>© 2021 NTTe-Sports</div>
}

const useStyles = makeStyles(() => ({
  footer: {
    width: '100%',
    padding: 24,
    borderTop: `1px solid  ${Colors.text[300]}`,
    textAlign: 'center',
  },
}))

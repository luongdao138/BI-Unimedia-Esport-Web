import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

interface FooterProps {
  dark?: boolean
}

export const Footer: React.FC<FooterProps> = ({ dark }) => {
  const classes = useStyles()
  return <div className={dark ? classes.footerDark : classes.footer}>© 2021 NTTe-Sports</div>
}

const useStyles = makeStyles(() => ({
  footer: {
    width: '100%',
    padding: 24,
    borderTop: `1px solid  ${Colors.text[300]}`,
    textAlign: 'center',
    display: 'flex',
  },
  footerDark: {
    width: '100%',
    padding: 24,
    borderTop: `1px solid  ${Colors.text[300]}`,
    textAlign: 'center',
    background: '#060606',
    position: 'relative',
  },
}))

Footer.defaultProps = {
  dark: false,
}

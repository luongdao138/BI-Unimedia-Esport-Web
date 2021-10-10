import { Typography, TypographyProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const ESTypography: React.FC<TypographyProps> = (props) => {
  const classes = useStyles()
  return <Typography classes={{ root: classes.root }} {...props} />
}

export default ESTypography

const useStyles = makeStyles(() => ({
  root: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
}))

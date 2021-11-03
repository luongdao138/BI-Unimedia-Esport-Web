import { Box, Icon, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

export interface HeaderWithButtonProps {
  title?: string
  onClickBack?: () => void
}

const HeaderWithButtonStream: React.FC<HeaderWithButtonProps> = ({ title, onClickBack }) => {
  const classes = useStyles()
  return (
    <Box className={classes.header}>
      <IconButton className={classes.iconButton} disableRipple onClick={onClickBack}>
        <Icon className={`fa fa-arrow-left ${classes.icon}`} />
      </IconButton>
      <Typography variant="body1" className={classes.headerTitle}>
        {title}
      </Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    display: 'inline-block',
  },
  create: {
    marginLeft: 'auto',
  },
  wrap: {
    height: 'calc(100vh - 60px)',
    overflow: 'auto',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
  header: {
    padding: 16,
    width: '100%',
    position: 'sticky',
    background: Colors.black,
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    height: 60,
    borderBottom: '1px solid #212121',
  },
}))

export default HeaderWithButtonStream

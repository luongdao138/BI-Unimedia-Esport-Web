import { Box, Icon, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'

export interface HeaderWithButtonProps {
  title?: string
  withBackButton?: boolean
}

const HeaderWithButton: React.FC<HeaderWithButtonProps> = ({ title, withBackButton }) => {
  const classes = useStyles()
  const router = useRouter()
  return (
    <Box className={classes.header}>
      {withBackButton ? (
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
      ) : (
        <></>
      )}
      <Typography variant="body1" className={classes.headerTitle}>
        {title}
      </Typography>
    </Box>
  )
}

HeaderWithButton.defaultProps = {
  withBackButton: true,
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
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
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

export default HeaderWithButton

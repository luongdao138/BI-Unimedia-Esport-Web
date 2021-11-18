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
    <Box
      display="flex"
      flexDirection="row"
      position="sticky"
      alignItems="center"
      justifyContent="flex-start"
      p={2}
      paddingX={3}
      borderBottom="1px solid #212121"
      bgcolor="#000"
      minHeight={60}
    >
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
}))

export default HeaderWithButton

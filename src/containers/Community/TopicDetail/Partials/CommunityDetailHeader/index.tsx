import { Box, Icon, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

type CommunityHeaderProps = {
  title: string
  isTopic?: boolean
  onHandleBack: () => void
}
const CommunityHeader: React.FC<CommunityHeaderProps> = ({ title, isTopic, onHandleBack }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.backContainer} position={isTopic ? '' : 'fixed'} mb={isTopic && 3}>
        <IconButton onClick={onHandleBack} className={classes.iconButtonBg2}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" className={classes.wrapOne}>
          {title}
        </Typography>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  backContainer: {
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    padding: `${theme.spacing(2)}px 0`,
    backgroundColor: Colors.black,
    opacity: 0.7,
    zIndex: 100,
    maxWidth: 840,
  },
  iconButtonBg2: {
    backgroundColor: Colors.grey[200],
    '&:focus': {
      backgroundColor: Colors.grey[200],
    },
    marginRight: 20,
  },
  wrapOne: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  ['@media (max-width: 960px)']: {
    backContainer: {
      maxWidth: 'none',
    },
  },
}))

export default CommunityHeader

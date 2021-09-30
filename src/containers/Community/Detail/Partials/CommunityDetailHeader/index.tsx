import { Box, Icon, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

type CommunityDetailHeaderProps = {
  title: string
  cover: string | null
  onHandleBack: () => void
}

const CommunityDetailHeader: React.FC<CommunityDetailHeaderProps> = ({ title, cover, onHandleBack }) => {
  const classes = useStyles()

  return (
    <>
      <Box className={classes.backContainer}>
        <IconButton onClick={onHandleBack} className={classes.iconButtonBg2}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <div style={{ overflow: 'hidden' }}>
          <Typography variant="h2" className={classes.wrapOne}>
            {title}
          </Typography>
        </div>
      </Box>
      <Box
        className={classes.background}
        style={{
          backgroundImage: `url(${cover || '/images/default_card.png'})`,
          paddingTop: '30.21756647864625%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  backContainer: {
    position: 'fixed',
    top: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: theme.spacing(3),
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.black_opacity['70'],
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
  background: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  ['@media (max-width: 1166px)']: {
    backContainer: {
      maxWidth: 660,
    },
  },
  ['@media (max-width: 960px)']: {
    backContainer: {
      maxWidth: 'none',
    },
  },
}))

export default CommunityDetailHeader

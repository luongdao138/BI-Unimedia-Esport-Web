import { Grid, Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  name: string
  avatar: string
  handleClick?: () => void
}

const TeamItem: React.FC<Props> = ({ name, avatar, handleClick }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <ButtonBase className={classes.container} onClick={handleClick}>
        <Box display="flex" overflow="hidden">
          <ESAvatar alt={name} src={avatar} />
          <Box color={Colors.white} overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" alignItems="center">
            <Typography variant="h3" noWrap>
              {name}
            </Typography>
          </Box>
        </Box>
      </ButtonBase>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'start',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default TeamItem

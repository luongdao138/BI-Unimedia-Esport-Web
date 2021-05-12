import { Grid, Typography, Box, withStyles, makeStyles, Icon } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import ESChip from '@components/Chip'
import ESAvatar from '@components/Avatar'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface Props {
  tournament: any
  type?: number
}

const StyledAvatarGroup = withStyles({
  avatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: Colors.white,
  },
})(AvatarGroup)

const useStyles = makeStyles(() => ({
  card: {
    width: 240,
  },
  organizer: {
    fontSize: 10,
  },
  chip: {
    height: 15,
    backgroundColor: Colors.grey[400],
  },
  mediaOverlay: {
    backgroundColor: Colors.black_opacity[70],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
}))

const TournamentCard: React.FC<Props> = ({ tournament, type }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = type === 2 ? tournament.attributes.tournament : tournament.attributes
  const cover = data.cover ? data.cover : '/images/avatar.png'
  const organizer = data.organizer?.nickname ? data.organizer.nickname : ''
  const startDate = new Date(data.start_date).toISOString().slice(0, 10).replace(/-/g, '/')

  return (
    <Grid item xs={6} md={4}>
      <ESCard>
        <ESCardMedia cornerIcon={<Icon className="fas fa-trophy" fontSize="small" />} image={cover}>
          {type === 2 && (
            <Box className={classes.mediaOverlay} display="flex" justifyContent="center" alignItems="center">
              <ESAvatar alt="Avatar" src="/images/avatar.png" />
              <ESAvatar alt="Avatar" />
            </Box>
          )}
        </ESCardMedia>
        <ESCardContent>
          <Box color={Colors.white}>
            <Typography>{data.title}</Typography>
          </Box>
          <Typography className={classes.organizer}>{`${t('common:tournament.organizer')} ${organizer}`}</Typography>
          <Box display="flex" flexDirection="row" mt={1} alignItems="center">
            <ESChip
              className={classes.chip}
              size="small"
              label={
                <Box color={Colors.white}>
                  <Typography variant="caption">{t('common:tournament.card_date')}</Typography>
                </Box>
              }
            />
            <Box ml={1} color={Colors.white}>
              <Typography variant="caption">{startDate}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" mt={1} alignItems="center">
            <ESChip
              className={classes.chip}
              size="small"
              label={
                <Box color={Colors.white}>
                  <Typography variant="caption">{t('common:tournament.entry')}</Typography>
                </Box>
              }
            />
            <Box ml={1} color={Colors.white}>
              <Typography variant="caption">{data.participant_count}</Typography>
            </Box>
            <Typography variant="caption">/{data.max_participants}</Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <StyledAvatarGroup max={4}>
              <ESAvatar alt="Avatar" />
              <ESAvatar alt="Bvatar" />
              <ESAvatar alt="Cvatar" />
              <ESAvatar alt="Cvatar" />
            </StyledAvatarGroup>
          </Box>
        </ESCardContent>
      </ESCard>
    </Grid>
  )
}

TournamentCard.defaultProps = {
  type: 1,
}

export default TournamentCard

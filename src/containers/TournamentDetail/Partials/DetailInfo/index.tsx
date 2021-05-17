import { Grid, Box, makeStyles, Typography } from '@material-ui/core'
import ESChip from '@components/Chip'
import { Colors } from '@theme/colors'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { TournamentDetail } from '@services/tournament.service'
import { useTranslation } from 'react-i18next'

interface Props {
  detail: TournamentDetail
  extended?: boolean
}

const DetailInfo: React.FC<Props> = ({ detail }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const data = detail.attributes
  const game = data.game_title?.data ? data.game_title.data.attributes.display_name : ''
  const hardware = data.game_hardware?.data ? data.game_hardware.data.attributes.name : ''
  return (
    <Grid container className={classes.container}>
      <Box display="flex" flexDirection="column" mt={1}>
        <Box color={Colors.white}>
          <Typography variant="h3">{data.title}</Typography>
        </Box>
        <Typography>大会ID：{detail.id}</Typography>

        <Box marginTop={2}>
          <ESChip className={classes.gameChip} label={game} />
        </Box>

        <Box marginTop={2}>
          <Typography>{data.overview}</Typography>
        </Box>

        <Box display="flex" flexDirection="row" marginTop={2}>
          <Typography>#{data.area_name == t('common:tournament.online') ? data.area_name : t('common:tournament.offline')}</Typography>
          <Box ml={3}>
            <Typography>#{TournamentHelper.participantTypeText(data.participant_type)}</Typography>
          </Box>
          <Box ml={3}>
            <Typography>#{TournamentHelper.ruleText(data.rule)}</Typography>
          </Box>
          {!!data.has_prize && (
            <Box ml={3}>
              <Typography>#{t('common:tournament.has_prize')}</Typography>
            </Box>
          )}
          <Box ml={3}>
            <Typography>#{hardware}</Typography>
          </Box>
        </Box>

        {/* date */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={2}>
          <Box className={classes.label}>
            <Typography>{'エントリー期間'}</Typography>
          </Box>
          <Box className={classes.value}>
            <Typography>{' 2021年04月01日'}</Typography>
          </Box>
        </Box>

        {/* date */}
        <Box display="flex" flexDirection="row" alignContent="flex-start" marginTop={1}>
          <Box className={classes.label}>
            <Typography>{'開催期間'}</Typography>
          </Box>
          <Box className={classes.value}>
            <Typography>{' 2021年04月01日'}</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 24,
  },
  gameChip: {
    minWidth: 177,
    width: 177,
  },
  label: {
    display: 'flex',
    flex: 4,
  },
  value: {
    display: 'flex',
    flex: 8,
  },
}))

DetailInfo.defaultProps = {
  extended: false,
}

export default DetailInfo

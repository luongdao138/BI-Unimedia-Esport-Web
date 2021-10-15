import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'

interface EntryCountProps {
  totalCount: number
  count: number
  isTeam: boolean
}

const EntryCount: React.FC<EntryCountProps> = ({ totalCount, count, isTeam }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const unit = isTeam ? t('common.team') : t('common.man')
  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      <Typography className={classes.entryMembersInfoText}>{t('tournament.number_of_entries')}</Typography>
      <Box mr={2} />
      <Typography className={classes.highlightedNumber}>{count}</Typography>
      <Typography>{`${unit} /`}&nbsp;</Typography>
      <Typography className={classes.highlightedNumber}>{totalCount}</Typography>
      <Typography>{unit}</Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  entryMembersInfoText: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}))

export default EntryCount

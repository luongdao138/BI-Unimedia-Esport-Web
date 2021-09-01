import { Box, Typography, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'

interface Props {
  unit?: string
  entryCount: number
  maxCount: number
}

const EntryMembersCount: React.FC<Props> = ({ unit, entryCount, maxCount }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      <Typography className={classes.entryMembersInfoText}>{i18n.t('common:lobby.detail.number_of_entries')}</Typography>
      <Box mr={2} />
      <Typography className={classes.highlightedNumber}>{entryCount}</Typography>
      <Typography>{`${unit} /`}&nbsp;</Typography>
      <Typography className={classes.highlightedNumber}>{maxCount}</Typography>
      <Typography>{unit}</Typography>
    </Box>
  )
}

EntryMembersCount.defaultProps = {
  unit: i18n.t('common:common.man'),
  entryCount: 0,
  maxCount: 0,
}

const useStyles = makeStyles(() => ({
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  entryMembersInfoText: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
}))

export default EntryMembersCount

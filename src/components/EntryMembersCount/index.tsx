import { Box, Typography, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'

interface Props {
  label: string
  entryCount: number
  maxCount: number
  unit?: string
}

const EntryMembersCount: React.FC<Props> = ({ label, entryCount, maxCount, unit }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      <Typography className={classes.entryMembersInfoText}>{label}</Typography>
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

import { Typography, Box, makeStyles } from '@material-ui/core'

type ProfileAvatarProps = {
  label: string | null
  max: number
  total: number
  unit: string
}

const ParticipantCount: React.FC<ProfileAvatarProps> = ({ unit, max, total, label }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" alignItems="flex-end" style={{ verticalAlign: 'text-bottom' }}>
        <Box mr={2}>
          {label ? (
            <Typography variant="h3" className={classes.countLabel}>
              {label}
            </Typography>
          ) : null}
        </Box>
        <Typography variant="h3" className={classes.totalCount}>
          {total}
        </Typography>
        <Typography variant="h3" className={classes.countLabel}>
          {unit}
        </Typography>
        <Typography variant="h3" className={classes.divider}>
          /
        </Typography>
        <Typography variant="h3" className={classes.maxCount}>
          {max}
        </Typography>
        <Typography variant="h3" className={classes.countLabel}>
          {unit}
        </Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  divider: {
    marginLeft: 4,
    position: 'relative',
    top: -2,
    marginRight: 4,
  },
  countLabel: {
    fontWeight: 400,
    marginLeft: 4,
    position: 'relative',
    top: -2,
  },
  maxCount: {
    fontSize: 22,
    fontWeight: 400,
  },
  totalCount: {
    fontSize: 24,
    fontWeight: 600,
  },
}))

export default ParticipantCount

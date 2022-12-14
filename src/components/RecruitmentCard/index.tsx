import { Typography, Box, makeStyles, Icon } from '@material-ui/core'
import ESChip from '@components/Chip'
import ESCard from '@components/Card'
import ESCardMedia from '@components/Card/CardMedia'
import ESCardContent from '@components/Card/CardContent'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

interface Props {
  recruitment: any
}

const RecruitmentCard: React.FC<Props> = ({ recruitment }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const attr = recruitment.attributes

  return (
    <ESCard>
      <ESCardMedia cornerIcon={<Icon className="fas fa-university" fontSize="small" />} image={attr.recruitment_cover}></ESCardMedia>
      <ESCardContent>
        <Typography className={classes.title}>{attr.title}</Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom>
          {attr.message}
        </Typography>
        <Box display="flex" flexDirection="row" mt={1} alignItems="center">
          <ESChip
            size="small"
            label={
              <Box color={Colors.white}>
                <Typography variant="caption">{t('common:tournament.card_date')}</Typography>
              </Box>
            }
          />
          <Box ml={1} color={Colors.white}>
            <Typography variant="caption">{attr.start_datetime}</Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" mt={1} alignItems="center">
          <ESChip
            size="small"
            label={
              <Box color={Colors.white}>
                <Typography variant="caption">{t('common:tournament.entry')}</Typography>
              </Box>
            }
          />
          <Box ml={1} color={Colors.white}>
            <Typography variant="caption">{attr.entry_count}</Typography>
          </Box>
          <Typography variant="caption" className={classes.seperator}>
            /
          </Typography>
          <Typography variant="caption">{attr.max_participants}</Typography>
        </Box>
      </ESCardContent>
    </ESCard>
  )
}

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 10,
    color: Colors.white_opacity[70],
  },
  seperator: {
    paddingRight: 2,
    paddingLeft: 2,
  },
}))

export default RecruitmentCard

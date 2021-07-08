import { Box, Theme, makeStyles, Typography } from '@material-ui/core'
import ESChip from '@components/Chip'
import { UserFeaturesResponse } from '@services/settings.service'
import { useTranslation } from 'react-i18next'

interface Props {
  features: UserFeaturesResponse
  selectedFeatures: any[]
  onSelectChange: (selectedIds) => void
  maxValue?: number
}

const TagSelect: React.FC<Props> = ({ selectedFeatures, features, onSelectChange, maxValue }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const checkIsSelected = (id: number) => selectedFeatures.find((feature) => feature.id === id)

  const handleSelect = (selectedFeature) => {
    const selectedId = parseInt(selectedFeature.id)
    const tempSelectedFeatures = selectedFeatures.concat()
    if (checkIsSelected(selectedId)) {
      const filtered = tempSelectedFeatures.filter((feature) => feature.id !== selectedId)
      onSelectChange(filtered)
    } else {
      tempSelectedFeatures.push({ id: selectedId, feature: selectedFeature.attributes.feature })
      if (maxValue < tempSelectedFeatures.length) tempSelectedFeatures.splice(maxValue - 1, 1)
      onSelectChange(tempSelectedFeatures)
    }
  }

  if (features.length === 0) {
    return (
      <Box pt={8} textAlign="center">
        <Typography color="textSecondary">{t('common:profile.no_tag_available')}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      {features.map((feature) => (
        <ESChip
          key={feature.id}
          className={classes.chipSpacing}
          label={feature.attributes.feature}
          onClick={() => handleSelect(feature)}
          color={checkIsSelected(parseInt(feature.id)) ? 'primary' : 'default'}
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default TagSelect

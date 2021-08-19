import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import ESChip from '@components/Chip'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Theme } from '@material-ui/core'
import { GetPrefecturesResponse } from '@services/common.service'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { CommunityFeature } from '@services/community.service'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  prefectures: GetPrefecturesResponse['data']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values, prefectures }) => {
  const { t } = useTranslation(['common'])
  const [areaName, setAreaName] = useState('')
  const [approval, setApproval] = useState('')
  const [openRange, setOpenRange] = useState('')
  const [games, setGames] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (prefectures) {
      const area = prefectures.find((area) => area.id === String(values.stepOne.area_id))
      area && setAreaName(area.attributes.area)
    }
  }, [prefectures])

  useEffect(() => {
    const approvalName =
      Number(values.stepOne.join_condition) === 0
        ? t('common:community_create.approval_manual')
        : t('common:community_create.approval_automatic')
    setApproval(approvalName)
    const openRangeName =
      Number(values.stepOne.open_range) === 1 ? t('common:community_create.private') : t('common:community_create.public')
    setOpenRange(openRangeName)
    if (!_.isEmpty(values.stepOne.game_titles)) {
      const game = _.chain(values.stepOne.game_titles)
        .map((g) => g.display_name)
        .join(' ')
        .value()
      setGames(game)
    }
  }, [])

  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={4.25} />
      <Box>
        <img
          src={values.stepOne.cover_image_url ? values.stepOne.cover_image_url : '/images/default_card.png'}
          className={classes.coverImg}
        />
      </Box>
      <Box pb={2} />
      <ESInput labelPrimary={t('common:community_create.name')} fullWidth value={values.stepOne.name} disabled />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:community_create.introduction')}
        multiline
        value={values.stepOne.overview}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.game')} value={games} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.area')} value={areaName} disabled={true} fullWidth />
      <ESInput value={values.stepOne.address} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.public_or_private')} value={openRange} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.participation_approval')} value={approval} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.tag')} disabled={true} fullWidth noValue />
      {(values.stepOne.features as CommunityFeature[]).map((category, idx) => (
        <ESChip key={idx} className={classes.chip} label={category.attributes.feature} />
      ))}
      <Box pb={2} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  viewHolder: {
    marginRight: theme.spacing(5),
    marginLeft: theme.spacing(5),
  },
  coverImg: {
    width: '100%',
    height: 116,
    objectFit: 'cover',
    objectPosition: '50% 50%',
    borderRadius: 4,
  },
  [theme.breakpoints.down('sm')]: {
    viewHolder: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  chip: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default Confirm

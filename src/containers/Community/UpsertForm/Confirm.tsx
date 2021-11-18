import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import ESChip from '@components/Chip'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Theme, Typography } from '@material-ui/core'
import { GetPrefecturesResponse } from '@services/common.service'
import { useEffect, useState } from 'react'
import { CommunityFeature } from '@services/community.service'
import { JOIN_CONDITION, OPEN_RANGE } from '@constants/community.constants'
import { Colors } from '@theme/colors'
import { GameTitle } from '@services/game.service'
import ReactDOM from 'react-dom'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  prefectures: GetPrefecturesResponse['data']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values, prefectures }) => {
  const { t } = useTranslation(['common'])
  const [areaName, setAreaName] = useState<string>('')
  const [approval, setApproval] = useState<string>('')
  const [openRange, setOpenRange] = useState<string>('')
  const classes = useStyles()

  useEffect(() => {
    if (prefectures) {
      const area = prefectures.find((area) => area.id === String(values.stepOne.area_id))
      area && setAreaName(area.attributes.area)
    }
  }, [prefectures])

  useEffect(() => {
    const approvalName =
      Number(values.stepOne.join_condition) === JOIN_CONDITION.MANUAL
        ? t('common:community_create.approval_manual')
        : t('common:community_create.approval_automatic')
    setApproval(approvalName)
    const openRangeName =
      Number(values.stepOne.open_range) === OPEN_RANGE.UNSEARCHABLE
        ? t('common:community_create.private')
        : t('common:community_create.public')
    setOpenRange(openRangeName)
  }, [])

  useEffect(() => {
    const node = document.getElementById('es-modal')
    // eslint-disable-next-line react/no-find-dom-node
    const component = ReactDOM.findDOMNode(node)
    if (component) component.scrollTo(0, 0)
  }, [])

  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={4.25} />
      <Box
        style={{
          background: `url(${values.stepOne.cover_image_url ? values.stepOne.cover_image_url : '/images/default_card.png'})`,
          paddingTop: '30.21756647864625%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
      />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:community_create.name')} fullWidth value={values.stepOne.name} disabled />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:community_create.introduction')}
        multiline
        value={values.stepOne.description}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.game')} disabled={true} fullWidth noValue />
      {values.stepOne.game_titles.length > 0 && (
        <Box display="flex" flexWrap="wrap">
          {(values.stepOne.game_titles as GameTitle['attributes'][]).map((game, i) => (
            <Typography key={i} className={classes.gameName} variant="body1">
              {game.display_name}
            </Typography>
          ))}
        </Box>
      )}
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.area')} value={areaName} disabled={true} fullWidth />
      <ESInput value={values.stepOne.address} disabled={true} multiline={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.public_or_private')} value={openRange} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.participation_approval')} value={approval} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:community_create.tag')} disabled={true} fullWidth noValue />
      {(values.stepOne.features as CommunityFeature[]).map((category, idx) => (
        <ESChip key={idx} isGameList={true} className={classes.chip} label={category.attributes.feature} />
      ))}
      <Box pb={2} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  gameName: {
    marginRight: theme.spacing(2),
    color: Colors.white_opacity['30'],
    fontSize: 14,
  },
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

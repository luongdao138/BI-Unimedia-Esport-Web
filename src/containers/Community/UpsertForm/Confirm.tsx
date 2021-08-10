import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import ESChip from '@components/Chip'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Typography, Theme } from '@material-ui/core'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'
import { useEffect, useState } from 'react'
import { UserLoginResponse } from '@services/auth.service'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  hardwares: HardwareResponse['data']
  prefectures: GetPrefecturesResponse['data']
  user: UserLoginResponse
  isEdit: boolean
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values, hardwares, prefectures, isEdit }) => {
  const { t } = useTranslation(['common'])
  const [hardwareName, setHardwareName] = useState('')
  const [areaName, setAreaName] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (prefectures) {
      const area = prefectures.find((area) => area.id === String(values.stepOne.area_id))
      setAreaName(area.attributes.area)
    }
  }, [prefectures])

  useEffect(() => {
    hardwares.forEach((h) => {
      if (Number(h.id) === Number(values.stepOne.game_hardware_id)) {
        setHardwareName(h.attributes.name)
      }
    })
  }, [values.stepOne.game_hardware_id])

  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={8} />
      <Typography variant="h2">
        {isEdit ? t('common:tournament_create.confirm_edit_title') : t('common:tournament_create.comfirm_title')}
      </Typography>
      <Box pb={4.25} />
      <Box>
        <img
          src={values.stepOne.cover_image_url ? values.stepOne.cover_image_url : '/images/default_card.png'}
          className={classes.coverImg}
        />
      </Box>
      <Box pb={2} />
      <ESInput labelPrimary={t('common:lobby_create.name')} fullWidth value={values.stepOne.title} disabled />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:lobby_create.overview')} multiline value={values.stepOne.overview} disabled={true} fullWidth />
      <Box pb={2} />

      {values.stepOne.game_title_id[0] ? (
        <>
          <ESInput
            labelPrimary={t('common:lobby_create.game')}
            value={values.stepOne.game_title_id[0].display_name}
            disabled={true}
            fullWidth
          />
          <Box pb={2} />
        </>
      ) : (
        <>
          <ESInput labelPrimary={t('common:lobby_create.game')} disabled={true} fullWidth />
          <Box pb={2} />
        </>
      )}
      <ESInput labelPrimary={t('common:lobby_create.game_hardware')} value={hardwareName} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:lobby_create.area')} value={areaName} disabled={true} fullWidth />
      <Box pb={2} />

      <ESInput labelPrimary={t('common:lobby_create.area_detail')} value={values.stepOne.address} disabled={true} fullWidth />
      <Box pb={2} />

      {values.stepOne.tag_title_id.map((category, idx) => (
        <ESChip key={idx} className={classes.chip} label={category.display_name} />
      ))}
      <Box pb={2} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  viewHolder: {
    marginRight: 40,
    marginLeft: 40,
  },
  coverImg: {
    width: '100%',
    height: 116,
    objectFit: 'cover',
    objectPosition: '50% 50%',
    borderRadius: 4,
  },
  time: {
    maxWidth: 340,
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gridGap: 14,
    alignItems: 'center',
    cursor: 'default',
  },
  valueColor: {
    color: '#ffffff4d',
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

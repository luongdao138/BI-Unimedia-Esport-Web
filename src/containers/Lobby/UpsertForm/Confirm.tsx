import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Typography, Theme } from '@material-ui/core'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { UserLoginResponse } from '@services/auth.service'
import ESChip from '@components/Chip'

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
      const area = prefectures.find((area) => area.id === String(values.stepTwo.area_id))
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

  const formatDate = (label: string, beginDateStr: string, endDateStr: string) => {
    const beginDate = moment(beginDateStr).format('YYYY年MM月DD日')
    const beginTime = moment(beginDateStr).format('HH:mm')

    const endDate = moment(endDateStr).format('YYYY年MM月DD日')
    const endTime = moment(endDateStr).format('HH:mm')

    return (
      <>
        <ESInput labelPrimary={label} value={'dss'} disabled={true} fullWidth style={{ display: 'none' }} />
        <Box className={classes.time}>
          <Box className={classes.valueColor}>
            <Typography>
              {beginDate}
              <br />
              {beginTime}
            </Typography>
          </Box>
          <Box>
            <Typography style={{ textAlign: 'right' }}>-</Typography>
          </Box>
          <Box className={classes.valueColor}>
            <Typography>
              {endDate}
              <br />
              {endTime}
            </Typography>
          </Box>
        </Box>
      </>
    )
  }

  const formatOneDate = (label: string, beginDateStr: string) => {
    const beginDate = moment(beginDateStr).format('YYYY年MM月DD日')
    const beginTime = moment(beginDateStr).format('HH:mm')

    return (
      <>
        <ESInput labelPrimary={label} value={'dss'} disabled={true} fullWidth style={{ display: 'none' }} />
        <Box className={classes.time}>
          <Box className={classes.valueColor}>
            <Typography>
              {beginDate}
              <br />
              {beginTime}
            </Typography>
          </Box>
        </Box>
      </>
    )
  }

  const peopleText = t('common:lobby_create.people')
  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={8} />
      <Typography variant="h2">
        {isEdit ? t('common:tournament_create.confirm_edit_title') : t('common:tournament_create.comfirm_title')}
      </Typography>
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
      <ESInput labelPrimary={t('common:lobby_create.name')} fullWidth value={values.stepOne.title} disabled />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:lobby_create.overview')} multiline value={values.stepOne.message} disabled={true} fullWidth />
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

      <ESInput
        labelPrimary={t('common:lobby_create.max_participants')}
        value={`${values.stepOne.max_participants}${peopleText}`}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />

      <ESInput
        labelPrimary={t('common:lobby_create.organizer_joined')}
        value={values.stepOne.organizer_participated ? t('common:lobby_create.organizer_join') : t('common:lobby_create.organizer_unjoin')}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />

      {formatDate(t('common:lobby_create.entry_period'), values.stepTwo.entry_start_datetime, values.stepTwo.entry_end_datetime)}
      <Box pb={2} />

      {formatOneDate(t('common:lobby_create.recruitment_start_date'), values.stepTwo.start_datetime)}
      <Box pb={2} />

      <ESInput labelPrimary={t('common:lobby_create.area')} value={areaName} disabled={true} fullWidth />
      <ESInput labelPrimary={''} value={values.stepTwo.address} disabled={true} fullWidth multiline />
      <Box pb={2} />
      {values.stepOne.categories.map((category, idx) => (
        <ESChip key={idx} className={classes.chip} label={category.name} />
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

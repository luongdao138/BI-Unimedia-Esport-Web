import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Typography, Theme } from '@material-ui/core'
import { GetPrefecturesResponse, HardwareResponse } from '@services/common.service'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { RULES, PARTICIPATION_TYPES } from '@constants/tournament.constants'
import { UserLoginResponse } from '@services/auth.service'
import _ from 'lodash'

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

const Confirm: React.FC<ConfirmProps> = ({ values, hardwares, prefectures, user, isEdit }) => {
  const { t } = useTranslation(['common'])
  const [hardwareName, setHardwareName] = useState('')
  const [coOrganizers, setCoOrganizers] = useState('')
  const [areaName, setAreaName] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (prefectures) {
      const area = prefectures.find((area) => area.id === String(values.stepThree.area_id))
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

  const [ruleName, setRuleName] = useState('')
  useEffect(() => {
    RULES.forEach((rule) => {
      if (rule.value === values.stepTwo.rule) {
        setRuleName(rule.label)
      }
    })
  }, [values.stepTwo.rule])

  const [participationType, setParticipationType] = useState('')
  useEffect(() => {
    PARTICIPATION_TYPES.forEach((p) => {
      if (Number(p.value) === Number(values.stepTwo.participant_type)) {
        setParticipationType(p.label)
      }
    })
  }, [values.stepTwo.participant_type])

  useEffect(() => {
    if (values.stepFour.co_organizers) {
      const organizers = _.chain(values.stepFour.co_organizers)
        .map((o) => o.attributes.nickname)
        .join(' ')
        .value()

      setCoOrganizers(organizers)
    }
  }, [values.stepFour.co_organizers])

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

  const peopleText = t('common:tournament_create.people')
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
          paddingTop: '30.27%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
        }}
        className={classes.coverWrapper}
      ></Box>
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.name')} fullWidth value={values.stepOne.title} disabled />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.overview')} multiline value={values.stepOne.overview} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament.prize')}
        value={values.stepOne.has_prize ? t('common:common.yes') : t('common:common.no')}
        disabled={true}
        fullWidth
      />
      {values.stepOne.has_prize && <ESInput value={values.stepOne.prize_amount} disabled={true} fullWidth />}
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.game')}
        value={_.get(values, 'stepOne.game_title_id[0].display_name', '')}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.game_hardware')} value={hardwareName} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.holding_format')} value={ruleName} disabled={true} fullWidth />
      {values.stepTwo.has_third_place && <ESInput value={t('common:tournament_create.has_third_place')} disabled={true} fullWidth />}
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.participation')} value={participationType} disabled={true} fullWidth />
      <ESInput value={`${values.stepTwo.max_participants}${peopleText}`} disabled={true} fullWidth />
      <ESInput value={values.stepTwo.terms_of_participation} disabled={true} fullWidth multiline />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.public_or_private')}
        value={values.stepTwo.t_type === 't_public' ? t('common:tournament_create.public') : t('common:tournament_create.private')}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.precautions')} value={values.stepTwo.notes} multiline disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.retain_history_short')}
        value={values.stepTwo.retain_history ? t('common:common.yes') : t('common:common.no')}
        multiline
        disabled={true}
        fullWidth
      />
      <Box pb={2} />
      {formatDate(t('common:tournament_create.entry_period'), values.stepThree.acceptance_start_date, values.stepThree.acceptance_end_date)}
      <Box pb={2} />
      {formatDate(t('common:tournament_create.holding_period'), values.stepThree.start_date, values.stepThree.end_date)}
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.area')} value={areaName} disabled={true} fullWidth />
      {values.stepThree.address && <ESInput value={values.stepThree.address} disabled={true} fullWidth multiline />}
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.organizer')} value={user.nickname} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.co_organizer')} value={coOrganizers} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.organizer_name')}
        value={values.stepFour.organizer_name}
        disabled={true}
        fullWidth
      />
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
}))

export default Confirm

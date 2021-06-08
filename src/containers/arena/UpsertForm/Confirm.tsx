import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import { FormType } from './FormModel/FormType'
import { Box } from '@material-ui/core'
import { HardwareResponse } from '@services/common.service'
import { useEffect, useState } from 'react'

import { RULES, PARTICIPATION_TYPES } from '@constants/tournament.constants'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  hardwares: HardwareResponse['data']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values, hardwares }) => {
  const { t } = useTranslation(['common'])

  const [hardwareName, setHardwareName] = useState('')
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

  return (
    <Box pb={20}>
      <ESInput labelPrimary={t('common:tournament_create.name')} fullWidth value={values.stepOne.title} disabled />
      <Box pb={2} />
      <ESInput labelPrimary={t('common:tournament_create.overview')} multiline value={values.stepOne.overview} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.has_prize')}
        value={values.stepOne.has_prize ? 'あり' : 'なし'}
        disabled={true}
        fullWidth
      />
      {values.stepOne.has_prize && <ESInput value={values.stepOne.prize_amount} disabled={true} fullWidth />}
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.game')}
        value={values.stepOne.game_title_id[0].display_name}
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
      <ESInput value={values.stepTwo.max_participants} disabled={true} fullWidth />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.precautions')}
        value={values.stepTwo.notes}
        multiline
        rows={3}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />
      <ESInput
        labelPrimary={t('common:tournament_create.precautions')}
        value={values.stepTwo.notes}
        multiline
        rows={3}
        disabled={true}
        fullWidth
      />
      <Box pb={2} />
    </Box>
  )
}

export default Confirm

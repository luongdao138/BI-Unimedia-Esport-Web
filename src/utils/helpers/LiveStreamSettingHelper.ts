import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikErrors } from 'formik'
import _ from 'lodash'

const checkRequiredFields = (errors: FormikErrors<FormLiveType>): boolean => {
  const { stepSettingOne, stepSettingTwo, stepSettingThree } = errors
  const requiredFieldErrors = []
  if (stepSettingOne) {
    requiredFieldErrors.push(stepSettingOne.title)
    requiredFieldErrors.push(stepSettingOne.description)
    requiredFieldErrors.push(stepSettingOne.category)
    if (stepSettingOne.ticket_price && stepSettingOne.use_ticket) {
      requiredFieldErrors.push(stepSettingOne.ticket_price)
    }
  }
  if (stepSettingTwo) {
    requiredFieldErrors.push(stepSettingTwo.re_title)
    requiredFieldErrors.push(stepSettingTwo.re_description)
    requiredFieldErrors.push(stepSettingTwo.re_category)
    requiredFieldErrors.push(stepSettingTwo.date_time_notification_delivery)
    requiredFieldErrors.push(stepSettingTwo.date_time_schedule_delivery_start)
    requiredFieldErrors.push(stepSettingTwo.date_time_schedule_end)
    if (stepSettingTwo.re_use_ticket && stepSettingTwo.re_ticket_price && stepSettingTwo.date_time_ticket_sale_start) {
      requiredFieldErrors.push(stepSettingTwo.re_ticket_price)
      requiredFieldErrors.push(stepSettingTwo.date_time_ticket_sale_start)
    }
  }
  if (stepSettingThree) {
    requiredFieldErrors.push(stepSettingThree.channel_name)
    requiredFieldErrors.push(stepSettingThree.overview)
  }
  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)
  return _.isEmpty(filteredErrors)
}
export const LiveStreamSettingHelper = {
  checkRequiredFields,
}

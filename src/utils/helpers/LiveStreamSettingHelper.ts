import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikErrors } from 'formik'
import _ from 'lodash'

const checkRequiredFields = (errors: FormikErrors<FormLiveType>): boolean => {
  const { stepSettingOne } = errors
  const requiredFieldErrors = []
  if (stepSettingOne) {
    requiredFieldErrors.push(stepSettingOne.title)
    requiredFieldErrors.push(stepSettingOne.description)
    requiredFieldErrors.push(stepSettingOne.category)
    if (stepSettingOne.ticket_price) {
      requiredFieldErrors.push(stepSettingOne.ticket_price)
    }
  }
  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)
  return _.isEmpty(filteredErrors)
}
export const LiveStreamSettingHelper = {
  checkRequiredFields,
}

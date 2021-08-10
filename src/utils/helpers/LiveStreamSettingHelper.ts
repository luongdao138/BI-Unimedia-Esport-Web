import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikErrors } from 'formik'
import _ from 'lodash'

const checkRequiredFields = (errors: FormikErrors<FormLiveType>): boolean => {
  const { stepSettingOne, stepSettingThree } = errors
  const requiredFieldErrors = []
  if (stepSettingOne) {
    requiredFieldErrors.push(stepSettingOne.title)
    requiredFieldErrors.push(stepSettingOne.description)
    requiredFieldErrors.push(stepSettingOne.category)
    if (stepSettingOne.ticket_price && stepSettingOne.use_ticket) {
      requiredFieldErrors.push(stepSettingOne.ticket_price)
    }
  }
  // if(stepSettingTwo){}
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

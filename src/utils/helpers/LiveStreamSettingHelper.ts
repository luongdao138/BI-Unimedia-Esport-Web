import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikErrors } from 'formik'
import _ from 'lodash'

const checkRequiredFields = (tab: number, errors: FormikErrors<FormLiveType>): boolean => {
  const { stepSettingOne, stepSettingTwo, stepSettingThree } = errors
  const requiredFieldErrors = []
  switch (tab) {
    case 1: {
      if (stepSettingOne) {
        requiredFieldErrors.push(stepSettingOne.title)
        requiredFieldErrors.push(stepSettingOne.description)
        requiredFieldErrors.push(stepSettingOne.category)
        requiredFieldErrors.push(stepSettingOne.video_publish_end_time)
        if (stepSettingOne.ticket_price) {
          requiredFieldErrors.push(stepSettingOne.ticket_price)
        }
      }
      const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)
      return _.isEmpty(filteredErrors)
    }
    case 2: {
      if (stepSettingTwo) {
        requiredFieldErrors.push(stepSettingTwo.title)
        requiredFieldErrors.push(stepSettingTwo.description)
        requiredFieldErrors.push(stepSettingTwo.category)
        requiredFieldErrors.push(stepSettingTwo.stream_notify_time)
        requiredFieldErrors.push(stepSettingTwo.stream_schedule_start_time)
        requiredFieldErrors.push(stepSettingTwo.stream_schedule_end_time)
        if (stepSettingTwo.sell_optional && stepSettingTwo.sell_ticket_start_time) {
          requiredFieldErrors.push(stepSettingTwo.ticket_price)
          requiredFieldErrors.push(stepSettingTwo.sell_ticket_start_time)
        }
      }
      const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)
      return _.isEmpty(filteredErrors)
    }
    case 3: {
      if (stepSettingThree) {
        requiredFieldErrors.push(stepSettingThree.name)
        requiredFieldErrors.push(stepSettingThree.description)
      }
      const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)
      return _.isEmpty(filteredErrors)
    }
    default:
      break
  }
}
export const LiveStreamSettingHelper = {
  checkRequiredFields,
}

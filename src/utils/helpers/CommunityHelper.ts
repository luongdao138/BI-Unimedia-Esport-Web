import { T_TYPE } from '@constants/community.constants'
import { FormType } from '@containers/Community/UpsertForm/FormModel/FormType'
import { FormType as TopicFormType } from '@containers/Community/Topic/UpsertForm/FormModel/FormType'
import { FormikErrors } from 'formik'
import _ from 'lodash'

const getTypeValue = (t_type: string | number): boolean => {
  if (String(t_type) === T_TYPE.PRIVATE) return false
  else if (String(t_type) === T_TYPE.PUBLIC) return true

  return true
}

const onTypeChange = (type: string | number): string => {
  if (type == T_TYPE.PUBLIC) return T_TYPE.PRIVATE
  else return T_TYPE.PUBLIC
}

const checkCommunityRequiredFields = (errors: FormikErrors<FormType>): boolean => {
  const { stepOne } = errors

  const requiredFieldErrors = []
  if (stepOne) {
    requiredFieldErrors.push(stepOne.title)
    requiredFieldErrors.push(stepOne.participation_approval)
  }

  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)

  return _.isEmpty(filteredErrors)
}

const checkTopicRequiredFields = (errors: FormikErrors<TopicFormType>): boolean => {
  const { stepOne } = errors

  const requiredFieldErrors = []
  if (stepOne) {
    requiredFieldErrors.push(stepOne.title)
    requiredFieldErrors.push(stepOne.overview)
  }

  const filteredErrors = _.filter(requiredFieldErrors, (o) => o !== undefined)

  return _.isEmpty(filteredErrors)
}

export const CommunityHelper = {
  getTypeValue,
  onTypeChange,
  checkCommunityRequiredFields,
  checkTopicRequiredFields,
}

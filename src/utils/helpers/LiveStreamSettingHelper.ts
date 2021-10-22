import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { TYPE_RM } from '@services/liveStream.service'
import { FormikErrors, FormikProps } from 'formik'
import _ from 'lodash'

interface FormError {
  helperText: string | null
  error: boolean | null
}

const checkRequiredFields = (tab: number, errors: FormikErrors<FormLiveType>, type_rm?: string): boolean => {
  const { stepSettingOne, stepSettingTwo, stepSettingThree } = errors
  const requiredFieldErrors = []
  switch (tab) {
    case 1: {
      if (stepSettingOne) {
        requiredFieldErrors.push(stepSettingOne.title)
        requiredFieldErrors.push(stepSettingOne.description)
        requiredFieldErrors.push(stepSettingOne.category)
        if (stepSettingOne.video_publish_end_time) {
          requiredFieldErrors.push(stepSettingOne.video_publish_end_time)
        }
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
        requiredFieldErrors.push(stepSettingTwo.stream_schedule_start_time)
        requiredFieldErrors.push(stepSettingTwo.stream_schedule_end_time)
        if (stepSettingTwo.sell_optional && stepSettingTwo.sell_ticket_start_time) {
          requiredFieldErrors.push(stepSettingTwo.ticket_price)
          if (type_rm === TYPE_RM.SELL || type_rm === TYPE_RM.NEW) {
            requiredFieldErrors.push(stepSettingTwo.sell_ticket_start_time)
          }
        }
        if (stepSettingTwo.video_publish_end_time && (type_rm === TYPE_RM.PUBLISH || type_rm === TYPE_RM.NEW)) {
          requiredFieldErrors.push(stepSettingTwo.video_publish_end_time)
        }
        if (type_rm === TYPE_RM.NOTIFY || type_rm === TYPE_RM.NEW) {
          requiredFieldErrors.push(stepSettingTwo.stream_notify_time)
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

const hasErrorField = (message) => ({
  helperText: message,
  error: true,
})

const errorFields = [
  ['title', 'title'],
  ['description', 'description'],
  ['category', 'category'],
  ['stream_notify_time', 'stream_notify_time'],
  ['stream_schedule_start_time', 'stream_schedule_start_time'],
  ['notify_live_start_date', 'stream_schedule_start_time'],
  ['stream_schedule_end_time', 'stream_schedule_end_time'],
  ['schedule_live_date', 'stream_schedule_end_time'],
  ['max_schedule_live_date', 'stream_schedule_end_time'],
  ['max_schedule_live_date', 'stream_schedule_end_time'],
  ['video_publish_end_time', 'video_publish_end_time'],
  ['ticket_price', 'ticket_price'],
  ['public_time_more_than_end', 'video_publish_end_time'],
  ['sell_ticket_start_time', 'sell_ticket_start_time'],
  ['sell_less_than_start', 'sell_ticket_start_time'],
]

const getDisplayErrorField = (formik: FormikProps<FormLiveType>) => {
  const { errors } = formik
  const { stepSettingTwo } = errors
  const errorDisplayField = errorFields.find((field) => stepSettingTwo[field[0]])
  return errorDisplayField[1]
}

const checkDisplayErrorOnSubmit = (formik: FormikProps<FormLiveType>, field: string): FormError => {
  const validField = {
    helperText: null,
    error: null,
  }
  const { errors } = formik
  const { stepSettingTwo } = errors
  if (!stepSettingTwo) {
    return validField
  }
  const errorDisplayField = errorFields.find((field) => stepSettingTwo[field[0]])
  return errorDisplayField[1] === field ? hasErrorField(stepSettingTwo[errorDisplayField[0]]) : validField
}

const checkDisplayErrorOnChange = (formik: FormikProps<FormLiveType>, field: string, validateField: string): FormError => {
  const { errors } = formik
  const { stepSettingTwo } = errors
  const validField = {
    helperText: null,
    error: null,
  }
  return {
    '': () => validField,
    title: () => {
      if (field === 'title' && stepSettingTwo?.title) {
        return hasErrorField(stepSettingTwo?.title)
      }
      return validField
    },
    description: () => {
      if (field === 'description' && stepSettingTwo?.description) {
        return hasErrorField(stepSettingTwo?.description)
      }
      return validField
    },
    category: () => {
      if (field === 'category' && stepSettingTwo?.category) {
        return hasErrorField(stepSettingTwo?.category)
      }
      return validField
    },
    ticket_price: () => {
      if (field === 'ticket_price' && stepSettingTwo?.ticket_price) {
        return hasErrorField(stepSettingTwo?.ticket_price)
      }
      return validField
    },
    stream_notify_time: () => {
      if (field === 'stream_notify_time') {
        return stepSettingTwo?.stream_notify_time ? hasErrorField(stepSettingTwo?.stream_notify_time) : validField
      }
      if (field !== 'stream_schedule_start_time') {
        return validField
      }
      if (stepSettingTwo?.notify_live_start_date) {
        return hasErrorField(stepSettingTwo?.notify_live_start_date)
      }
      return validField
    },
    stream_schedule_start_time: () => {
      return {
        '': () => validField,
        title: () => validField,
        description: () => validField,
        category: () => validField,
        ticket_price: () => validField,
        stream_notify_time: () => validField,
        video_publish_end_time: () => validField,
        stream_schedule_start_time: () => {
          if (stepSettingTwo?.stream_schedule_start_time) {
            return hasErrorField(stepSettingTwo?.stream_schedule_start_time)
          }
          if (stepSettingTwo?.notify_live_start_date) {
            return hasErrorField(stepSettingTwo?.notify_live_start_date)
          }
          return validField
        },
        stream_schedule_end_time: () => {
          if (stepSettingTwo?.schedule_live_date) {
            return hasErrorField(stepSettingTwo?.schedule_live_date)
          }
          if (stepSettingTwo?.max_schedule_live_date) {
            return hasErrorField(stepSettingTwo?.max_schedule_live_date)
          }
          return validField
        },
        sell_ticket_start_time: () => {
          // stepSettingTwo?.sell_ticket_start_time ? hasErrorField(stepSettingTwo?.sell_ticket_start_time) : validField,
          if (stepSettingTwo?.sell_ticket_start_time) {
            return hasErrorField(stepSettingTwo?.sell_ticket_start_time)
          }
          if (stepSettingTwo?.sell_less_than_start) {
            return hasErrorField(stepSettingTwo?.sell_less_than_start)
          }
          return validField
        },
      }[field]()
    },
    stream_schedule_end_time: () => {
      return {
        '': () => validField,
        title: () => validField,
        description: () => validField,
        category: () => validField,
        ticket_price: () => validField,
        stream_notify_time: () => validField,
        stream_schedule_start_time: () => validField,
        sell_ticket_start_time: () => validField,
        stream_schedule_end_time: () => {
          if (stepSettingTwo?.stream_schedule_end_time) {
            return hasErrorField(stepSettingTwo?.stream_schedule_end_time)
          }
          if (stepSettingTwo?.max_schedule_live_date) {
            return hasErrorField(stepSettingTwo?.max_schedule_live_date)
          }
          if (stepSettingTwo?.schedule_live_date) {
            return hasErrorField(stepSettingTwo?.schedule_live_date)
          }
          return validField
        },
        video_publish_end_time: () =>
          stepSettingTwo?.public_time_more_than_end ? hasErrorField(stepSettingTwo?.public_time_more_than_end) : validField,
      }[field]()
    },
    video_publish_end_time: () => {
      if (field !== 'video_publish_end_time') {
        return validField
      }
      if (stepSettingTwo?.video_publish_end_time) {
        return hasErrorField(stepSettingTwo?.video_publish_end_time)
      }
      if (stepSettingTwo?.public_time_more_than_end) {
        return hasErrorField(stepSettingTwo?.public_time_more_than_end)
      }
      return validField
    },
    sell_ticket_start_time: () => {
      if (field !== 'sell_ticket_start_time') {
        return validField
      }
      if (stepSettingTwo?.sell_ticket_start_time) {
        return hasErrorField(stepSettingTwo?.sell_ticket_start_time)
      }
      if (stepSettingTwo?.sell_less_than_start) {
        return hasErrorField(stepSettingTwo?.sell_less_than_start)
      }
      return validField
    },
  }[validateField]()
}

const checkDisplayError = (formik: FormikProps<FormLiveType>, field: string, type_rm?: string): FormError => {
  const { errors, touched } = formik
  const { stepSettingTwo } = errors

  const shouldHideStreamScheduleStartTimeError = stepSettingTwo?.stream_notify_time || stepSettingTwo?.notify_live_end_date
  const shouldHideStreamScheduleEndTimeError =
    shouldHideStreamScheduleStartTimeError || stepSettingTwo?.stream_schedule_start_time || stepSettingTwo?.notify_live_start_date
  const shouldHideVideoPublishEndTimeError =
    shouldHideStreamScheduleStartTimeError ||
    stepSettingTwo?.schedule_live_date ||
    stepSettingTwo?.max_schedule_live_date ||
    stepSettingTwo?.stream_schedule_end_time
  const shouldSellTicketStartTimeError =
    shouldHideVideoPublishEndTimeError || stepSettingTwo?.public_time_less_than_start || stepSettingTwo?.public_time_more_than_end

  switch (field) {
    case 'stream_schedule_start_time': {
      if (shouldHideStreamScheduleStartTimeError)
        return {
          helperText: null,
          error: null,
        }

      const helperText =
        (touched?.stepSettingTwo?.stream_schedule_start_time && errors?.stepSettingTwo?.stream_schedule_start_time) ||
        errors?.stepSettingTwo?.notify_live_start_date ||
        errors?.stepSettingTwo?.sell_less_than_start
      return {
        helperText,
        error: !!helperText,
      }
    }
    case 'stream_schedule_end_time': {
      if (shouldHideStreamScheduleEndTimeError) {
        return {
          helperText: null,
          error: null,
        }
      }

      const helperText =
        (touched?.stepSettingTwo?.stream_schedule_end_time && errors?.stepSettingTwo?.stream_schedule_end_time) ||
        errors?.stepSettingTwo?.schedule_live_date ||
        errors?.stepSettingTwo?.max_schedule_live_date
      return {
        helperText,
        error: !!helperText,
      }
    }
    case 'video_publish_end_time': {
      if (shouldHideVideoPublishEndTimeError) {
        return {
          helperText: null,
          error: null,
        }
      }
      const helperText =
        (touched?.stepSettingTwo?.video_publish_end_time && errors?.stepSettingTwo?.video_publish_end_time) ||
        (type_rm === TYPE_RM.PUBLISH &&
          (errors?.stepSettingTwo?.public_time_less_than_start || errors?.stepSettingTwo?.public_time_more_than_end))
      return {
        helperText,
        error: !!helperText,
      }
    }
    case 'sell_ticket_start_time': {
      if (shouldSellTicketStartTimeError) {
        return {
          helperText: null,
          error: null,
        }
      }

      const helperText =
        (touched?.stepSettingTwo?.sell_ticket_start_time && errors?.stepSettingTwo?.sell_ticket_start_time) ||
        errors?.stepSettingTwo?.sell_less_than_start
      return {
        helperText,
        error: !!helperText,
      }
    }
    default:
      break
  }
}

export const LiveStreamSettingHelper = {
  checkRequiredFields,
  checkDisplayError,
  checkDisplayErrorOnChange,
  checkDisplayErrorOnSubmit,
  getDisplayErrorField,
}

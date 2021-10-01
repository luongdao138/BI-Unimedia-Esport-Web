import i18n from '@locales/i18n'
import * as Yup from 'yup'
import { LobbyHelper } from '@utils/helpers/LobbyHelper'
import moment from 'moment'
import { LobbyDetail } from '@services/lobby.service'
import { EditableTypes } from '../useLobbyCreate'

export const getValidationScheme = (data: LobbyDetail, editables: EditableTypes): any => {
  let recruitMinDate = new Date()
  let minStartDate = new Date()

  if (!!data && !!data.attributes.status) {
    const beforeRecruit = LobbyHelper.checkStatus(data.attributes.status, 'recruiting')
    if (!beforeRecruit && data.attributes.entry_start_datetime) recruitMinDate = new Date(data.attributes.entry_start_datetime)
    if (!editables.start_datetime && data.attributes.start_datetime) minStartDate = new Date(data.attributes.start_datetime)
  }

  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 }))
        .min(2, i18n.t('common:common.at_least'))
        .test('empty-check', i18n.t('common:common.input_incorrect'), (val) => {
          if (val && val.length > 1 && val.trim().length === 0) return false
          return true
        }),
      message: Yup.string()
        .nullable()
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
      categories: Yup.array(),
      game_title_id: Yup.array().nullable(),
      game_hardware_id: Yup.number().nullable().integer(i18n.t('common:common.integer')),
      max_participants: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .matches(/^-?(0|[1-9]\d*)$/, { excludeEmptyString: false, message: i18n.t('common:common.validation.only_digit') })
        .test('participant_boundary', i18n.t('common:lobby.validation.participants_limit'), (val) => {
          const num = parseInt(val)
          return num >= 2 && num <= 128
        }),
      organizer_participated: Yup.boolean(),
    }),
    stepTwo: Yup.object({
      entry_start_datetime: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(recruitMinDate, i18n.t('common:common.validation.min_date')),
      entry_end_datetime: Yup.date().nullable().required(i18n.t('common:common.input_required')),
      start_datetime: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:common.validation.min_date')),
      area_id: Yup.number().min(1, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')).notOneOf([-1]),
      address: Yup.string()
        .nullable()
        .max(5000, i18n.t('common:common.validation.char_limit', { char_limit: 5000 })),
      // for cross-fields validations
      recruit_date: Yup.string().when(['entry_start_datetime'], {
        is: (entry_start_datetime) => {
          return entry_start_datetime && moment(entry_start_datetime) < moment(recruitMinDate)
        },
        then: Yup.string().required(i18n.t('common:common.validation.min_date')),
      }),
      before_entry_end_date: Yup.string().when(['entry_start_datetime', 'entry_end_datetime'], {
        is: (entry_start_datetime, entry_end_datetime) => {
          return Date.parse(entry_start_datetime) >= Date.parse(entry_end_datetime)
        },
        then: Yup.string().required(i18n.t('common:common.validation.before_entry_end_date')),
      }),
      acceptance_end_start_date: Yup.string().when(['entry_end_datetime', 'start_datetime'], {
        is: (entry_end_datetime, start_datetime) => {
          return Date.parse(entry_end_datetime) >= Date.parse(start_datetime)
        },
        then: Yup.string().required(i18n.t('common:common.validation.before_start_date')),
      }),
    }),
  })
}

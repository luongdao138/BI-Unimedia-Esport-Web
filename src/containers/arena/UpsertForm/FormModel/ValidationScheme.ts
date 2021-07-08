import i18n from '@locales/i18n'
import * as Yup from 'yup'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import moment from 'moment'
import { TournamentDetail } from '@services/arena.service'
import { EditableTypes } from '../useTournamentCreate'

export const getValidationScheme = (data: TournamentDetail, editables: EditableTypes): any => {
  let recruitMinDate = new Date()
  let recruitEndMinDate = new Date()
  let minStartDate = new Date()
  let minEndDate = new Date()
  if (!!data && !!data.attributes.status) {
    const beforeRecruit = TournamentHelper.checkStatus(data.attributes.status, 'recruiting')
    const beforeRecruitEnd = TournamentHelper.checkStatus(data.attributes.status, 'recruitment_closed')
    if (!beforeRecruit && data.attributes.acceptance_start_date) recruitMinDate = new Date(data.attributes.acceptance_start_date)
    if (!beforeRecruitEnd && data.attributes.acceptance_end_date) recruitEndMinDate = new Date(data.attributes.acceptance_end_date)

    if (!editables.start_date && data.attributes.start_date) minStartDate = new Date(data.attributes.start_date)
    if (!editables.end_date && data.attributes.end_date) minEndDate = new Date(data.attributes.end_date)
  }

  return Yup.object({
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 }))
        .min(2, i18n.t('common:common.at_least')),
      overview: Yup.string().max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 })),
      has_prize: Yup.boolean(),
      prize_amount: Yup.string().when('has_prize', {
        is: true,
        then: Yup.string()
          .required(i18n.t('common:common.input_required'))
          .max(40, i18n.t('common:common.validation.char_limit', { char_limit: 40 })),
      }),
      game_title_id: Yup.array().min(1, i18n.t('common:common.input_required')),
      game_hardware_id: Yup.number().min(1, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')).notOneOf([-1]),
    }),
    stepTwo: Yup.object({
      rule: Yup.string()
        .required(i18n.t('common:common.input_required'))
        .matches(/single|battle_royale/, { excludeEmptyString: false }),
      participant_type: Yup.number().min(1, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')).notOneOf([-1]),
      max_participants: Yup.number()
        .required(i18n.t('common:common.input_required'))
        .min(2, i18n.t('common:arena.participants_limit'))
        .max(128, i18n.t('common:arena.participants_limit'))
        .integer(i18n.t('common:common.integer')),
      terms_of_participation: Yup.string().max(190, i18n.t('common:common.validation.char_limit', { char_limit: 190 })),
      notes: Yup.string().max(191, i18n.t('common:common.validation.char_limit', { char_limit: 191 })),
    }),
    stepThree: Yup.object({
      start_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minStartDate, i18n.t('common:common.validation.min_date')),
      end_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(minEndDate, i18n.t('common:common.validation.min_date')),
      acceptance_start_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .min(recruitMinDate, i18n.t('common:common.validation.min_date')),
      acceptance_end_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.input_required'))
        .when('acceptance_start_date', {
          is: (acceptance_start_date) => {
            return acceptance_start_date === null
          },
          then: Yup.date().min(recruitEndMinDate, i18n.t('common:common.validation.min_date')),
        }),
      area_id: Yup.number().min(1, i18n.t('common:common.input_required')).integer(i18n.t('common:common.integer')).notOneOf([-1]),
      address: Yup.string().max(60, i18n.t('common:common.validation.char_limit', { char_limit: 60 })),
      // for cross-fields validations
      recruit_date: Yup.string().when(['acceptance_start_date'], {
        is: (acceptance_start_date) => {
          return acceptance_start_date && moment(acceptance_start_date) < moment(recruitMinDate)
        },
        then: Yup.string().required(i18n.t('common:common.validation.min_date')),
      }),
      acceptance_dates: Yup.string().when(['acceptance_start_date', 'acceptance_end_date'], {
        is: (acceptance_start_date, acceptance_end_date) => {
          return Date.parse(acceptance_start_date) >= Date.parse(acceptance_end_date)
        },
        then: Yup.string().required(i18n.t('common:common.validation.acceptance_dates')),
      }),
      acceptance_end_start_date: Yup.string().when(['acceptance_end_date', 'start_date'], {
        is: (acceptance_end_date, start_date) => {
          return Date.parse(acceptance_end_date) >= Date.parse(start_date)
        },
        then: Yup.string().required(i18n.t('common:common.validation.acceptance_end_start_date')),
      }),
      start_end_date: Yup.string().when(['start_date', 'end_date'], {
        is: (start_date, end_date) => {
          return Date.parse(start_date) >= Date.parse(end_date)
        },
        then: Yup.string().required(i18n.t('common:common.validation.start_end_date')),
      }),
    }),
    stepFour: Yup.object({
      organizer_name: Yup.string().max(190, i18n.t('common:common.validation.char_limit', { char_limit: 190 })),
    }),
  })
}

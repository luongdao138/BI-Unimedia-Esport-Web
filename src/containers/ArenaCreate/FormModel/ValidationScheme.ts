import i18n from '@locales/i18n'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { StoreType } from '@store/store'
import moment from 'moment'
import { TournamentCreateParams } from '@services/tournament.service'

export const getValidationScheme = (store: StoreType, data: TournamentCreateParams): any => {
  let recruitMinDate = new Date()
  let recruitEndMinDate = new Date()
  if (!!data && !!data.status) {
    const beforeRecruit = TournamentHelper.checkStatus(data.status, 'recruiting')
    const beforeRecruitEnd = TournamentHelper.checkStatus(data.status, 'recruitment_closed')
    if (!beforeRecruit && data.acceptance_start_date) recruitMinDate = new Date(data.acceptance_start_date)
    if (!beforeRecruitEnd && data.acceptance_end_date) recruitEndMinDate = new Date(data.acceptance_end_date)
  }

  return {
    stepOne: Yup.object({
      title: Yup.string()
        .required(i18n.t('common:common.required'))
        .max(50, i18n.t('common:common.too_long'))
        .min(2, i18n.t('common:common.at_least'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), (value) => CommonHelper.matchNgWords(store, value).length <= 0),
      overview: Yup.string()
        .max(190, i18n.t('common:common.too_long'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), (value) => CommonHelper.matchNgWords(store, value).length <= 0),
      game_title_id: Yup.array().min(1, i18n.t('common:common.required')),
      game_hardware_id: Yup.number().min(1, i18n.t('common:common.required')).integer(i18n.t('common:common.integer')),
      has_prize: Yup.boolean(),
      prize_amount: Yup.string().when('has_prize', {
        is: true,
        then: Yup.string().required(i18n.t('common:common.required')),
      }),
    }),
    stepTwo: Yup.object({
      max_participants: Yup.number()
        .min(2, i18n.t('common:common.required'))
        .max(128, i18n.t('common:common.required'))
        .integer(i18n.t('common:common.integer')),
      terms_of_participation: Yup.string()
        .max(190, i18n.t('common:common.too_long'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), (value) => CommonHelper.matchNgWords(store, value).length <= 0),
      notes: Yup.string()
        .max(190, i18n.t('common:common.too_long'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), (value) => CommonHelper.matchNgWords(store, value).length <= 0),
      participant_type: Yup.number()
        .min(1, i18n.t('common:common.required'))
        .max(10, i18n.t('common:common.too_long'))
        .integer(i18n.t('common:common.integer')),
      rule: Yup.string()
        .required(i18n.t('common:common.required'))
        .matches(/single|battle_royale/, { excludeEmptyString: false }),
    }),
    stepThree: Yup.object({
      start_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.required'))
        .min(new Date(), i18n.t('common:common.validation.min_date')),
      end_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.required'))
        .min(new Date(), i18n.t('common:common.validation.min_date')),
      acceptance_start_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.required'))
        .min(recruitMinDate, i18n.t('common:common.validation.min_date')),
      acceptance_end_date: Yup.date()
        .nullable()
        .required(i18n.t('common:common.required'))
        .min(recruitEndMinDate, i18n.t('common:common.validation.min_date')),
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
          return Date.parse(acceptance_end_date) > Date.parse(start_date)
        },
        then: Yup.string().required(i18n.t('common:common.validation.acceptance_end_start_date')),
      }),
      start_end_date: Yup.string().when(['start_date', 'end_date'], {
        is: (start_date, end_date) => {
          return Date.parse(start_date) >= Date.parse(end_date)
        },
        then: Yup.string().required(i18n.t('common:common.validation.start_end_date')),
      }),
      area_id: Yup.string().required(i18n.t('common:common.required')).max(60, i18n.t('common:common.too_long')),
      address: Yup.string()
        .max(60, i18n.t('common:common.too_long'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), (value) => CommonHelper.matchNgWords(store, value).length <= 0),
    }),
    stepFour: Yup.object({
      organizer_name: Yup.string()
        .max(190, i18n.t('common:common.too_long'))
        .test('ng-check', i18n.t('common:common.contains_ngword'), function (value) {
          return CommonHelper.matchNgWords(store, value).length <= 0
        }),
    }),
  }
}

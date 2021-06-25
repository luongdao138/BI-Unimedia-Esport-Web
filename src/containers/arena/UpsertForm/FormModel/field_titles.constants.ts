import i18n from '@locales/i18n'
import { Dialog } from '@store/common/actions/types'

export const ARENA_CREATE_VALIDATION_POPUP: Dialog = {
  title: i18n.t('common:arena.validation_popup.title'),
  message: i18n.t('common:arena.validation_popup.message'),
  actionMsg: i18n.t('common:arena.validation_popup.check_item'),
  actions: [{ name: i18n.t('common:arena.validation_popup.confirm'), action: 'confirm', type: 'primary' }],
}

export const FIELD_TITLES = {
  stepOne: {
    title: i18n.t('common:tournament_create.name'),
    overview: i18n.t('common:tournament_create.overview'),
    has_prize: i18n.t('common:tournament_create.has_prize'),
    prize_amount: i18n.t('common:tournament_create.has_prize'),
    game_title_id: i18n.t('common:tournament_create.game'),
    game_hardware_id: i18n.t('common:tournament_create.game_hardware'),
  },
  stepTwo: {
    max_participants: i18n.t('common:tournament_create.max_participants'),
    terms_of_participation: i18n.t('common:tournament_create.participation_term'),
    notes: i18n.t('common:tournament_create.precautions'),
    participant_type: i18n.t('common:tournament_create.participation'),
    rule: i18n.t('common:tournament_create.holding_format'),
  },
  stepThree: {
    start_date: i18n.t('common:tournament_create.holding_period'),
    end_date: i18n.t('common:tournament_create.holding_period'),
    acceptance_start_date: i18n.t('common:tournament_create.entry_period'),
    acceptance_end_date: i18n.t('common:tournament_create.entry_period'),
    recruit_date: i18n.t('common:tournament_create.entry_period'),
    acceptance_dates: i18n.t('common:tournament_create.entry_period'),
    acceptance_end_start_date: i18n.t('common:tournament_create.holding_period'),
    start_end_date: i18n.t('common:tournament_create.holding_period'),
    area_id: i18n.t('common:tournament_create.area'),
    area_name: i18n.t('common:tournament_create.area'),
  },
  stepFour: {
    organizer_name: i18n.t('common:tournament_create.organizer_name'),
  },
}

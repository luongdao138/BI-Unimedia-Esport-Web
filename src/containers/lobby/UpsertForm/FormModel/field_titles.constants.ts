import i18n from '@locales/i18n'

export const FIELD_TITLES = {
  stepOne: {
    title: i18n.t('common:tournament_create.name'),
    message: i18n.t('common:tournament_create.overview'),
    categories: i18n.t('common:tournament_create.category'),
    game_title_id: i18n.t('common:tournament_create.game'),
    game_hardware_id: i18n.t('common:tournament_create.game_hardware'),
    max_participants: i18n.t('common:tournament_create.max_participants'),
    is_organizer_join: i18n.t('common:tournament_create.is_organizer_join'),
  },
  stepTwo: {
    acceptance_start_date: i18n.t('common:tournament_create.entry_period'),
    acceptance_end_date: i18n.t('common:tournament_create.entry_period'),
    start_date: i18n.t('common:tournament_create.holding_period'),
    area_id: i18n.t('common:tournament_create.area'),
    address: i18n.t('common:tournament_create.area'),
    recruit_date: i18n.t('common:tournament_create.entry_period'),
    acceptance_dates: i18n.t('common:tournament_create.entry_period'),
    acceptance_end_start_date: i18n.t('common:tournament_create.holding_period'),
    start_end_date: i18n.t('common:tournament_create.holding_period'),
  },
}

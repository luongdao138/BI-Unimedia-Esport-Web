import { LobbyDetail } from '@services/lobby.service'
import { FormType } from './FormType'

export const getInitialValues = (data?: LobbyDetail): FormType => ({
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image_url : '',
    title: data ? data.attributes.title : '',
    message: data ? data.attributes.message : '',
    categories: data ? data.attributes.categories : [],
    game_title_id: data ? [data.attributes.game_title.data.attributes] : [],
    game_hardware_id: data ? data.attributes.game_hardware_id : -1,
    max_participants: data ? data.attributes.max_participants : 0,
    is_organizer_join: data ? /*data.attributes.is_organizer_join*/ true : false, // TODO
  },
  stepTwo: {
    acceptance_start_date: data ? data.attributes.entry_start_datetime : null,
    acceptance_end_date: data ? data.attributes.entry_end_datetime : null,
    start_date: data ? data.attributes.start_datetime : null,
    area_id: data ? data.attributes.area_id : -1,
    address: data ? data.attributes.address : '',
    recruit_date: '',
    acceptance_dates: '',
    acceptance_end_start_date: '',
    start_end_date: '',
  },
})

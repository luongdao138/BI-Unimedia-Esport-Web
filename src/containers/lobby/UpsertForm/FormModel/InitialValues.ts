import { LobbyDetail } from '@services/lobby.service'
import { FormType } from './FormType'

export const getInitialValues = (data?: LobbyDetail): FormType => ({
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image : '',
    title: data ? data.attributes.title : '',
    overview: data ? data.attributes.overview : '',
    categories: data ? [data.attributes.categories.data.attributes] : [],
    game_title_id: data ? [data.attributes.game_title.data.attributes] : [],
    game_hardware_id: data ? data.attributes.game_hardware.data.attributes.id : -1,
    max_participants: data ? data.attributes.max_participants : 0,
    is_organizer_join: data ? data.attributes.is_organizer_join : false,
  },
  stepTwo: {
    acceptance_start_date: data ? data.attributes.acceptance_start_date : null,
    acceptance_end_date: data ? data.attributes.acceptance_end_date : null,
    start_date: data ? data.attributes.start_date : null,
    area_id: data ? data.attributes.area_id : -1,
    address: data ? data.attributes.address : '',
    recruit_date: '',
    acceptance_dates: '',
    acceptance_end_start_date: '',
    start_end_date: '',
  },
})

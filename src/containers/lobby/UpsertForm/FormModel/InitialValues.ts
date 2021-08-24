import { LobbyDetail } from '@services/lobby.service'
import _ from 'lodash'
import { FormType } from './FormType'

export const getInitialValues = (data?: LobbyDetail): FormType => ({
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image_url : '',
    title: data ? data.attributes.title : '',
    message: data ? data.attributes.message : '',
    categories: data ? data.attributes.categories : [],
    game_title_id: _.get(data, 'attributes.game_title.data.attributes', []),
    game_hardware_id: _.get(data, 'attributes.game_hardware.data.attributes.id', -1),
    max_participants: data ? data.attributes.max_participants : 0,
    organizer_participated: data ? data.attributes.organizer_participated : false,
  },
  stepTwo: {
    entry_start_datetime: data ? data.attributes.entry_start_datetime : null,
    entry_end_datetime: data ? data.attributes.entry_end_datetime : null,
    start_datetime: data ? data.attributes.start_datetime : null,
    area_id: data ? data.attributes.area_id : -1,
    address: data ? data.attributes.address : '',
    recruit_date: '',
    acceptance_dates: '',
    acceptance_end_start_date: '',
    before_entry_end_date: '',
  },
})

import { TournamentDetail } from '@services/arena.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { FormType } from './FormType'

export const getInitialValues = (data?: TournamentDetail): FormType => ({
  stepOne: {
    title: data ? data.attributes.title : '',
    overview: data ? data.attributes.overview : '',
    cover_image_url: data ? data.attributes.cover_image : '',
    game_hardware_id: data ? data.attributes.game_hardware.data.attributes.id : -1,
    game_title_id: data ? [data.attributes.game_title.data.attributes] : [],
    has_prize: data ? data.attributes.has_prize : false,
    prize_amount: data ? data.attributes.prize_amount : '',
  },
  stepTwo: {
    rule: data ? data.attributes.rule : -1,
    sort_by: data ? data.attributes.sort_by : 'by_asc',
    has_third_place: data ? data.attributes.has_third_place : false,
    participant_type: data ? data.attributes.participant_type : -1,
    max_participants: data ? data.attributes.max_participants : 0,
    terms_of_participation: data ? data.attributes.terms_of_participation : '',
    t_type: data ? data.attributes.t_type : 't_public',
    notes: data ? data.attributes.notes : '',
    retain_history: data ? data.attributes.retain_history : true,
  },
  stepThree: {
    start_date: data ? data.attributes.start_date : null,
    end_date: data ? data.attributes.end_date : CommonHelper.startOfNextDay(),
    acceptance_start_date: data ? data.attributes.acceptance_start_date : CommonHelper.nearestFutureMinutes(5),
    acceptance_end_date: data ? data.attributes.acceptance_end_date : null,
    area_id: data ? data.attributes.area_id : 1,
    address: data ? data.attributes.address : '',
    // for cross-fields validations
    recruit_date: '',
    acceptance_dates: '',
    acceptance_end_start_date: '',
    start_end_date: '',
  },
  stepFour: {
    co_organizers: data ? data.attributes.co_organizers.data : [],
    organizer_name: data ? data.attributes.organizer_name : '',
  },
})

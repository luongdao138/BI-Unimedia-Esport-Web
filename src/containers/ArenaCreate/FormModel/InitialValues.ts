import { TournamentCreateParams } from '@services/tournament.service'

export const getInitialValues = (data: TournamentCreateParams): any => ({
  stepOne: {
    title: data.title,
    overview: data.overview,
    cover_image_url: data.cover_image_url,
    game_hardware_id: data.game_hardware_id,
    game_title_id: data.game_title_id,
    has_prize: data.has_prize,
    prize_amount: data.prize_amount,
  },
  stepTwo: {
    rule: data.rule,
    t_type: data.t_type,
    has_third_place: data.has_third_place,
    participant_type: data.participant_type,
    max_participants: data.max_participants,
    terms_of_participation: data.terms_of_participation,
    notes: data.notes,
    retain_history: data.retain_history,
  },
  stepThree: {
    acceptance_start_date: data.acceptance_start_date,
    acceptance_end_date: data.acceptance_end_date,
    start_date: data.start_date,
    end_date: data.end_date,
    area_id: data.area_id,
    area_name: data.area_name,
    // for cross-fields validations
    acceptance_dates: '',
    recruit_date: '',
    acceptance_end_start_date: '',
    start_end_date: '',
  },
  stepFour: {
    owner_id: data.owner_id,
    co_organizers: data.co_organizers,
    organizer_name: data.organizer_name,
  },
})

import { GameTitle } from '@services/game.service'
import { RecommendedUsers } from '@services/tournament.service'

type GameTitleItem = GameTitle['attributes']

export type FormType = {
  stepOne: {
    title: string
    cover_image_url: string
    has_prize: boolean
    prize_amount: string
    game_title_id: GameTitleItem[]
    game_hardware_id: number
    overview: string
  }
  stepTwo: {
    rule: string
    t_type: string
    has_third_place: boolean
    participant_type: number
    max_participants: number
    terms_of_participation: string
    notes: string
    retain_history: boolean
  }
  stepThree: {
    acceptance_start_date: string
    acceptance_end_date: string
    start_date: string
    end_date: string
    area_id: number
    area_name: string
    acceptance_dates: string
    recruit_date: string
    acceptance_end_start_date: string
    start_end_date: string
  }
  stepFour: {
    owner_id: number
    co_organizers: RecommendedUsers[]
    organizer_name: string
  }
}

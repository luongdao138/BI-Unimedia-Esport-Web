import { GameTitle } from '@services/game.service'

type GameTitleItem = GameTitle['attributes']

export type FormType = {
  stepOne: {
    cover_image_url: string
    title: string
    overview: string
    category_title_id: GameTitleItem[]
    game_title_id: GameTitleItem[]
    game_hardware_id: number
    max_participants: number
    is_organizer_join: boolean
  }
  stepTwo: {
    acceptance_start_date: string
    acceptance_end_date: string
    start_date: string
    area_id: number
    address: string
    recruit_date: string
    acceptance_dates: string
    acceptance_end_start_date: string
    start_end_date: string
  }
}

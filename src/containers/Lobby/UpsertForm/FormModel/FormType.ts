import { GameTitle } from '@services/game.service'
import { CategoryItem } from '@services/lobby.service'

type GameTitleItem = GameTitle['attributes']

export type FormType = {
  stepOne: {
    cover_image_url: string
    title: string
    message: string
    categories: CategoryItem['attributes'][]
    game_title_id: GameTitleItem[]
    game_hardware_id: number
    max_participants: number
    organizer_participated: boolean
  }
  stepTwo: {
    entry_start_datetime: string
    entry_end_datetime: string
    start_datetime: string
    area_id: number
    address: string
    recruit_date: string
    acceptance_dates: string
    acceptance_end_start_date: string
    before_entry_end_date: string
  }
}

import { GameTitle } from '@services/game.service'

type GameTitleItem = GameTitle['attributes']

export type FormType = {
  stepOne: {
    cover_image_url: string
    title: string
    overview: string
    game_title_id: GameTitleItem[]
    tag_title_id: GameTitleItem[]
    area_id: number
    address: string
    t_type: 't_public' | 't_private' | -1
    participation_approval: string
  }
}

import { CommunityFeature } from '@services/community.service'
import { GameTitle } from '@services/game.service'

type GameTitleItem = GameTitle['attributes']

export type FormType = {
  stepOne: {
    cover_image_url: string
    name: string
    overview: string
    game_titles: GameTitleItem[] | []
    features: CommunityFeature[] | []
    area_id: number
    address: string
    open_range: 0 | 1
    join_condition: 0 | 1
  }
}

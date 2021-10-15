import { INITIAL_VALUES } from '@constants/community.constants'
import { CommunityDetail } from '@services/community.service'
import { FormType } from './FormType'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInitialValues = (data: CommunityDetail, detailFeature?: any): FormType => ({
  // TODO change after data is done
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image_url : INITIAL_VALUES.COVER_IMAGE_URL,
    name: data ? data.attributes.name : INITIAL_VALUES.NAME,
    description: data ? data.attributes.description : INITIAL_VALUES.DESCRIPTION,
    open_range: data ? data.attributes.open_range : INITIAL_VALUES.OPEN_RANGE,
    join_condition: data ? data.attributes.join_condition : INITIAL_VALUES.JOIN_CONDITION,
    features: data ? detailFeature : INITIAL_VALUES.FEATURES,
    game_titles: data ? data.attributes.game_titles : INITIAL_VALUES.GAME_TITLES,
    area_id: data ? data.attributes.area_id : INITIAL_VALUES.AREA_ID,
    address: data ? data.attributes.address : INITIAL_VALUES.ADDRESS,
  },
})

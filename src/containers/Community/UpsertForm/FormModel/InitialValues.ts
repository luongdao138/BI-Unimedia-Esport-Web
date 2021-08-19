import { FormType } from './FormType'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInitialValues = (data): FormType => ({
  // TODO change after data is done
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image : '',
    name: data ? data.attributes.title : '',
    overview: data ? data.attributes.overview : '',
    open_range: data ? data.attributes.open_range : 0,
    join_condition: data ? data.attributes.join_condition : 1,
    features: data ? [data.attributes.tag_title.data.attributes] : [],
    game_titles: data ? [data.attributes.game_title.data.attributes] : [],
    area_id: data ? data.attributes.area_id : 0,
    address: data ? data.attributes.address : '',
  },
})

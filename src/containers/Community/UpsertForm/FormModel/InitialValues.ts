import { FormType } from './FormType'

export const getInitialValues = (data?: any): FormType => ({
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image : '',
    title: data ? data.attributes.title : '',
    overview: data ? data.attributes.overview : '',
    t_type: data ? data.attributes.overview : -1,
    tag_title_id: data ? [data.attributes.tag_title.data.attributes] : [],
    game_title_id: data ? [data.attributes.game_title.data.attributes] : [],
    game_hardware_id: data ? data.attributes.game_hardware.data.attributes.id : -1,
    area_id: data ? data.attributes.area_id : -1,
    address: data ? data.attributes.address : '',
  },
})

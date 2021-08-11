import { FormType } from './FormType'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInitialValues = (data): FormType => ({
  stepOne: {
    cover_image_url: data ? data.attributes.cover_image : '',
    title: data ? data.attributes.title : '',
    overview: data ? data.attributes.overview : '',
  },
})

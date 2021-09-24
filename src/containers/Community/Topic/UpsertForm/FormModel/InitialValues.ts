import { FormType } from './FormType'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getInitialValues = (data): FormType => ({
  stepOne: {
    title: data ? data.attributes.title : '',
    content: data ? data.attributes.content : '',
    attachments: data ? data.attributes.attachments : null,
  },
})

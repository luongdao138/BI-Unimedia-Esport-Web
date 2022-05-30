import i18n from '@locales/i18n'
import * as Yup from 'yup'

function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  return !!pattern.test(str)
}

export const validationTargetPerson = (): any => {
  const required_mess = i18n.t('common:streaming_gift_management.validation.require')
  const wrong_format_mess = i18n.t('common:streaming_gift_management.validation.input_incorrect')
  return Yup.object().shape({
    target_value: Yup.string().required(required_mess),
    target_name: Yup.string()
      .required(required_mess)
      .max(50, i18n.t('common:streaming_gift_management.validation.input_maximum'))
      .test('empty-check', wrong_format_mess, (val) => {
        if (val && val.length > 0 && val.trim().length === 0) return false
        return true
      }),
    sns_url: Yup.string()
      .required(required_mess)
      // .url(i18n.t('common:streaming_gift_management.validation.url_incorrect'))
      .test('empty-check', wrong_format_mess, (val) => {
        if (val && val.length > 0 && val.trim().length === 0) return false
        return true
      })
      .test('url-format-check', i18n.t('common:streaming_gift_management.validation.url_incorrect'), (val) => {
        return validURL(val)
      }),
    // TODO validate URL
  })
}

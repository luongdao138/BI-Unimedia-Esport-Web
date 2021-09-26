import i18n from '@locales/i18n'
import * as Yup from 'yup'
// eslint-disable-next-line no-irregular-whitespace
const isContainSpaceFullWidth = (string) => /　/.test(string);

export const validationPurchasePointScheme = (): any => {
  const required_mess = i18n.t('common:purchase_point_tab.validation.required')
  const wrong_format_mess = i18n.t('common:purchase_point_tab.validation.wrong_format')
  return Yup.object().shape({
    card_name: Yup.string()
      .required(required_mess)
      .test(
        'check_full_width_space',
        wrong_format_mess,
        (value) => !isContainSpaceFullWidth(value)
      )
      // validate katakana and alphabet hall-size
      .matches(/^[a-zA-Z0-9ｧ-ﾝﾞﾟ\s,-/]+$/g, wrong_format_mess),
    card_number: Yup.string()
      .required(required_mess)
      .transform((value) => {
        return value.replace(/\s/g, '')
      })
      .matches(/^[0-9]+$/g, wrong_format_mess)
      .min(14, wrong_format_mess)
      .max(16, wrong_format_mess),
    card_expire_date: Yup.string()
      .required(required_mess)
      .transform((value) => {
        return value.replace(/[\s/]/g, '')
      })
      // validate expire date
      .matches(/^(0[1-9]|1[0-2])([0-9]{2})$/g, wrong_format_mess)
      .length(4, wrong_format_mess),
    card_cvc: Yup.string()
      .required(required_mess)
      // validate alphabet number
      .matches(/^[0-9]+$/g, wrong_format_mess)
      .min(3, wrong_format_mess)
      .max(4, wrong_format_mess),
  })
}

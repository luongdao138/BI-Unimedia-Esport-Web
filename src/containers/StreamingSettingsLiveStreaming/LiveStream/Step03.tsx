import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
// import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import { RULES } from '@constants/tournament.constants'
import { useAppDispatch } from '@store/hooks'
import { useTranslation } from 'react-i18next'
import * as commonActions from '@store/common/actions'
import ESFastInput from '@components/FastInput'
import CoverUploaderStream from '@containers/arena/UpsertForm/Partials/CoverUploaderStream'

type ContentParams = {
  linkUrl: string
  title: string
  description: string
  cover_image_url: string
  listData: Array<string>
}
const Step03: React.FC = () => {
  // const onSubmitClicked = (): void => {}
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik<ContentParams>({
    initialValues: { linkUrl: 'https://cowell-web.exelab.jp/', title: '', description: '', cover_image_url: '', listData: [] },
    // validationSchema,
    onSubmit: () => {
      // onSubmitClicked(values)
    },
  })
  const handleUpload = useCallback(() => {
    // uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
    //   formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    // })
  }, [])
  const handleCopy = () => {
    if (values.linkUrl) {
      window.navigator.clipboard.writeText(values.linkUrl.toString())
    }
    dispatch(commonActions.addToast(t('common:arena.copy_toast')))
  }

  return (
    <Box>
      <Box pb={9} py={4} px={19}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="space-between">
            <Box flex={3}>
              <ESInput
                id="linkUrl"
                value={values.linkUrl}
                onChange={handleChange}
                placeholder={!values.linkUrl && i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_url')}
                labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_url')}
                onBlur={handleBlur}
                fullWidth
                helperText={touched.linkUrl && errors.linkUrl}
                error={touched.linkUrl && !!errors.linkUrl}
                rows={8}
                readOnly={true}
                size="big"
              />
            </Box>
            <Box py={1} display="flex" justifyContent="flex-end" className={classes.urlCopy} onClick={handleCopy}>
              <Icon className={`fa fa-link ${classes.link}`} fontSize="small" />
              <Typography>{t('common:streaming_settings_live_streaming_screen.copy_url')}</Typography>
            </Box>
          </Box>
          <Box paddingBottom={4} />
          <Box pb={4} px={10} className={classes.box}>
            <CoverUploaderStream
              src={values.cover_image_url}
              onChange={handleUpload}
              isUploading={false}
              disabled={false}
              size="big"
              // onOpenStateChange={handleCoverDailogStateChange}
            />
          </Box>
          <Box px={10} className={classes.box}>
            <ESInput
              id="title"
              required={true}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_title')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_title')}
              fullWidth
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.title && errors.title}
              error={touched.title && !!errors.title}
              size="big"
            />
          </Box>
          <Box paddingBottom={4} />
          <Box px={10} className={classes.box}>
            <ESFastInput
              id="description"
              multiline
              rows={8}
              placeholder={i18n.t('common:streaming_settings_live_streaming_screen.placeholder_input_description')}
              labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_description')}
              fullWidth
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.description && errors.description}
              error={touched.description && !!errors.description}
              size="big"
            />
          </Box>
          <Box paddingBottom={3} />
          <Box px={10} className={classes.box}>
            <ESSelect
              fullWidth
              name="stepTwo.rule"
              value={values.listData}
              onChange={handleChange}
              label={i18n.t('common:tournament_create.holding_format')}
              required={true}
              size="big"
              disabled={false}
            >
              <option disabled value={-1}>
                {i18n.t('common:please_select')}
              </option>
              {RULES.map((rule, index) => (
                <option key={index} value={rule.value}>
                  {rule.label}
                </option>
              ))}
            </ESSelect>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Step03
const useStyles = makeStyles(() => ({
  urlCopy: {
    marginLeft: 20,
    cursor: 'pointer',
    color: '#EB5686',
  },
  link: {
    marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  box: {
    paddingLeft: 0,
  },
}))

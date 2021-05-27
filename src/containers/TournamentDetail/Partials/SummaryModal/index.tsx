import React, { useEffect, useState } from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Typography, Box, makeStyles, Theme, IconButton, Icon, Divider } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import useSummary from './useSummary'
import ESLoader from '@components/FullScreenLoader'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESToast from '@components/Toast'
import CoverUploader from '@containers/ArenaCreate/Partials/CoverUploader'
import useUploadImage from '@utils/hooks/useUploadImage'
import { useStore } from 'react-redux'

interface SummaryModalProps {
  tournament: TournamentDetail
  open: boolean
  handleClose: () => void
}

const SummaryModal: React.FC<SummaryModalProps> = ({ tournament, open, handleClose }) => {
  const data = tournament.attributes
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [isUploading, setUploading] = useState(false)
  const store = useStore()
  const { summary, summaryMeta, resetSummaryMeta } = useSummary()
  const { uploadArenaSummaryImage } = useUploadImage()
  const validationSchema = Yup.object().shape({
    summary: Yup.string()
      .required(t('common:common.error'))
      .max(190, t('common:common.too_long'))
      .test('ng-check', 'match_ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const { handleChange, values, errors, touched, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      summary: data.summary,
      summary_image: data.summary_image,
    },
    validationSchema,
    onSubmit: (values) => {
      summary({ data: { summary_image_url: values.summary_image, value: values.summary }, hash_key: data.hash_key })
    },
  })

  useEffect(() => {
    if (summaryMeta.loaded || summaryMeta.error) {
      handleClose()
    }
  }, [summaryMeta.loaded, summaryMeta.error])

  const handleImageUpload = (file: File) => {
    setUploading(true)

    uploadArenaSummaryImage(file, 1, true, (imageUrl) => {
      setUploading(false)
      setFieldValue('summary_image', imageUrl)
    })
  }

  return (
    <Box>
      <ESModal open={open}>
        <BlankLayout>
          <Box paddingY={8} className={classes.childrenContainer}>
            <Box pt={2} pb={3} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:arena.summary_title')}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box pt={4}>
              <Typography>{data.title}</Typography>
            </Box>

            <Box width="100%" pb={4} pt={4}>
              <CoverUploader src={values.summary_image} onChange={handleImageUpload} isUploading={isUploading} />
            </Box>

            <Box width="100%" pb={1}>
              <ESInput
                id="summary"
                name="summary"
                labelPrimary={t('common:arena.summary')}
                fullWidth
                value={values.summary}
                onChange={handleChange}
                helperText={touched.summary && errors.summary}
                error={touched.summary && !!errors.summary}
                size="small"
              />
            </Box>

            <Box className={classes.stickyFooter}>
              <Box className={classes.nextBtnHolder}>
                <Box maxWidth={280} className={classes.buttonContainer}>
                  <ButtonPrimary type="submit" round fullWidth onClick={() => handleSubmit()}>
                    {t('common:arena.summary_submit')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>

      {summaryMeta.pending && <ESLoader open={summaryMeta.pending} />}
      {!!summaryMeta.error && <ESToast open={!!summaryMeta.error} message={t('common:error.failed')} resetMeta={resetSummaryMeta} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
}))

export default SummaryModal

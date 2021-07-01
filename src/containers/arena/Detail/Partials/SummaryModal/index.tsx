import React, { useEffect, useState } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Typography, Box, makeStyles, Theme, IconButton, Icon, Divider } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESFastInput from '@components/FastInput'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import useSummary from './useSummary'
import ESLoader from '@components/FullScreenLoader'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import CoverUploader from '@containers/arena/UpsertForm/Partials/CoverUploader'
import useUploadImage from '@utils/hooks/useUploadImage'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import _ from 'lodash'

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
  const { summary, summaryMeta } = useSummary()
  const { uploadArenaSummaryImage } = useUploadImage()
  const checkNgWord = useCheckNgWord()
  const dispatch = useAppDispatch()
  const validationSchema = Yup.object().shape({
    summary: Yup.string().required(t('common:common.required')).max(190, t('common:common.too_long')),
  })

  const { handleChange, handleBlur, values, errors, touched, setFieldValue, validateForm, handleSubmit } = useFormik({
    initialValues: {
      summary: data.summary,
      summary_image: data.summary_image,
    },
    validationSchema,
    onSubmit: (values) => {
      if (_.isEmpty(checkNgWord(values.summary))) {
        summary({ data: { summary_image_url: values.summary_image, value: values.summary }, hash_key: data.hash_key })
      } else {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.summary }))
      }
    },
  })

  useEffect(() => {
    validateForm()
  }, [])

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
              <ESFastInput
                id="summary"
                name="summary"
                labelPrimary={t('common:arena.summary')}
                fullWidth
                placeholder={t('common:tournament_create.please_enter')}
                value={values.summary}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.summary && errors.summary}
                error={touched.summary && !!errors.summary}
                size="small"
                multiline
                rows={7}
              />
            </Box>

            <Box className={classes.stickyFooter}>
              <Box className={classes.nextBtnHolder}>
                <Box maxWidth={280} className={classes.buttonContainer}>
                  <ButtonPrimary type="submit" disabled={!_.isEmpty(errors)} round fullWidth onClick={() => handleSubmit()}>
                    {t('common:arena.summary_submit')}
                  </ButtonPrimary>
                </Box>
              </Box>
            </Box>
          </Box>
        </BlankLayout>
      </ESModal>

      {summaryMeta.pending && <ESLoader open={summaryMeta.pending} />}
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

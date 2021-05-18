import { useEffect } from 'react'
import { Button, Box, Typography, Grid } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Input from '@components/Input'
import RadioVertical from '@components/RadioVertical'
import ESLoader from '@components/Loader'
import ESDialog from '@components/Dialog'
import ProfileAvatar from '@components/ProfileAvatar'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import useReport from './useReport'
import useReasons from './useReasons'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import * as Yup from 'yup'
import { REPORT_TYPE } from '@constants/common.constants'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
  target_id?: number
  user_email?: string
  msg_body?: string
  data?: any
  open?: boolean
  reportType: number
  handleClose?: () => void
}

const ESReport: React.FC<ESReportProps> = ({ data, target_id, room_id, chat_id, reportType, msg_body, open, handleClose }) => {
  const { createReport, meta } = useReport()
  const { reasons, fetchReasons } = useReasons()
  const { t } = useTranslation('common')

  useEffect(() => {
    fetchReasons({ page: 1 })
  }, [])

  const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .test('email-validation', t('common.error'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required(),
    description: Yup.string().required().max(1000, t('common.too_long')),
    reason_id: Yup.number()
      .test('reason_id', '', (value) => {
        return value !== -1
      })
      .required(),
  })

  const formik = useFormik<ReportParams>({
    initialValues: {
      description: '',
      reason_id: -1,
      report_type: 0,
      user_email: '',
    },
    validationSchema,
    onSubmit(values) {
      switch (reportType) {
        case REPORT_TYPE.CHAT:
          _.merge(values, { target_id: chat_id })
          _.merge(values, { chat_id: chat_id })
          _.merge(values, { room_id: room_id })
          _.merge(values, { message_body: msg_body })
          break
        default:
          _.merge(values, { target_id: target_id })
          break
      }
      _.merge(values, { report_type: reportType })

      createReport(values)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      handleClose()

      formik.resetForm()
    }
    if (!open) {
      formik.resetForm()
    }
  }, [meta.loaded])

  return (
    <div>
      <ESDialog title={t('user_report.title')} open={open} handleClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {data && (reportType == REPORT_TYPE.USER_LIST || reportType == REPORT_TYPE.CHAT) ? (
              <Grid container spacing={2}>
                <Grid item>
                  <ProfileAvatar src={data.attributes.avatar_url} editable={false} />
                </Grid>
                <Grid>
                  <Box mt={4}>
                    <Typography variant="h2">{data.attributes.nickname}</Typography>
                    <Typography variant="h2">{data.attributes.user_code}</Typography>
                    {msg_body ? <Typography>{msg_body}</Typography> : null}
                  </Box>
                </Grid>
              </Grid>
            ) : null}

            <Box mt={1}>
              <Typography>{t('user_report.desc_first')}</Typography>
              <Typography>{t('user_report.desc_second')}</Typography>
              <Typography>{t('user_report.desc_third')}</Typography>
            </Box>

            <Box mt={1}></Box>

            <RadioVertical
              id="reason_id"
              name="reason_id"
              value={formik.values.reason_id}
              onChange={formik.handleChange}
              required
              label={t('user_report.reason')}
            >
              {reasons.map((g, idx) => (
                <FormControlLabel key={idx} value={g.id} control={<Radio />} label={g.attributes.reason} />
              ))}
            </RadioVertical>

            <Box mt={1}></Box>
            <Input
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              labelPrimary={t('user_report.reason_desc')}
              placeholder={t('user_report.reason_desc')}
              fullWidth
              required
              error={!!formik.errors.description}
              multiline
              rows={4}
            />
            <Box mt={1}></Box>
            <Input
              id="user_email"
              name="user_email"
              value={formik.values.user_email}
              onChange={formik.handleChange}
              labelPrimary={t('user_report.reporter_email')}
              placeholder={t('user_report.reporter_email_placeholder')}
              fullWidth
              required
              error={!!formik.errors.user_email}
            />
            <Box mt={1}></Box>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button color="primary" type="submit" disabled={meta.pending}>
              {t('user_report.btn_text')}
            </Button>
            {meta.pending ? <ESLoader /> : null}
          </DialogActions>
        </form>
      </ESDialog>
    </div>
  )
}

export default ESReport

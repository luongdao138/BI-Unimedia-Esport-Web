import { useEffect, useState } from 'react'
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
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import * as Yup from 'yup'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
  target_id?: string
  user_email?: string
  msg_body?: string
  user?: any
}

const validationSchema = Yup.object().shape({
  user_email: Yup.string().required(),
  description: Yup.string().required(),
  reason_id: Yup.number().test('reason_id', '', (value) => {
    return value !== -1
  }),
})

const ESReport: React.FC<ESReportProps> = ({ user, target_id, room_id, msg_body }) => {
  const [open, setOpen] = useState(false)
  const { createReport, meta } = useReport()
  const { reasons, fetchReasons } = useReasons()
  const { t } = useTranslation('common')

  useEffect(() => {
    fetchReasons({ page: 1 })
  }, [])

  const formik = useFormik<ReportParams>({
    initialValues: {
      description: '',
      reason_id: -1,
      report_type: '',
      user_email: '',
    },
    validationSchema,
    onSubmit(values) {
      _.merge(values, { report_type: 'user' })
      _.merge(values, { target_id: target_id })
      _.merge(values, { room_id: room_id })
      _.merge(values, { msg_body: msg_body })

      createReport(values)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      setOpen(false)
      formik.resetForm()
    }
  }, [meta.loaded])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button type="button" onClick={handleClickOpen}>
        {t('user_report.title')}
      </Button>

      <ESDialog title={t('user_report.title')} open={open} handleClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {user ? (
              <Grid container spacing={2}>
                <Grid item>
                  <ProfileAvatar src={user.avatar} editable={false} />
                </Grid>
                <Grid>
                  <Box mt={4}>
                    <Typography>{user.nickname}</Typography>
                    <Typography>{user.user_code}</Typography>
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

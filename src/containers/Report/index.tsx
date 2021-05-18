import { useEffect, useState } from 'react'
import { Button, Box } from '@material-ui/core'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Input from '@components/Input'
import Select from '@components/Select'
import ESLoader from '@components/Loader'
import ESDialog from '@components/Dialog'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import useReport from './useReport'
import useReasons from './useReasons'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
  target_id?: string
  user_email?: string
  msg_body?: string
}

const ESReport: React.FC<ESReportProps> = ({ target_id, room_id, msg_body }) => {
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
            <Select
              id="reason_id"
              name="reason_id"
              value={formik.values.reason_id}
              onChange={formik.handleChange}
              fullWidth
              required
              error={!!formik.errors.reason_id}
              label={t('user_report.reason')}
            >
              <option disabled value={-1}>
                {t('please_select')}
              </option>
              {reasons.map((g, idx) => (
                <option key={idx} value={g.id}>
                  {g.attributes.reason}
                </option>
              ))}
            </Select>
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

import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@components/Select'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import useReport from './useReport'
import useReasons from './useReasons'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
}

const ESReport: React.FC<ESReportProps> = () => {
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
    },

    onSubmit(values) {
      _.merge(values, { report_type: 'user' })
      _.merge(values, { user_email: 'sample_email@email.com' })
      _.merge(values, { target_id: 'asdf_fasdf_89080' })

      createReport(values)
      setOpen(false)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      setOpen(true)
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
        Report
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="report-form-dialog-title">Report</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Select
              id="reason_id"
              name="reason_id"
              value={formik.values.reason_id}
              onChange={formik.handleChange}
              fullWidth
              required
              size="small"
              error={!!formik.errors.reason_id}
              label={t('profile.favorite_game.genre_label')}
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
            <TextField
              autoFocus
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              label="Description"
              fullWidth
            />
            <Button color="primary" type="submit" disabled={meta.pending}>
              Submit Report
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ESReport

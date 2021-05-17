import { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import useReport from './useReport'

export interface ESReportProps {
  user_id?: number
  chat_id?: string
  room_id?: string
}

const ESReport: React.FC<ESReportProps> = () => {
  const [open, setOpen] = useState(false)
  const { createReport, meta } = useReport()

  const formik = useFormik<ReportParams>({
    initialValues: {
      description: '',
    },

    onSubmit(values) {
      createReport(values)
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

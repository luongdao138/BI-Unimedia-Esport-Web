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
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import TextMessage from '@components/Chat/elements/TextMessage'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
  target_id?: number
  user_email?: string
  msg_body?: string
  data?: any
  open?: boolean
  reportType?: number
  handleClose?: () => void
  members?: any
}

const ESReport: React.FC<ESReportProps> = ({ data, target_id, room_id, chat_id, reportType, msg_body, open, handleClose, members }) => {
  const classes = useStyles()
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
      .required(t('common.required')),
    description: Yup.string().required(t('common.required')).max(1000, t('common.too_long')),
    reason_id: Yup.number()
      .test('reason_id', '', (value) => {
        return value !== -1
      })
      .required(t('common.required')),
  })

  const formik = useFormik<ReportParams>({
    initialValues: {
      description: '',
      reason_id: reasons[0] ? Number(reasons[0].id) : 1,
      report_type: 0,
      user_email: '',
    },
    enableReinitialize: true,
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
      <ESDialog
        title={t('user_report.title')}
        open={open}
        handleClose={() => {
          handleClose()
          formik.resetForm()
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogContent className={classes.dialogContent}>
            {data && (reportType == REPORT_TYPE.USER_LIST || reportType == REPORT_TYPE.CHAT) ? (
              <Grid container spacing={2}>
                <Grid item sm={2} xs={12}>
                  <ProfileAvatar src={data.attributes.avatar_url} editable={false} />
                </Grid>
                <Grid item sm={10} xs={12}>
                  <Box mt={4}>
                    <Typography className={classes.nickname}>{data.attributes.nickname}</Typography>
                    <Typography className={classes.userCode}>{data.attributes.user_code}</Typography>
                    {msg_body && CommonHelper.isMediaURL(msg_body) ? (
                      <Box className={classes.imgBox} height={100} width={100}>
                        <img src={msg_body} className={classes.img} />
                      </Box>
                    ) : (
                      <TextMessage members={members} text={msg_body} color={Colors.white} />
                    )}
                  </Box>
                </Grid>
              </Grid>
            ) : null}

            <Box mt={2}>
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
              helperText={formik.touched.reason_id && formik.errors.reason_id}
            >
              {reasons.map((g, idx) => (
                <FormControlLabel key={idx} value={Number(g.id)} control={<Radio color="primary" />} label={g.attributes.reason} />
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
              helperText={formik.touched.description && formik.errors.description}
              error={formik.touched.description && !!formik.errors.description}
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
              fullWidth
              required
              helperText={formik.touched.user_email && formik.errors.user_email}
              error={formik.touched.user_email && !!formik.errors.user_email}
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

const useStyles = makeStyles(() => ({
  message: {
    marginLeft: 15,
    fontSize: 14,
    color: Colors.white,
  },
  nickname: {
    marginLeft: 15,
    fontSize: 18,
    color: Colors.white,
  },
  userCode: {
    marginLeft: 15,
    fontSize: 16,
    color: Colors.white,
  },
  img: { width: '100%', height: 'auto' },
  imgBox: {
    margin: 10,
  },
  dialogContent: {
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      width: 0,
      height: 0,
    },
  },
}))

export default ESReport

import { useEffect } from 'react'
import { Box, Typography, Grid, FormControlLabel, DialogContent, DialogActions, Radio, Hidden } from '@material-ui/core'
import Input from '@components/Input'
import RadioVertical from '@components/RadioVertical'
import ESLoader from '@components/Loader'
import ESDialog from '@components/Dialog'
import ProfileAvatar from '@components/ProfileAvatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import { useStore } from 'react-redux'
import * as actions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
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
  const store = useStore()
  const dispatch = useAppDispatch()
  const { createReport, meta, userEmail } = useReport()
  const { reasons, fetchReasons } = useReasons()
  const { t } = useTranslation('common')
  const attr = data?.attributes

  useEffect(() => {
    fetchReasons({ page: 1 })
  }, [])

  const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .test('email-validation', t('common.error'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required(t('common.required'))
      .test('nickname', t('common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    description: Yup.string()
      .required(t('common.required'))
      .max(1000, t('common.too_long'))
      .test('nickname', t('common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
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
      user_email: userEmail ?? '',
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

  const reportInfo = () => {
    switch (reportType) {
      case REPORT_TYPE.USER_LIST:
      case REPORT_TYPE.CHAT:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.userInfoContainer}>
              <ProfileAvatar src={attr?.avatar_url} size={50} editable={false} alt={attr?.nickname} />
              <Grid item xs={9} className={classes.nameContainer}>
                <Typography className={classes.nickname}>{attr?.nickname}</Typography>
                <Typography className={classes.userCode}>@{attr?.user_code}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      case REPORT_TYPE.TOURNAMENT:
        return <Typography variant="h2">{data.attributes.title}</Typography>
      default:
        break
    }
  }

  useEffect(() => {
    if (meta.loaded && !meta.error) {
      handleClose()
      formik.resetForm()
      dispatch(actions.addToast(t('messages.report_sent')))
    } else if (meta.error) {
      dispatch(actions.addToast(t('error.failed')))
    }
    if (!open) {
      formik.resetForm()
    }
  }, [meta.loaded])

  return (
    <ESDialog
      title={t('user_report.title')}
      open={open}
      handleClose={() => {
        handleClose()
        formik.resetForm()
      }}
      className={'scroll-bar'}
      bkColor={'#2C2C2C'}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogContent className={classes.dialogContent}>
          {attr && reportInfo()}
          <Grid item sm={10} xs={12}>
            {msg_body && CommonHelper.isMediaURL(msg_body) ? (
              <Box className={classes.imgBox} height={100} width={100}>
                <img src={msg_body} className={classes.img} />
              </Box>
            ) : (
              <TextMessage members={members} text={msg_body} color={Colors.white} />
            )}
          </Grid>
          <Grid container style={{ marginTop: 24 }}>
            <Hidden xsDown smDown>
              <Box style={{ minWidth: 24 }}></Box>
            </Hidden>
            <Grid item md={10}>
              {/* xs={12} sm={12} md={10} lg={10} xl={10} */}
              <RadioVertical
                id="reason_id"
                name="reason_id"
                value={formik.values.reason_id + ''}
                onChange={formik.handleChange}
                required
                label={t('user_report.reason')}
                helperText={formik.touched.reason_id && formik.errors.reason_id}
              >
                {reasons.map((g, idx) => (
                  <FormControlLabel key={idx} value={g.id} control={<Radio color="primary" />} label={g.attributes.reason} />
                ))}
              </RadioVertical>

              <Box mt={4}>
                <Input
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  labelPrimary={t('user_report.reason_desc')}
                  placeholder={t('user_report.reason_desc')}
                  fullWidth
                  required
                  helperText={formik.errors.description}
                  error={!!formik.errors.description}
                  multiline
                  rows={4}
                />
              </Box>
              <Box mt={4} mb={2}>
                {userEmail ? (
                  <>
                    <Box display="flex" justifyContent="space-between" alignItems="center" pb={1} mb={1}>
                      <Box style={{ width: '100%' }} display="flex" alignItems="center">
                        <label className={classes.label}>{t('user_report.reporter_email')}</label>
                        <Typography component="span" className={classes.required}>
                          {t('common.required')}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography className={classes.staticMail}>{userEmail}</Typography>
                  </>
                ) : (
                  <Input
                    id="user_email"
                    name="user_email"
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    labelPrimary={t('user_report.reporter_email')}
                    fullWidth
                    required
                    helperText={formik.errors.user_email}
                    error={!!formik.errors.user_email}
                  />
                )}
              </Box>
              <label className={classes.label}>{t('user_report.email_required_text')}</label>
            </Grid>
          </Grid>
        </DialogContent>

        <Box mt={6} mb={2} className={classes.desc}>
          <Typography align="center">{t('user_report.desc_first')}</Typography>
          <Typography align="center">{t('user_report.desc_second')}</Typography>
        </Box>
        <DialogActions style={{ justifyContent: 'center' }}>
          <ButtonPrimary
            style={{ width: 280 }}
            type="submit"
            round
            disabled={(typeof formik.errors != undefined && !_.isEmpty(formik.errors)) || meta.pending}
          >
            {t('user_report.btn_text')}
          </ButtonPrimary>
          {meta.pending ? <ESLoader /> : null}
        </DialogActions>
      </form>
    </ESDialog>
  )
}

const useStyles = makeStyles((theme) => ({
  userInfoContainer: {
    backgroundColor: Colors.black,
    marginTop: 24,
    padding: 16,
    borderStyle: 'solid',
    borderColor: Colors.grey[400],
    borderRadius: 4,
    borderWidth: 0.5,
    display: 'flex',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 20,
  },
  desc: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: Colors.grey[400],
  },
  message: {
    marginLeft: 15,
    fontSize: 14,
    color: Colors.white,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  nickname: {
    fontSize: 18,
    color: Colors.white,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  userCode: {
    fontSize: 14,
    color: Colors.text[200],
  },
  staticMail: {
    fontSize: 16,
    color: Colors.grey[400],
  },
  img: { width: '100%', height: 'auto' },
  imgBox: {
    margin: 10,
  },
  dialogContent: {
    overflow: 'hidden',
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar-track': {
      '&::-webkit-box-shadow': 'none !important',
      backgroundColor: 'transparent',
      width: 0,
      height: 0,
    },
    '&::-webkit-scrollbar': {
      backgroundColor: 'transparent',
      width: '3px !important',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'transparent',
    },
  },
  label: {
    fontWeight: 'bold',
    fontSize: theme.typography.h3.fontSize,
  },
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
}))

export default ESReport

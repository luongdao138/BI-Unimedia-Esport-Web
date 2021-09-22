import { useEffect } from 'react'
import { Box, Typography, Grid, FormControlLabel, DialogActions, Radio, Hidden, IconButton, Icon, useTheme } from '@material-ui/core'
import Input from '@components/Input'
import RadioVertical from '@components/RadioVertical'
import ESLoader from '@components/Loader'
import ESDialog from '@components/Modal'
import ESStickyFooter from '@components/StickyFooter'
import Avatar from '@components/Avatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { ReportParams } from '@services/report.service'
import { useFormik } from 'formik'
import * as actions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import useReport from './useReport'
import useReasons from './useReasons'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import Yup from '@utils/Yup'
import { REPORT_TYPE } from '@constants/common.constants'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import BlankLayout from '@layouts/BlankLayout'

export interface ESReportProps {
  chat_id?: string
  room_id?: string
  target_id?: number | string
  user_email?: string
  msg_body?: string
  data?: any
  open?: boolean
  reportType?: number
  handleClose?: () => void
  members?: any
  title?: string
}

const ESReport: React.FC<ESReportProps> = ({ data, target_id, room_id, chat_id, title, reportType, msg_body, open, handleClose }) => {
  const _theme = useTheme()
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { checkNgWordByField } = useCheckNgWord()
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
      .required(t('common.input_required')),
    description: Yup.string().required(t('common.input_required')).max(1000),
    reason_id: Yup.number()
      .test('reason_id', '', (value) => {
        return value !== -1
      })
      .required(t('common.input_required')),
  })

  const emailAssigned = CommonHelper.hasEmail(userEmail)

  const formik = useFormik<ReportParams>({
    initialValues: {
      description: '',
      reason_id: null,
      report_type: 0,
      user_email: emailAssigned ? userEmail : '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit(values) {
      // const checked = checkNgWord([values.description, emailAssigned ? '' : values.user_email])
      const checkFields = { [t('user_report.reason_desc')]: values.description }
      if (!emailAssigned) {
        checkFields[t('user_report.email')] = values.user_email
      }
      const failedFields = checkNgWordByField(checkFields)

      if (_.isEmpty(failedFields)) {
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
      } else {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: failedFields.join(', ') }))
      }
    },
  })

  const renderTopic = (isComment?: boolean) => {
    return (
      <>
        <Box
          className={classes.userInfoContainer}
          flexDirection="column"
          style={{ alignItems: 'flex-start', marginTop: _theme.spacing(1) }}
        >
          <Box display="flex" mr={2} mb={2}>
            <Icon className={'fas fa-comment-alt'} fontSize="small" style={{ color: Colors.white, paddingTop: _theme.spacing(0.5) }} />
            <Box color={Colors.white} fontSize={14} ml={1}>
              {isComment ? t('topic_comment.report.chat_topic') : t('topic.report.chat_topic')}
            </Box>
          </Box>
          {isComment && (
            <Typography variant="body1" style={{ marginBottom: _theme.spacing(1) }}>
              {attr.number}
            </Typography>
          )}
          <Box display="flex" mb={2}>
            <Box ml={1}>
              <Avatar className={classes.topicAvatar} alt={attr.nickname} src={attr.avatar_image} />
            </Box>

            <Box className={classes.userInfoBox} ml={1} maxWidth="77%">
              <Typography variant="h3" style={{ color: Colors.white }}>
                {attr.nickname}
              </Typography>
              <Typography variant="body2">{'@' + attr.user_code}</Typography>
            </Box>
          </Box>

          <Box display="flex" mb={1} flexDirection="column">
            <Typography variant="body1" style={{ color: Colors.white_opacity[70] }}>
              {attr.date}
            </Typography>
            <Typography variant="body1">{attr.content}</Typography>
          </Box>
          {attr.image && (
            <Box>
              <img className={classes.imageBox} src={attr.image} />
            </Box>
          )}
        </Box>
      </>
    )
  }

  const reportInfo = () => {
    switch (reportType) {
      case REPORT_TYPE.USER_LIST:
      case REPORT_TYPE.CHAT:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.userInfoContainer}>
              <Avatar src={attr?.avatar_url} alt={attr?.nickname} />
              <Grid item xs={9} className={classes.nameContainer}>
                <Typography className={classes.nickname}>{attr?.nickname}</Typography>
                <Typography className={classes.userCode}>@{attr?.user_code}</Typography>
                {msg_body && CommonHelper.isMediaURL(msg_body) ? (
                  <Box className={classes.imgBox}>
                    <img src={msg_body} className={classes.img} />
                  </Box>
                ) : msg_body ? (
                  <Box className={classes.msgBox}>
                    <Typography className={classes.msg}>{msg_body}</Typography>
                  </Box>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        )
      case REPORT_TYPE.TOURNAMENT:
        return <Typography variant="h2">{data.attributes.title}</Typography>
      case REPORT_TYPE.COMMUNITY:
        return (
          <Box className={classes.userInfoContainer}>
            <Box display="flex" alignItems="center" mr={2}>
              <Icon className={`fas fa-users ${classes.communityIcon}`} />
            </Box>
            <Typography variant="h2" className={classes.wordBreak}>
              {data.attributes.name}
            </Typography>
          </Box>
        )
      case REPORT_TYPE.TOPIC:
        return (
          <>
            <Typography variant="body1" style={{ marginTop: _theme.spacing(2) }}>
              {t('topic.report.title')}
            </Typography>
            {renderTopic()}
          </>
        )
      case REPORT_TYPE.TOPIC_COMMENT:
        return (
          <>
            <Typography variant="body1" style={{ marginTop: _theme.spacing(2) }}>
              {t('topic_comment.report.title')}
            </Typography>
            {renderTopic(true)}
          </>
        )
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
      open={open}
      handleClose={() => {
        handleClose()
        formik.resetForm()
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <ESStickyFooter
          disabled={false}
          noScroll
          content={
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={2} className={classes.desc}>
                <Typography align="center">{t('user_report.desc_first')}</Typography>
                <Typography align="center">{t('user_report.desc_second')}</Typography>
              </Box>
              <DialogActions style={{ justifyContent: 'center' }}>
                <ButtonPrimary
                  style={{ width: 280 }}
                  type="submit"
                  round
                  disabled={
                    (typeof formik.errors != undefined && !_.isEmpty(formik.errors)) || meta.pending || _.isEmpty(formik.values.description)
                  }
                >
                  {t('user_report.btn_text')}
                </ButtonPrimary>
              </DialogActions>
            </Box>
          }
        >
          <BlankLayout>
            <Box pt={7.5} pb={9} className={classes.topContainer}>
              <Box py={2} display="flex" flexDirection="row" alignItems="center">
                <IconButton
                  className={classes.iconButtonBg}
                  onClick={() => {
                    handleClose()
                    formik.resetForm()
                  }}
                >
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">{title || t('user_report.title')}</Typography>
                </Box>
              </Box>
              <Box py={4}>{attr && reportInfo()}</Box>
              <Grid container>
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
                    size="small"
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
                  <Box mt={4} mb={1}>
                    {emailAssigned ? (
                      <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" pb={1}>
                          <Box style={{ width: '100%' }} display="flex" alignItems="center">
                            <Typography>{t('user_report.reporter_email')}</Typography>
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
            </Box>
            <Box className={classes.blankSpace}></Box>
          </BlankLayout>
        </ESStickyFooter>
      </form>
      {meta.pending ? (
        <Box className={classes.loader}>
          <ESLoader />
        </Box>
      ) : null}
    </ESDialog>
  )
}

const useStyles = makeStyles((theme) => ({
  wordBreak: {
    wordBreak: 'break-all',
  },
  topicAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  imageBox: {
    display: 'flex',
    transition: 'all 0.5s ease',
    borderRadius: 7,
    maxHeight: 300,
    maxWidth: 300,
    objectFit: 'contain',
  },

  userInfoContainer: {
    backgroundColor: Colors.black,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    borderStyle: 'solid',
    borderColor: Colors.grey[400],
    borderRadius: 4,
    borderWidth: 0.5,
    display: 'flex',
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 20,
    paddingRight: 10,
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
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  staticMail: {
    fontSize: 16,
    color: Colors.grey[400],
    wordBreak: 'break-word',
  },
  img: {
    width: 80,
    height: 'auto',
    objectFit: 'contain',
  },
  imgBox: {
    display: 'flex',
    maxHeight: 80,
    width: 80,
    marginTop: 10,
    backgroundColor: Colors.grey[400],
    justifyContent: 'center',
  },
  msg: {
    fontSize: 14,
    color: Colors.white,
  },
  msgBox: {
    display: 'flex',
    padding: 2,
    paddingLeft: 5,
    marginTop: 5,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  blankSpace: {
    height: 169,
  },
  label: {
    fontSize: 12,
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
  loader: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityIcon: {
    fontSize: 20,
    color: Colors.white,
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column',
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default ESReport

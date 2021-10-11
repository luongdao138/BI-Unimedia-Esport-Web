import { useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  DialogActions,
  Radio,
  Hidden,
  IconButton,
  Icon,
  useTheme,
  ButtonBase,
} from '@material-ui/core'
import Input from '@components/Input'
import RadioVertical from '@components/RadioVertical'
import ESLoader from '@components/Loader'
import ESDialog from '@components/Modal'
import ESStickyFooter from '@components/StickyFooter'
import ESLabel from '@components/Label'
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
import router from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'
import { SRLWrapper } from 'simple-react-lightbox'

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

  const toProfile = (user_code) => router.push(`${ESRoutes.PROFILE}/${user_code}`)

  const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .required(t('common.input_required'))
      .test('email-validation', t('user_report.email_test_result'), (value) => {
        return CommonHelper.validateEmail(value)
      }),
    description: Yup.string()
      .required(t('common.input_required'))
      .test('empty-check', t('user_report.email_test_result'), (val) => {
        if (val && val.length > 0 && val.trim().length === 0) return false
        return true
      })
      .max(5000),
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

  const renderClickableImage = (image_url: string, isPopOver?: boolean) => {
    return (
      <SRLWrapper options={LIGHTBOX_OPTIONS}>
        <img className={`${classes.imageBox} ${isPopOver && classes.popOverImage}`} src={image_url} />
      </SRLWrapper>
    )
  }

  const renderTopic = (isComment?: boolean) => {
    return (
      <>
        <Box
          className={classes.userInfoContainer}
          flexDirection="column"
          style={{ alignItems: 'flex-start', marginTop: _theme.spacing(1) }}
        >
          <Box display="flex" mr={2} mb={2} width="100%">
            <Icon className={'fas fa-comment-alt'} fontSize="small" style={{ color: Colors.white, paddingTop: _theme.spacing(0.5) }} />
            <Box color={Colors.white} fontSize={14} ml={1} width="calc(100% - 15px)">
              <Typography className={classes.topicEllipsis}>{attr.topic_title}</Typography>
            </Box>
          </Box>
          {isComment && (
            <Typography variant="body1" style={{ marginBottom: _theme.spacing(1) }}>
              {attr.number}
            </Typography>
          )}
          <Box display="flex" mb={2}>
            <ButtonBase onClick={() => toProfile(attr.user_code)} className={classes.topicAvatarWrap}>
              <Avatar className={classes.topicAvatar} alt={attr.nickname} src={attr.avatar_image} />
            </ButtonBase>

            <Box ml={1} maxWidth="100%">
              <Typography variant="h3" className={classes.topicEllipsis} style={{ color: Colors.white }}>
                {attr.nickname}
              </Typography>
              <Typography className={classes.topicEllipsis} variant="body2">
                {'@' + attr.user_code}
              </Typography>
            </Box>
          </Box>

          <Box display="flex" mb={1} flexDirection="column">
            <Typography variant="body1" style={{ color: Colors.white_opacity[70] }}>
              {attr.date}
            </Typography>
            <Typography variant="body1" className={classes.wordBreak}>
              {attr.content}
            </Typography>
          </Box>
          {attr.image && renderClickableImage(attr.image)}
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
          <>
            <ESLabel label={t('community.community_to_report')} size="small" />
            <Box className={classes.userInfoContainer}>
              <Box display="flex" alignItems="center" mr={2}>
                <Icon className={`fas fa-users ${classes.communityIcon}`} />
              </Box>
              <Typography variant="h2" className={classes.wordBreak}>
                {data.attributes.name}
              </Typography>
            </Box>
          </>
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
  const reportVideo = () => {
    return <Box className={classes.videoInfoContainer}>{data?.title && <Typography variant="h2">{data.title}</Typography>}</Box>
  }

  useEffect(() => {
    if (meta.loaded && !meta.error) {
      handleClose()
      formik.resetForm()
      switch (reportType) {
        case REPORT_TYPE.COMMUNITY:
          dispatch(actions.addToast(t('community.reported_community')))
          break
        case REPORT_TYPE.TOPIC:
          dispatch(actions.addToast(t('topic.report.reported_topic')))
          break
        case REPORT_TYPE.TOPIC_COMMENT:
          dispatch(actions.addToast(t('topic_comment.report.reported_comment')))
          break
        default:
          dispatch(actions.addToast(t('messages.report_sent')))
          break
      }
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
          noBottomSpace
          content={
            <Box display="flex" flexDirection="column" alignItems="center">
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
              <Box mt={8}>
                <Typography className={classes.desc}>{t('user_report.desc')}</Typography>
              </Box>
              <Box py={4}>{attr ? reportInfo : REPORT_TYPE.VIDEO_STREAM && reportVideo}</Box>
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
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      labelPrimary={t('user_report.reason_desc')}
                      placeholder={t('user_report.reason_desc_placeholder')}
                      fullWidth
                      required
                      helperText={formik.touched?.description && formik.errors.description}
                      error={formik.touched?.description && !!formik.errors.description}
                      multiline
                      rows={6}
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
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        labelPrimary={t('user_report.reporter_email')}
                        placeholder={t('user_report.reporter_email_placeholder')}
                        fullWidth
                        required
                        helperText={formik.touched?.user_email && formik.errors.user_email}
                        error={formik.touched?.user_email && !!formik.errors.user_email}
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
  topicEllipsis: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
  wordBreak: {
    wordBreak: 'break-all',
  },
  topicAvatarWrap: {
    '& > span': {
      borderRadius: '50%',
    },
  },
  popOverImage: {
    maxHeight: '50vh',
    objectFit: 'cover',
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
  videoInfoContainer: {
    backgroundColor: Colors.black,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
    color: Colors.grey[300],
    whiteSpace: 'pre-line',
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

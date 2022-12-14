import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { makeStyles, Theme, Typography, Box, useMediaQuery, useTheme } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import useReturnHref from '@utils/hooks/useReturnHref'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import useCommonData from './useCommonData'
import useTournamentCreate from './useTournamentCreate'
import ESLoader from '@components/FullScreenLoader'
import { useFormik } from 'formik'
import { FormType } from './FormModel/FormType'
import { getInitialValues } from './FormModel/InitialValues'
import { getValidationScheme } from './FormModel/ValidationScheme'
import { TournamentFormParams } from '@services/arena.service'
import { useRouter } from 'next/router'
import CancelDialog from './Partials/CancelDialog'
import StepTabs from './StepTabs'
import Confirm from './Confirm'
import i18n from '@locales/i18n'
import ESStickyFooter from '@components/StickyFooter'
import _ from 'lodash'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { FIELD_TITLES } from './FormModel/field_titles.constants'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { getAction } from '@store/common/selectors'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import useUnload from '@utils/hooks/useUnload'
import { TOURNAMENT_DIALOGS } from '@constants/tournament.constants'
import { useConfirm } from '@components/Confirm'

let activeTabIndex = 0

const TournamentCreate: React.FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const actionSelector = useAppSelector(getAction)
  const { hardwares, prefectures, user } = useCommonData()
  const { submit, update, showToast, meta, updateMeta, isEdit, arena, editables, resetUpdateMeta } = useTournamentCreate()
  const { handleReturn } = useReturnHref()
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [hasError, setError] = useState(true)
  const isFirstRun = useRef(true)
  const initialValues = useMemo(() => {
    return getInitialValues(isEdit ? arena : undefined)
  }, [isEdit, arena])
  const [isConfirm, setIsConfirm] = useState(false)
  const confirm = useConfirm()

  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()

  const formik = useFormik<FormType>({
    initialValues: initialValues,
    validationSchema: getValidationScheme(arena, editables, isEdit),
    enableReinitialize: true,
    onSubmit: (values) => {
      const selectedArea = prefectures?.data?.filter((a) => parseInt(`${a.id}`) === parseInt(`${values.stepThree.area_id}`))
      const data: TournamentFormParams = {
        ...values.stepOne,
        ...values.stepTwo,
        ...values.stepThree,
        ...values.stepFour,
        title: values.stepOne.title.trim(),
        co_organizers: values.stepFour.co_organizers.map((co) => parseInt(co.id)),
        game_title_id: _.get(values, 'stepOne.game_title_id[0].id'),
        area_name: selectedArea.length > 0 ? selectedArea[0].attributes.area : '',
      }
      if (isEdit) {
        update({ hash_key: router.query.hash_key.toString(), data })
      } else {
        submit(data)
      }
    },
  })

  const isChanged = !_.isEqual(formik.values, initialValues)

  useUnload(isChanged, formik.isSubmitting)

  useEffect(() => {
    if (updateMeta.error || meta.error) {
      setIsConfirm(false)
      resetUpdateMeta()
      if (_.get(updateMeta, 'error.code') === 422408) {
        showToast(i18n.t('common:tournament_create.end_time_invalid'))
      }
    }
  }, [updateMeta.error, meta.error])

  useEffect(() => {
    if (actionSelector === 'confirm') {
      setTab(activeTabIndex)
    }
  }, [actionSelector])

  useEffect(() => {
    activeTabIndex = 0
    setTab(0)
    formik.validateForm()
  }, [])

  useEffect(() => {
    if (arena) {
      formik.validateForm()
    }
  }, [arena])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    } else {
      const isRequiredFieldsValid = TournamentHelper.checkRequiredFields(formik.errors)
      setError(!isRequiredFieldsValid)

      if (isConfirm) {
        setIsConfirm(false)

        if (_.has(formik.errors, 'stepOne')) activeTabIndex = 0
        else if (_.has(formik.errors, 'stepTwo')) activeTabIndex = 1
        else if (_.has(formik.errors, 'stepThree')) activeTabIndex = 2
        else if (_.has(formik.errors, 'stepFour')) activeTabIndex = 3

        setTab(activeTabIndex)
      }
    }
  }, [formik.errors])

  const handleSetConfirm = () => {
    formik.validateForm().then(() => {
      const { stepOne, stepTwo, stepThree, stepFour } = formik.values

      const fieldIdentifier = checkNgWordFields({
        title: stepOne.title,
        overview: stepOne.overview,
        prize_amount: stepOne.prize_amount,
        terms_of_participation: stepTwo.terms_of_participation,
        notes: stepTwo.notes,
        address: stepThree.address,
        organizer_name: stepFour.organizer_name,
      })

      const ngFields = checkNgWordByField({
        [FIELD_TITLES.stepOne.title]: stepOne.title,
        [FIELD_TITLES.stepOne.overview]: stepOne.overview,
        [FIELD_TITLES.stepOne.prize_amount]: stepOne.prize_amount,
        [FIELD_TITLES.stepTwo.terms_of_participation]: stepTwo.terms_of_participation,
        [FIELD_TITLES.stepTwo.notes]: stepTwo.notes,
        [FIELD_TITLES.stepThree.address]: stepThree.address,
        [FIELD_TITLES.stepFour.organizer_name]: stepFour.organizer_name,
      })

      if (fieldIdentifier) {
        if (_.has(FIELD_TITLES.stepOne, fieldIdentifier)) activeTabIndex = 0
        else if (_.has(FIELD_TITLES.stepTwo, fieldIdentifier)) activeTabIndex = 1
        else if (_.has(FIELD_TITLES.stepThree, fieldIdentifier)) activeTabIndex = 2
        else if (_.has(FIELD_TITLES.stepFour, fieldIdentifier)) activeTabIndex = 3

        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
      } else {
        if (_.isEmpty(formik.errors)) {
          if (isConfirm) {
            formik.submitForm()
          } else {
            setIsConfirm(true)
          }
          return
        } else {
          if (isConfirm) {
            setIsConfirm(false)
          }
          if (_.has(formik.errors, 'stepOne')) activeTabIndex = 0
          else if (_.has(formik.errors, 'stepTwo')) activeTabIndex = 1
          else if (_.has(formik.errors, 'stepThree')) activeTabIndex = 2
          else if (_.has(formik.errors, 'stepFour')) activeTabIndex = 3

          setTab(activeTabIndex)
        }
      }
    })
  }

  const backFromConfirm = () => {
    if (_.has(formik.errors, 'stepOne')) setTab(0)
    else if (_.has(formik.errors, 'stepTwo')) setTab(1)
    else if (_.has(formik.errors, 'stepThree')) setTab(2)
    else if (_.has(formik.errors, 'stepFour')) setTab(3)
    setIsConfirm(false)
  }

  const handleUnsetConfirm = () => backFromConfirm()

  const handleTabChange = useCallback((value) => {
    setTab(value)
  }, [])

  const renderEditButton = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.editButtonContainer}>
        <ButtonPrimary onClick={handleSetConfirm} round className={`${classes.footerButton} ${classes.confirmButton}`} disabled={hasError}>
          {i18n.t('common:tournament_create.check_content_button')}
        </ButtonPrimary>
        <CancelDialog arena={arena} hashKey={`${router.query.hash_key}`} />
      </Box>
    )
  }

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const renderDescription = matches ? (
    <>
      <span style={{ fontSize: 12, display: 'block' }}>{i18n.t('common:tournament.discard.message_part1')}</span>
      <span style={{ fontSize: 12 }}>{i18n.t('common:tournament.discard.message_part2')}</span>
    </>
  ) : (
    <>
      <span style={{ fontSize: 12 }}>{i18n.t('common:tournament.discard.message')}</span>
    </>
  )

  const handleBack = () => {
    if (isConfirm) backFromConfirm()
    else if (isChanged) {
      confirm({ ...TOURNAMENT_DIALOGS.DISCARD_TOURNAMENT, description: renderDescription })
        .then(() => {
          handleReturn()
        })
        .catch(() => {
          /* ... */
        })
    } else {
      handleReturn()
    }
  }

  const getFirstError = () => {
    if (_.isEmpty(formik.errors)) {
      return null
    }
    if (_.isEmpty(formik.touched)) {
      return null
    }

    let msg = null as string | null
    if (!_.isObject(formik.errors)) return null
    const keys = Object.keys(formik.errors)
    if (keys[0]) {
      const fields = _.get(formik, `errors.${keys[0]}`)
      if (_.isObject(fields)) {
        const fieldKeys = Object.keys(fields)
        if (fieldKeys[0]) {
          const translationName = TournamentHelper.getLabelName(fieldKeys[0])
          const pleaseReviewMsg = i18n.t('common:tournament_create.please_review')
          msg = `???${i18n.t(translationName)}???${pleaseReviewMsg}`
        }
      }
    }
    if (!_.isString(msg)) return null
    return (
      <Box textAlign="center" style={isEdit ? { marginTop: 16 } : { marginBottom: 16 }} color={Colors.secondary} px={1}>
        <Typography variant="body2">{msg}</Typography>
      </Box>
    )
  }

  return (
    <ESStickyFooter
      disabled={false}
      noScroll
      noSpacing={isEdit && !isConfirm}
      noBottomSpace
      content={
        <>
          {isConfirm ? (
            <Box className={classes.reviewButtonContainer}>
              <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                {i18n.t('common:common.cancel')}
              </ButtonPrimary>
              <ButtonPrimary type="submit" onClick={handleSetConfirm} round disabled={hasError} className={classes.footerButton}>
                {isEdit ? i18n.t('common:tournament_create.edit') : i18n.t('common:tournament_create.submit')}
              </ButtonPrimary>
            </Box>
          ) : (
            <Box flexDirection="column" display="flex" justifyContent="center">
              {getFirstError()}
              {isEdit ? (
                renderEditButton()
              ) : (
                <ButtonPrimary
                  onClick={handleSetConfirm}
                  round
                  className={`${classes.footerButton} ${classes.confirmButton}`}
                  disabled={hasError}
                >
                  {i18n.t('common:tournament_create.check_content_button')}
                </ButtonPrimary>
              )}
            </Box>
          )}
        </>
      }
    >
      <>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleBack}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2" style={isConfirm ? { visibility: 'hidden' } : undefined}>
                {isEdit ? i18n.t('common:tournament_create.edit_title') : i18n.t('common:tournament_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            {isConfirm ? (
              <Confirm values={formik.values} hardwares={hardwares.data || []} user={user} prefectures={prefectures.data} isEdit={isEdit} />
            ) : (
              <>
                <StepTabs tab={tab} onTabChange={handleTabChange} />
                <Box py={4} className={classes.formContainer}>
                  {tab == 0 && <StepOne formik={formik} hardwares={hardwares} editables={editables} />}
                  {tab == 1 && <StepTwo formik={formik} editables={editables} />}
                  {tab == 2 && <StepThree formik={formik} prefectures={prefectures} editables={editables} />}
                  {tab == 3 && <StepFour formik={formik} user={user} editables={editables} />}
                </Box>
              </>
            )}
          </Box>
        </form>
        <ESLoader open={meta.pending || updateMeta.pending} />
      </>
    </ESStickyFooter>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  confirmButton: {},
  cancelButton: {},
  footerButton: {
    width: 'fit-content',
    alignSelf: 'center',
    minWidth: `220px !important`,
    paddingLeft: `${theme.spacing(4)}px !important`,
    paddingRight: `${theme.spacing(4)}px !important`,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&$confirmButton': {
      minWidth: `280px !important`,
    },
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
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
    textAlign: 'center',
  },
  reviewButtonContainer: {},
  editButtonContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topContainer: {
    paddingBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    reviewButtonContainer: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    cancelButton: {
      marginTop: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('md')]: {
    formContainer: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}))

export default TournamentCreate

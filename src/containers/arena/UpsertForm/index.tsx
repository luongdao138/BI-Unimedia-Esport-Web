import { useState, useEffect, useRef, useCallback } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
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
import { useStore } from 'react-redux'
import { TournamentFormParams } from '@services/arena.service'
import { useRouter } from 'next/router'
import CancelDialog from './Partials/CancelDialog'
import StepTabs from './StepTabs'
import Confirm from './Confirm'
import i18n from '@locales/i18n'
import ESStickyFooter from '@components/StickyFooter'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

const TournamentCreate: React.FC = () => {
  const router = useRouter()
  const store = useStore()
  const { hardwares, prefectures, user } = useCommonData()
  const { submit, update, meta, updateMeta, isEdit, arena, editables } = useTournamentCreate()
  const { handleReturn } = useReturnHref()
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [hasError, setError] = useState(true)
  const isFirstRun = useRef(true)
  const initialValues = getInitialValues(isEdit ? arena : undefined)
  const [isConfirm, setIsConfirm] = useState(false)
  const formik = useFormik<FormType>({
    initialValues: initialValues,
    validationSchema: getValidationScheme(store, arena),
    enableReinitialize: true,
    onSubmit: (values) => {
      const data: TournamentFormParams = {
        ...values.stepOne,
        ...values.stepTwo,
        ...values.stepThree,
        ...values.stepFour,
        co_organizers: values.stepFour.co_organizers.map((co) => parseInt(co.id)),
        game_title_id: values.stepOne.game_title_id[0].id,
      }
      if (isEdit) {
        update({ hash_key: router.query.hash_key.toString(), data })
      } else {
        submit(data)
      }
    },
  })

  useEffect(() => {
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
    }
  }, [formik.errors])

  const handleSetConfirm = () => setIsConfirm(true)
  const handleUnsetConfirm = () => setIsConfirm(false)

  const handleTabChange = useCallback((value) => {
    setTab(value)
  }, [])

  const renderEditButton = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.editButtonContainer}>
        <ButtonPrimary onClick={handleSetConfirm} round className={`${classes.footerButton} ${classes.confirmButton}`} disabled={hasError}>
          {i18n.t('common:tournament_create.check_content_button')}
        </ButtonPrimary>
        <CancelDialog hashKey={`${router.query.hash_key}`} />
      </Box>
    )
  }

  return (
    <ESStickyFooter
      disabled={false}
      noScroll
      noSpacing={isEdit}
      content={
        <>
          {isConfirm ? (
            <Box className={classes.reviewButtonContainer}>
              <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                {i18n.t('common:common.cancel')}
              </ButtonPrimary>
              <ButtonPrimary type="submit" round disabled={hasError} className={classes.footerButton}>
                {i18n.t('common:tournament_create.submit')}
              </ButtonPrimary>
            </Box>
          ) : isEdit ? (
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
        </>
      }
    >
      <>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2" style={isConfirm ? { visibility: 'hidden' } : undefined}>
                {i18n.t('common:tournament_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            {isConfirm ? (
              <Confirm values={formik.values} hardwares={hardwares.data || []} user={user} />
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

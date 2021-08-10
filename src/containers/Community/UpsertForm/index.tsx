import ESStickyFooter from '@components/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import { makeStyles, Theme, Box, IconButton, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import { useEffect, useRef, useState } from 'react'
import useReturnHref from '@utils/hooks/useReturnHref'
import StepOne from './StepOne'
import { useFormik } from 'formik'
import { getValidationScheme } from './FormModel/ValidationScheme'
// import { CommunityFormParams } from '@services/community.service'
import { FormType } from './FormModel/FormType'
import Confirm from './Confirm'
import { getInitialValues } from './FormModel/InitialValues'
import useCommunityCreate from './useCommunityCreate'
import { CommunityHelper } from '@utils/helpers/CommunityHelper'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { FIELD_TITLES } from './FormModel/field_titles.constants'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import DiscardDialog from './Partials/DiscardDialog'

const CommunityCreate: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { handleReturn } = useReturnHref()
  const [isConfirm, setIsConfirm] = useState(false)
  const [hasError, setHasError] = useState(true)
  const isFirstRun = useRef(true)
  const initialValues = getInitialValues(undefined)
  const { editables } = useCommunityCreate()
  const [isDiscard, setIsDiscard] = useState(false)

  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()

  const formik = useFormik<FormType>({
    initialValues: initialValues,
    validationSchema: getValidationScheme(),
    enableReinitialize: true,
    onSubmit: (/* values */) => {
      //
    },
  })

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    } else {
      const isRequiredFieldsValid = CommunityHelper.checkRequiredFields(formik.errors)
      setHasError(!isRequiredFieldsValid)
      if (isConfirm) {
        setIsConfirm(false)
      }
    }
  }, [formik.errors])

  const handleBack = () => {
    if (isConfirm) setIsConfirm(false)
    else isFirstRun.current ? null : setIsDiscard(true)
  }

  const handleSetConfirm = () => {
    formik.validateForm().then(() => {
      const { stepOne } = formik.values

      const fieldIdentifier = checkNgWordFields({
        title: stepOne.title,
        overview: stepOne.overview,
        address: stepOne.address,
      })

      const ngFields = checkNgWordByField({
        [FIELD_TITLES.stepOne.title]: stepOne.title,
        [FIELD_TITLES.stepOne.overview]: stepOne.overview,
        [FIELD_TITLES.stepOne.address]: stepOne.address,
      })

      if (fieldIdentifier) {
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
          setIsConfirm(false)
        }
      }
    })
  }

  const handleUnsetConfirm = () => setIsConfirm(false)

  return (
    <ESStickyFooter
      disabled={false}
      noScroll
      // noSpacing={isEdit && !isConfirm}
      content={
        <>
          {isConfirm ? (
            <Box className={classes.reviewButtonContainer}>
              <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                {i18n.t('common:common.cancel')}
              </ButtonPrimary>
              <ButtonPrimary type="submit" onClick={handleSetConfirm} round disabled={hasError} className={classes.footerButton}>
                {i18n.t('common:lobby_create.submit')}
              </ButtonPrimary>
            </Box>
          ) : (
            // ) : isEdit ? (
            //   renderEditButton()
            <ButtonPrimary
              onClick={handleSetConfirm}
              round
              className={`${classes.footerButton} ${classes.confirmButton}`}
              disabled={hasError}
            >
              {i18n.t('common:community_create.check_content')}
            </ButtonPrimary>
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
                {/* isEdit ? i18n.t('common:lobby_create.edit_title') : */ i18n.t('common:community_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            {isConfirm ? (
              <Confirm
                values={formik.values}
                hardwares={/* hardwares.data || */ []}
                user={/* user */ null}
                prefectures={/* prefectures.data */ null}
                isEdit={/* isEdit */ false}
              />
            ) : (
              <>
                <Box py={4} className={classes.formContainer}>
                  {<StepOne formik={formik} hardwares={/* hardwares */ null} editables={editables} />}
                </Box>
              </>
            )}
          </Box>
        </form>
        {/* <ESLoader open={meta.pending || updateMeta.pending} /> */}
      </>
      <DiscardDialog
        open={isDiscard}
        onClose={() => {
          setIsDiscard(false)
        }}
        onSubmit={handleReturn}
      />
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
export default CommunityCreate

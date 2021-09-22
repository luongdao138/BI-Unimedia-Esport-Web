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
import DiscardDialog from '../Partials/DiscardDialog'
import useCommonData from './useCommonData'
import CancelDialog from './Partials/CancelDialog'
import { useTranslation } from 'react-i18next'
import { CommunityFeature } from '@services/community.service'
import { GameTitle } from '@services/game.service'
import { useRouter } from 'next/router'
import * as commonActions from '@store/common/actions'

type CommunityCreateProps = {
  communityName?: string
}

const SUBMIT_TITLE_ERROR_MESSAGE = 'Validation failed: Name has already been taken'

const CommunityCreate: React.FC<CommunityCreateProps> = ({ communityName }) => {
  const dispatch = useAppDispatch()

  const { prefectures } = useCommonData()
  const classes = useStyles()
  const { handleReturn } = useReturnHref()
  const [isConfirm, setIsConfirm] = useState(false)
  const [hasError, setHasError] = useState(true)
  const isFirstRun = useRef(true)
  const {
    editables,
    isEdit,
    submit,
    update,
    getCommunityFeatures,
    community,
    getCreateCommunityMeta,
    getUpdateCommunityMeta,
    communityFeatures,
  } = useCommunityCreate()
  const [detailFeatures, setDetailFeatures] = useState([])
  const initialValues = getInitialValues(isEdit ? community : undefined, isEdit && detailFeatures)
  const [isDiscard, setIsDiscard] = useState(false)

  const [isAlreadyUsedTitle, setIsAlreadyUsedTitle] = useState(false)

  const { t } = useTranslation(['common'])
  const router = useRouter()

  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()

  const formik = useFormik<FormType>({
    initialValues: initialValues,
    validationSchema: getValidationScheme(),
    enableReinitialize: true,
    onSubmit: (values) => {
      const data = {
        ...values.stepOne,
        features: (values.stepOne.features as CommunityFeature[]).map((feature) => Number(feature.id)),
        game_titles: (values.stepOne.game_titles as GameTitle['attributes'][]).map((game) => game.id),
        join_condition: Number(values.stepOne.join_condition),
      }
      if (isEdit) {
        update({ hash_key: String(router.query.hash_key), data })
      } else {
        submit(data)
      }
    },
  })

  const isChanged = !_.isEqual(formik.values, initialValues)

  useEffect(() => {
    if (community) {
      formik.validateForm()
    }
  }, [community])

  useEffect(() => {
    if ((isEdit ? getUpdateCommunityMeta : getCreateCommunityMeta).error['message'] === SUBMIT_TITLE_ERROR_MESSAGE) {
      setIsAlreadyUsedTitle(true)
    } else if ((isEdit ? getUpdateCommunityMeta : getCreateCommunityMeta).error) {
      renderFailedDataToast()
    }
  }, [getCreateCommunityMeta, getUpdateCommunityMeta])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    } else {
      const isRequiredFieldsValid = CommunityHelper.checkCommunityRequiredFields(formik.errors)
      setHasError(_.has(formik.errors, 'stepOne') || !isRequiredFieldsValid)
      if (isConfirm) {
        setIsConfirm(false)
      }
    }
  }, [formik.errors])

  useEffect(() => {
    getCommunityFeatures()
    formik.validateForm()
  }, [])

  useEffect(() => {
    if (isEdit) {
      setDetailFeatures(
        _.filter(communityFeatures, (communityFeature) => {
          let isEqual = false
          _.map(community.attributes.features, (feature) => {
            if (feature.id === Number(communityFeature.id)) {
              isEqual = true
            }
          })
          if (isEqual) {
            return communityFeature
          }
        })
      )
    }
  }, [isEdit && communityFeatures])

  const renderFailedDataToast = () => {
    dispatch(commonActions.addToast(t('common:common.failed_to_get_data')))
  }

  const renderEditButton = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.editButtonContainer}>
        <ButtonPrimary
          onClick={handleSetConfirm}
          round
          className={`${classes.footerButton} ${classes.confirmButton}`}
          disabled={!isChanged || hasError}
        >
          {i18n.t('common:community_create.edit.check_edited_content')}
        </ButtonPrimary>
        <CancelDialog communityName={communityName} />
      </Box>
    )
  }

  const handleBack = () => {
    if (isConfirm) {
      setIsConfirm(false)
      setIsAlreadyUsedTitle(false)
    } else isChanged ? setIsDiscard(true) : handleReturn()
  }

  const handleSetConfirm = () => {
    formik.validateForm().then(() => {
      const { stepOne } = formik.values

      const fieldIdentifier = checkNgWordFields({
        name: stepOne.name,
        description: stepOne.description,
        address: stepOne.address,
      })

      const ngFields = checkNgWordByField({
        [FIELD_TITLES.stepOne.name]: stepOne.name,
        [FIELD_TITLES.stepOne.description]: stepOne.description,
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

  const handleUnsetConfirm = () => {
    setIsConfirm(false)
    setIsAlreadyUsedTitle(false)
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
            <Box className={classes.footerErrorContainer}>
              {isAlreadyUsedTitle && (
                <Box textAlign="center" style={{ marginBottom: 16 }} color={Colors.secondary} px={1}>
                  <Typography variant="body2">{i18n.t('common:community_create.title_already_in_use')}</Typography>
                </Box>
              )}
              <Box className={classes.reviewButtonContainer}>
                <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                  {i18n.t('common:common.cancel')}
                </ButtonPrimary>
                <ButtonPrimary type="submit" onClick={handleSetConfirm} round disabled={hasError} className={classes.footerButton}>
                  {isEdit ? i18n.t('common:community_create.confirm.submit_edit') : i18n.t('common:community_create.confirm.submit')}
                </ButtonPrimary>
              </Box>
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
              <Typography variant="h2">
                {isConfirm
                  ? isEdit
                    ? i18n.t('common:community_create.confirm.title_edit')
                    : i18n.t('common:community_create.confirm.title')
                  : isEdit
                  ? i18n.t('common:community_create.edit.title')
                  : i18n.t('common:community_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            {isConfirm ? (
              <Confirm values={formik.values} prefectures={prefectures.data || null} />
            ) : (
              <>
                <Box py={4} className={classes.formContainer}>
                  {<StepOne formik={formik} prefectures={prefectures || null} editables={editables} />}
                </Box>
              </>
            )}
          </Box>
        </form>
      </>
      <DiscardDialog
        open={isDiscard}
        onClose={() => {
          setIsDiscard(false)
        }}
        onSubmit={handleReturn}
        title={isEdit ? t('common:community_create.discard.edit_title') : t('common:community_create.discard.title')}
        description={isEdit ? t('common:community_create.discard.edit_message') : t('common:community_create.discard.message')}
        confirmTitle={isEdit ? t('common:community_create.discard.edit_confirm') : t('common:community_create.discard.confirm')}
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
  footerErrorContainer: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.up('md')]: {
    formContainer: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}))
export default CommunityCreate

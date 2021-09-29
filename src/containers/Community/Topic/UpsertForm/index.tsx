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
import useTopicCreate from './useTopicCreate'
import { CommunityHelper } from '@utils/helpers/CommunityHelper'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import { useAppDispatch } from '@store/hooks'
import { FIELD_TITLES } from './FormModel/field_titles.constants'
import { showDialog } from '@store/common/actions'
import DiscardDialog from '../../Partials/DiscardDialog'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import { TopicParams } from '@services/community.service'
import { useRouter } from 'next/router'
import useDocTitle from '@utils/hooks/useDocTitle'

const TopicCreate: React.FC = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const { handleReturn } = useReturnHref()
  const [isConfirm, setIsConfirm] = useState(false)
  const [hasError, setHasError] = useState(true)
  const isFirstRun = useRef(true)
  const initialValues = getInitialValues(undefined)
  const { submit } = useTopicCreate()
  const [isDiscard, setIsDiscard] = useState(false)
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const { changeTitle } = useDocTitle()

  changeTitle(t('common:page_head.community_topic_default_title'))
  const { checkNgWordFields, checkNgWordByField } = useCheckNgWord()

  const formik = useFormik<FormType>({
    initialValues: initialValues,
    validationSchema: getValidationScheme(),
    enableReinitialize: true,
    onSubmit: (values) => {
      const data: TopicParams = {
        ...values.stepOne,
        community_hash: String(router.query.hash_key),
      }
      if (submit) {
        submit(data)
      }
    },
  })

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    } else {
      const isRequiredFieldsValid = CommunityHelper.checkTopicRequiredFields(formik.errors)
      setHasError(!isRequiredFieldsValid)
      if (isConfirm) {
        setIsConfirm(false)
      }
    }
  }, [formik.errors])

  const handleBack = () => {
    if (isConfirm) setIsConfirm(false)
    else _.isEqual(formik.values, initialValues) ? handleReturn() : setIsDiscard(true)
  }

  const handleSetConfirm = () => {
    formik.validateForm().then(() => {
      const { stepOne } = formik.values

      const fieldIdentifier = checkNgWordFields({
        title: stepOne.title,
        overview: stepOne.content,
      })

      const ngFields = checkNgWordByField({
        [FIELD_TITLES.stepOne.title]: stepOne.title,
        [FIELD_TITLES.stepOne.content]: stepOne.content,
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
      noBottomSpace
      content={
        <>
          {isConfirm ? (
            <Box className={classes.reviewButtonContainer}>
              <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                {i18n.t('common:common.cancel')}
              </ButtonPrimary>
              <ButtonPrimary type="submit" onClick={handleSetConfirm} round disabled={hasError} className={classes.footerButton}>
                {i18n.t('common:community_create.confirm.submit')}
              </ButtonPrimary>
            </Box>
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
      <Box className={isConfirm ? classes.containerConfirm : classes.container}>
        <Box pt={7.5} pb={9} className={isConfirm ? classes.topContainerConfirm : classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleBack}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">
                {isConfirm ? i18n.t('common:topic_create.confirm') : i18n.t('common:topic_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            {isConfirm ? (
              <Confirm values={formik.values} />
            ) : (
              <>
                <Box py={4} className={classes.formContainer}>
                  {<StepOne formik={formik} />}
                </Box>
              </>
            )}
          </Box>
        </form>
      </Box>
      <DiscardDialog
        open={isDiscard}
        onClose={() => {
          setIsDiscard(false)
        }}
        onSubmit={handleReturn}
        title={t('common:topic_create.discard.title')}
        description={t('common:topic_create.discard.message')}
        confirmTitle={t('common:topic_create.discard.confirm')}
      />
    </ESStickyFooter>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: 66,
    marginRight: 66,
  },
  containerConfirm: {
    marginLeft: 0,
    marginRight: 0,
  },
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
  topContainerConfirm: {
    paddingBottom: 0,
    marginLeft: 66,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
      marginLeft: 0,
      marginRight: 0,
    },
    containerConfirm: {
      paddingTop: theme.spacing(4),
      marginLeft: 0,
      marginRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    topContainerConfirm: {
      paddingTop: 0,
      paddingBottom: 0,
      marginLeft: 0,
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
export default TopicCreate

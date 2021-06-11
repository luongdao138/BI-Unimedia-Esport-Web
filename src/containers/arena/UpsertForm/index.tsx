import { useState, useEffect, useRef } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESTabs from '@components/Tabs'
import ESTab from '@components/Tab'
import ButtonPrimary from '@components/ButtonPrimary'
import useReturnHref from '@utils/hooks/useReturnHref'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import useCommonData from './useCommonData'
import useTournamentCreate from './useTournamentCreate'
import ESLoader from '@components/FullScreenLoader'
import _ from 'lodash'
import { useFormik } from 'formik'
import { FormType } from './FormModel/FormType'
import { getInitialValues } from './FormModel/InitialValues'
import { getValidationScheme } from './FormModel/ValidationScheme'
import { useStore } from 'react-redux'
import { TournamentFormParams } from '@services/arena.service'
import { useRouter } from 'next/router'

import Confirm from './Confirm'

const TournamentCreate: React.FC = () => {
  const router = useRouter()
  const store = useStore()
  const { hardwares, prefectures, user } = useCommonData()
  const { submit, update, meta, updateMeta, isEdit, arena, editables } = useTournamentCreate()
  const { handleReturn } = useReturnHref()
  const { t } = useTranslation(['common'])
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
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    } else {
      setError(!_.isEmpty(formik.errors))
    }
  }, [formik.errors])

  const handleSetConfirm = () => setIsConfirm(true)
  const handleUnsetConfirm = () => setIsConfirm(false)

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2" style={isConfirm ? { visibility: 'hidden' } : undefined}>
                {t('common:tournament_create.title')}
              </Typography>
            </Box>
          </Box>
          {isConfirm ? null : <Box className={classes.spacingBorder} />}
          {isConfirm ? (
            <Confirm values={formik.values} hardwares={hardwares.data || []} user={user} />
          ) : (
            <>
              <Box pt={8} className={classes.container}>
                <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
                  <ESTab className={classes.tabMin} label={t('common:tournament_create.tab1')} value={0} />
                  <ESTab className={classes.tabMin} label={t('common:tournament_create.tab2')} value={1} />
                  <ESTab className={classes.tabMin} label={t('common:tournament_create.tab3')} value={2} />
                  <ESTab className={classes.tabMin} label={t('common:tournament_create.tab4')} value={3} />
                </ESTabs>
              </Box>
              <Box py={4} className={classes.formContainer}>
                {tab == 0 && <StepOne formik={formik} hardwares={hardwares} editables={editables} />}
                {tab == 1 && <StepTwo formik={formik} editables={editables} />}
                {tab == 2 && <StepThree formik={formik} prefectures={prefectures} editables={editables} />}
                {tab == 3 && <StepFour formik={formik} user={user} editables={editables} />}
              </Box>
            </>
          )}
        </Box>
        <Box className={classes.stickyFooter}>
          <Box className={classes.nextBtnHolder}>
            {isConfirm ? (
              <>
                <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={classes.footerButton}>
                  キャンセル
                </ButtonPrimary>
                <ButtonPrimary type="submit" round disabled={hasError} className={classes.footerButton}>
                  この内容で作成する
                </ButtonPrimary>
              </>
            ) : (
              <ButtonPrimary
                onClick={handleSetConfirm}
                round
                className={`${classes.footerButton} ${classes.confirmButton}`}
                disabled={hasError}
              >
                内容を確認する
              </ButtonPrimary>
            )}
          </Box>
        </Box>
      </form>
      <ESLoader open={meta.pending || updateMeta.pending} />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  confirmButton: {},
  footerButton: {
    marginBottom: theme.spacing(1),
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
  nextBtnHolder: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  tabMin: {
    minWidth: 56,
  },
  tabs: {
    borderBottom: `1px solid ${Colors.text[300]}`,
  },
  spacingBorder: {
    borderBottom: `1px solid ${Colors.text[300]}`,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    spacingBorder: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
    },
    tabs: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
    },
    nextBtnHolder: {
      flexDirection: 'column-reverse',
      marginBottom: theme.spacing(3),
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

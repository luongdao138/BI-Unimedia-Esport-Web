import { Box, Typography, makeStyles, Theme, Icon } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import CardDeleteConfirmModal from '@containers/PointManage/PurchasePoint/CardDeleteConfirmModal'
import StepThree from './StepThree'

interface DonatePointsProps {
  modal: boolean
  setShowModal: (value: boolean) => void
}
const DonatePoints: React.FC<DonatePointsProps> = ({ modal, setShowModal }) => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  const [step, setStep] = useState(1)
  const [typeStepTwo, setTypeStepTwo] = useState(null)
  const [isShowDeleteCardModal, setIsShowDeleteCardModal] = useState(false)
  const cards = [
    {
      number: 'xxxx xxxx xxxx 4256',
    },
    {
      number: 'xxxx xxxx xxxx 4256',
    },
  ]

  const onCloseModal = () => {
    setShowModal(false)
  }
  useEffect(() => {
    setStep(1)
  }, [])
  const deleteCard = (): void => {
    setIsShowDeleteCardModal(true)
  }
  const onNextStep = (new_step: number): void => {
    setStep(new_step)
  }
  const onClickPurchaseMissingPoints = () => {
    setTypeStepTwo('missing_point')
    setStep(2)
  }
  const onClickPurchaseNewPoints = () => {
    setTypeStepTwo('new_point')
    setStep(2)
  }
  const onClickBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  return (
    <Box className={classes.container}>
      <ESModal open={modal} handleClose={() => setShowModal(false)}>
        <Box className={classes.dialogContainer}>
          <Box className={step === 2 ? classes.closeModalContainerTwo : classes.closeModalContainer}>
            {step === 2 && (
              <Box className={classes.buttonBack} onClick={onClickBack}>
                <Icon className={`fa fa-arrow-left ${classes.iconBack}`} />
              </Box>
            )}
            <Box className={classes.buttonClose} onClick={onCloseModal}>
              <Icon className={`fa fa-times ${classes.iconClose}`} fontSize="small" />
            </Box>
          </Box>
          <Box textAlign="center">
            <Typography className={classes.title}>{i18n.t('common:donate_points.purchase_points')}</Typography>
          </Box>
          <Box className={classes.stepContainer}>
            <Box className={classes.stepItemContainer}>
              <Box className={step === 1 ? classes.stepViewActive : classes.stepViewNotActive}>
                <Typography className={step === 1 ? classes.textStepActive : classes.textStepNotActive}>{'1'}</Typography>
              </Box>
              <Box pt={1}>
                <Typography className={step === 1 ? classes.detailTextStepActive : classes.detailTextStepNotActive}>
                  {i18n.t('common:donate_points.step_one_points')}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.stepItemContainer}>
              <Box className={step === 2 ? classes.stepViewActive : classes.stepViewNotActive}>
                <Typography className={step === 2 ? classes.textStepActive : classes.textStepNotActive}>{'2'}</Typography>
              </Box>
              <Box pt={1}>
                <Typography className={step === 2 ? classes.detailTextStepActive : classes.detailTextStepNotActive}>
                  {i18n.t('common:donate_points.step_two_purchase')}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.stepItemContainer}>
              <Box className={step === 3 ? classes.stepViewActive : classes.stepViewNotActive}>
                <Typography className={step === 3 ? classes.textStepActive : classes.textStepNotActive}>{'3'}</Typography>
              </Box>
              <Box pt={1}>
                <Typography className={step === 3 ? classes.detailTextStepActive : classes.detailTextStepNotActive}>
                  {i18n.t('common:donate_points.step_three_complete')}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className={classes.contentContainer}>
            {/* Step One */}
            <Box className={classes.stepOneContainer}>
              {step === 1 && (
                <StepOne
                  myPoints={400}
                  missingPoints={2200}
                  onLeftButton={onClickPurchaseMissingPoints}
                  onRightButton={onClickPurchaseNewPoints}
                />
              )}
            </Box>
            {/* Step Two */}
            <Box className={classes.stepTwoContainer}>
              {step === 2 && (
                <StepTwo
                  setTypeStepTwo={setTypeStepTwo}
                  type={typeStepTwo}
                  step={step}
                  cards={cards}
                  onNext={onNextStep}
                  deleteCard={deleteCard}
                  missingPoints={2200}
                />
              )}
            </Box>
            {/* Step Three */}
            <Box className={classes.stepThreeContainer}>{step === 3 && <StepThree myPoints={300} missingPoints={2200} />}</Box>
          </Box>
        </Box>
      </ESModal>
      {isShowDeleteCardModal && (
        <CardDeleteConfirmModal
          open={isShowDeleteCardModal}
          handleClose={() => {
            setIsShowDeleteCardModal(false)
          }}
        />
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: 754,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginTop: 114,
    margin: '0 auto',
  },
  closeModalContainerTwo: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    width: '100%',
  },
  closeModalContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 16,
    width: '100%',
  },
  buttonBack: {
    display: 'flex',
    position: 'relative',
    height: 36,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    paddingRight: 24,
  },
  iconBack: {
    fontSize: 14,
  },
  buttonClose: {
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: '#4D4D4D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  iconClose: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  stepContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: 51,
  },
  stepItemContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  stepViewActive: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'white',
  },
  stepViewNotActive: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#707070',
  },
  detailTextStepActive: {
    color: 'white',
    textAlign: 'center',
  },
  detailTextStepNotActive: {
    color: '#707070',
    textAlign: 'center',
  },
  textStepActive: {
    fontSize: 20,
    color: 'black',
  },
  textStepNotActive: {
    fontSize: 20,
    color: '#707070',
  },
  stepOneContainer: {
    width: '100%',
    marginTop: 60,
  },
  stepTwoContainer: {
    width: '100%',
  },
  stepThreeContainer: {},
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: '0 auto',
  },
  [theme.breakpoints.down(415)]: {
    dialogContainer: {
      width: '100%',
      marginTop: 24,
    },
    closeModalContainer: {
      paddingRight: 0,
    },
    closeModalContainerTwo: {
      paddingRight: 0,
    },
    buttonBack: {
      paddingLeft: 0,
    },
    stepContainer: {
      paddingTop: 24,
    },
    stepOneContainer: {
      paddingTop: 0,
    },
  },
}))
export default DonatePoints

import { Box, Typography, makeStyles, Theme, Icon } from '@material-ui/core'
import React, { useState } from 'react'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'
import Stage1 from './Stage1'
import Stage2 from './Stage2'
import Stage3 from './Stage3'
import Head from 'next/head'
interface DonatePointsProps {
  myPoint: number
  lackedPoint: number
  showModalPurchasePoint: boolean
  setShowModalPurchasePoint: (value: boolean) => void
}
const DonatePoints: React.FC<DonatePointsProps> = ({
  showModalPurchasePoint,
  setShowModalPurchasePoint,
  lackedPoint,
  myPoint,
}) => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  const [stage, setStage] = useState(1)
  const [isBuyNewPoint, setIsBuyNewPoint] = useState(false)
  const stages = [
    {
      value: 1,
      label: i18n.t('common:donate_points.step_one_points'),
    },
    {
      value: 2,
      label: i18n.t('common:donate_points.step_two_purchase'),
    },
    {
      value: 3,
      label: i18n.t('common:donate_points.step_three_complete'),
    },
  ]

  const onCloseModal = () => {
    setShowModalPurchasePoint(false)
  }

  const onClickPurchaseLackedPoint = () => {
    setIsBuyNewPoint(false)
    setStage(2)
  }
  const onClickPurchaseNewPoints = () => {
    setIsBuyNewPoint(true)
    setStage(2)
  }
  const onClickBack = () => {
    if (stage === 2) {
      setStage(1)
    }
  }

  const onChangeStage = (nextStage) => {
    if (nextStage) {
      setStage(nextStage)
    }
  }

  return (
    <Box className={classes.container}>
      <Head>
        <script src={process.env.NEXT_PUBLIC_GMO_ENDPOINT}></script>
      </Head>
      <ESModal open={showModalPurchasePoint} handleClose={() => setShowModalPurchasePoint(false)}>
        <Box className={classes.dialogContainer}>
          {/* button back stage and close modal */}
          <Box className={stage === 2 ? classes.closeModalContainerTwo : classes.closeModalContainer}>
            {stage === 2 && (
              <Box className={classes.buttonBack} onClick={onClickBack}>
                <Icon className={`fa fa-arrow-left ${classes.iconBack}`} />
              </Box>
            )}
            <Box className={classes.buttonClose} onClick={() => onCloseModal()}>
              <Icon className={`fa fa-times ${classes.iconClose}`} fontSize="small" />
            </Box>
          </Box>

          {/* title purchase point */}
          <Box textAlign="center">
            <Typography className={classes.title}>{i18n.t('common:donate_points.purchase_points')}</Typography>
          </Box>

          {/* all stages */}
          <Box className={classes.stepContainer}>
            {stages.map((stage_item) => {
              return (
                <Box className={classes.stepItemContainer} key={stage_item.value}>
                  <Box className={stage === stage_item.value ? classes.stepViewActive : classes.stepViewNotActive}>
                    <Typography className={stage === stage_item.value ? classes.textStepActive : classes.textStepNotActive}>
                      {stage_item.value}
                    </Typography>
                  </Box>
                  <Box pt={1}>
                    <Typography className={stage === stage_item.value ? classes.detailTextStepActive : classes.detailTextStepNotActive}>
                      {stage_item.label}
                    </Typography>
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Box className={classes.contentContainer}>
            {/* Stage 1 */}
            {stage === 1 && (
              <Box className={classes.stepOneContainer}>
                <Stage1
                  myPoints={myPoint}
                  lackedPoint={lackedPoint}
                  onClickPurchaseLackedPoint={onClickPurchaseLackedPoint}
                  onClickPurchaseNewPoints={onClickPurchaseNewPoints}
                />
              </Box>
            )}
            {/* Stage 2 */}
            {stage === 2 && (
              <Box className={classes.stepTwoContainer}>
                <Stage2 isBuyNewPoint={isBuyNewPoint} lackedPoint={lackedPoint} onChangeStage={onChangeStage} />
              </Box>
            )}
            {/* Stage 3 */}
            {stage === 3 && (
              <Box className={classes.stepThreeContainer}>
                <Stage3 />
              </Box>
            )}
          </Box>
        </Box>
      </ESModal>
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
  [theme.breakpoints.down(769)]: {
    dialogContainer: {
      padding: '0 24px',
    },
  },
  [theme.breakpoints.down(415)]: {
    dialogContainer: {
      width: '100%',
      marginTop: 40,
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

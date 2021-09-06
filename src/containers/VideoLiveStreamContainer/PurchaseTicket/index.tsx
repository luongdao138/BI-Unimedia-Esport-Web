import { Box, Typography, makeStyles, Theme, Icon } from '@material-ui/core'
import React from 'react'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'
import PointCardItem from '@components/PointCardItem'
// import usePurchaseTicketSuperChat from './usePurchaseTicket'

interface DonatePointsModalProps {
  myPoints: any
  donatedPoints: number
  showModalPurchasePoint: boolean
  setShowModalPurchasePoint: (value: boolean) => void
}
const PurchaseTicketSuperChat: React.FC<DonatePointsModalProps> = ({
  showModalPurchasePoint,
  setShowModalPurchasePoint,
  donatedPoints,
  myPoints,
}) => {
  const classes = useStyles()
  // const {
  //   myPointsData,
  //   meta_purchase_ticket_super_chat,
  //   purchaseTicketSuperChat,
  //   dataPurchaseTicketSuperChat,
  // } = usePurchaseTicketSuperChat()

  const onCloseModal = () => {
    setShowModalPurchasePoint(false)
  }
  const onClickPurchaseTicket = () => {
    // const params = {
    //   user_id: 1,
    //   point: donatedPoints,
    //   type: 1,
    //   video_id: '',
    // }
    // purchaseTicketSuperChat(params)
  }

  return (
    <Box className={classes.container}>
      <ESModal open={showModalPurchasePoint} handleClose={onCloseModal}>
        <Box className={classes.dialogContainer}>
          {/* button close modal */}
          <Box className={classes.closeModalContainer}>
            <Box className={classes.buttonClose} onClick={onCloseModal}>
              <Icon className={`fa fa-times ${classes.iconClose}`} fontSize="small" />
            </Box>
          </Box>
          {/* title purchase ticket */}
          <Box textAlign="center">
            <Typography className={classes.title}>{i18n.t('common:donate_points.title_purchase_ticket')}</Typography>
          </Box>
          {/* Content */}
          <Box width="100%">
            <PointCardItem titleText={i18n.t('common:donate_points.my_points')} points={myPoints} pointText={'eXePoint'} />
            <PointCardItem titleText={i18n.t('common:donate_points.missing_points')} points={donatedPoints} pointText={'eXePoint'} />
            <PointCardItem titleText={i18n.t('common:donate_points.my_points')} points={myPoints - donatedPoints} pointText={'eXePoint'} />
          </Box>
          {/* Button */}
          <Box className={classes.buttonRootContainer}>
            <Box className={classes.buttonContainer} onClick={onClickPurchaseTicket}>
              <Typography className={classes.buttonTextStyle}>{i18n.t('common:donate_points.purchase_missing_points')}</Typography>
            </Box>
          </Box>
        </Box>
      </ESModal>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: '0 auto',
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
  // closeModalContainerTwo: {
  //   position: 'relative',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingRight: 16,
  //   width: '100%',
  // },
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
export default PurchaseTicketSuperChat

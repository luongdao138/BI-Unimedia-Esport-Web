import { Box, Typography, makeStyles, Theme, Icon } from '@material-ui/core'
import React from 'react'
import ESModal from '@components/Modal'
import i18n from '@locales/i18n'
import PointCardItem from '@components/PointCardItem'
import ButtonPrimary from '@components/ButtonPrimary'
// import usePurchaseTicketSuperChat from '../usePurchaseTicket'

interface PurchaseTicketSuperChatProps {
  myPoints: any
  donatedPoints: number
  showModal: boolean
  setShowModal: (value: boolean) => void
  handlePurchaseTicket: () => void
}
const PurchaseTicketSuperChat: React.FC<PurchaseTicketSuperChatProps> = ({
  showModal,
  setShowModal,
  donatedPoints,
  myPoints,
  handlePurchaseTicket,
}) => {
  const classes = useStyles()
  const onCloseModal = () => {
    setShowModal(false)
  }
  const onClickPurchaseTicket = () => {
    handlePurchaseTicket()
  }

  return (
    <Box className={classes.container}>
      <ESModal open={showModal} handleClose={onCloseModal}>
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
          <Box className={classes.contentContainer}>
            <PointCardItem titleText={i18n.t('common:donate_points.my_points')} points={myPoints} pointText={'eXePoint'} />
            <PointCardItem
              titleText={i18n.t('common:donate_points.title_required_points')}
              points={donatedPoints}
              pointText={'eXePoint'}
              minus={true}
            />
            <PointCardItem
              titleText={i18n.t('common:donate_points.title_points_left_after_purchase')}
              points={myPoints - donatedPoints}
              pointText={'eXePoint'}
            />
          </Box>
          {/* Button */}
          <Box className={classes.actionButton}>
            <ButtonPrimary type="submit" round fullWidth onClick={onClickPurchaseTicket}>
              {i18n.t('common:donate_points.purchase_ticket_button_text')}
            </ButtonPrimary>
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
  closeModalContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 16,
    width: '100%',
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
    '&:hover': {
      cursor: 'pointer',
    },
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
    margin: '0 auto',
  },
  buttonRootContainer: {
    marginTop: 63,
  },
  actionButton: {
    marginTop: 63,
    '& .MuiButtonBase-root.button-primary.full-width': {
      width: 220,
    },
  },
  [theme.breakpoints.down(415)]: {
    dialogContainer: {
      width: '100%',
      marginTop: 24,
      paddingLeft: 16,
      paddingRight: 16,
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
  },
}))
export default PurchaseTicketSuperChat

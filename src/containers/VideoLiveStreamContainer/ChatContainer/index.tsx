import { Box, Typography, makeStyles, Icon, Button, OutlinedInput, IconButton, Input, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState } from 'react'
import i18n from '@locales/i18n'

type ChatContainerProps = {
  onPressDonate?: () => void
  onCloseChatPanel?: () => void
}
const purchasePoints = {
  p_50: {
    id: 'p_50',
    value: 50,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    width: 65.5,
  },
  p_160: {
    id: 'p_160',
    value: 160,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    width: 65.5,
  },
  p_320: {
    id: 'p_320',
    value: 320,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    width: 65.5,
  },
  p_700: {
    id: 'p_700',
    value: 700,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    width: 65.5,
  },
  p_1500: {
    id: 'p_1500',
    value: 1500,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    width: 90,
  },
  p_2500: {
    id: 'p_2500',
    value: 2500,
    backgroundColor: '#9147F9',
    borderColor: '#9147F9',
    width: 90,
  },
  p_5000: {
    id: 'p_5000',
    value: 5000,
    backgroundColor: '#C91315',
    borderColor: '#C91315',
    width: 90,
  },
  p_10000: {
    id: 'p_10000',
    value: 10000,
    backgroundColor: '#C91315',
    borderColor: '#C91315',
    width: 188.5,
  },
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate, onCloseChatPanel }) => {
  // const { t } = useTranslation('common')
  const [chatInput, setChatInput] = useState<string>('')
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>('')

  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseComment(e.target.value)
  }

  const getPurchasePointList = () => Object.values(purchasePoints)

  const getChatData = () =>
    Array(30)
      .fill('')
      .map((_, i) => ({
        id: i,
        user: 'Account Name',
        content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
      }))

  const purchaseInfoDialog = () => (
    <Box className={classes.purchaseDialogContainer}>
      <Box className={classes.purchaseDialogContent}>
        <Typography className={classes.dialogTitle}>{i18n.t('common:live_stream_screen.premium_comment')}</Typography>
        <Box className={classes.purchaseCommentInputContainer}>
          <Input
            id="comment"
            multiline
            rows={4}
            placeholder={i18n.t('common:live_stream_screen.please_enter_a_comment')}
            fullWidth
            value={purchaseComment}
            onChange={onCommentChange}
            disableUnderline
            classes={{ root: classes.purchaseCommentRoot }}
          />
          <Typography className={classes.purchaseCommentTextLimit}>{`${purchaseComment.length} / 120`}</Typography>
        </Box>
        <Box className={classes.pointList}>
          <Box className={classes.pointListRow1}>
            {getPurchasePointList()
              .slice(0, isMobile ? 7 : 8)
              .map((item) => {
                const itemSelected = item.id === purchaseValueSelected
                return (
                  <Box
                    onClick={() => {
                      setPurchaseValueSelected(item.id)
                    }}
                    key={item.id}
                    className={`${classes[item.id]} ${classes.purchaseItem} ${itemSelected ? '' : classes.purchaseItemUnselected}`}
                  >
                    <Typography className={classes.purchaseItemText}>{item.value.toString()}</Typography>
                  </Box>
                )
              })}
          </Box>
        </Box>
        <Button onClick={onPressDonate} className={classes.purchaseButton}>
          <Typography className={classes.purchaseButtonText}>{i18n.t('common:live_stream_screen.send')}</Typography>
        </Button>
        <Box className={classes.dialogFooter}>
          <Typography className={classes.totalPointText}>{'所有ポイント：5,500 eXeポイント'}</Typography>
          <Typography className={classes.purchasePointText}>{i18n.t('common:live_stream_screen.purchase_points')}</Typography>
        </Box>
      </Box>
      <img src="/images/ic_down_triangle.svg" className={classes.downTriangle} />
    </Box>
  )

  const purchaseIconClick = () => {
    setPurchaseDialogVisible(!purchaseDialogVisible)
  }

  const chatInputComponent = () => (
    <Box className={classes.chatInputMobileContainer}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      <Box className={classes.chatInputContainer}>
        {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
        <IconButton onClick={purchaseIconClick} className={classes.iconPurchase}>
          <img src="/images/ic_purchase.svg" />
        </IconButton>
        <Box className={classes.chatBox}>
          <OutlinedInput
            autoComplete="off"
            onChange={onChange}
            placeholder={'チャットを送信'}
            id={'search'}
            value={chatInput}
            classes={{ root: classes.input, input: classes.chatTextInput }}
            margin="dense"
          />
          <Button className={classes.iconButtonBg}>
            <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
          </Button>
        </Box>
      </Box>
    </Box>
  )

  const chatBoardComponent = () => (
    <Box className={classes.chatBoardContainer}>
      <Box className={classes.chatBoard}>
        {getChatData().map((message) => {
          const { user, content, id } = message
          return (
            <Typography key={id} className={classes.chatMessage}>
              <span className={classes.chatMessageUser}>{`${user}: `}</span>
              {content}
            </Typography>
          )
        })}
      </Box>
      {chatInputComponent()}
    </Box>
  )
  const getUserWatchingList = () =>
    Array(20)
      .fill('')
      .map((_, i) => ({
        id: i,
        user_avatar: '/images/dataVideoFake/fake_avatar.png',
      }))

  return (
    <Box className={classes.container}>
      {!isMobile && (
        <Box className={classes.chatHeader}>
          <IconButton onClick={onCloseChatPanel} className={classes.headerIcon}>
            <img src="/images/ic_collapse_right.svg" />
          </IconButton>
          <Typography className={classes.headerTitle}>{'チャット'}</Typography>
        </Box>
      )}
      <Box className={classes.chatContent}>
        <Box className={classes.userWatchingList}>
          {getUserWatchingList().map(({ id, user_avatar }) => (
            <Box key={id} className={classes.userWatchingItem}>
              <img src={user_avatar} />
            </Box>
          ))}
        </Box>
        <Box className={classes.accountInfo}>
          <Box className={classes.accountInfoHeader}>
            <Typography className={classes.accountName}>{'AccountName'}</Typography>
            <Typography className={classes.accountRemain}>{'50'}</Typography>
            <Typography className={classes.accountRemainUnit}>{'eXeポイント'}</Typography>
          </Box>
          <Box className={classes.accountInfoContent}>
            <Typography className={classes.accountInfoContentText}>
              {'ここにはコメントが入ります。ここにはコメントが入ります。ここにはコメントが入ります。ここにはコメントが入ります。'}
            </Typography>
          </Box>
        </Box>
        {chatBoardComponent()}
      </Box>
      {/*<Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer} onClick={onPressDonate}>*/}
      {/*  <ButtonPrimary type="submit" round fullWidth>*/}
      {/*    {'Donate Points'}*/}
      {/*  </ButtonPrimary>*/}
      {/*</Box>*/}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 482,
  },
  purchaseCommentInputContainer: {
    width: '100%',
    marginTop: 12,
    backgroundColor: '#212121',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    borderRadius: 4,
  },
  purchaseCommentTextLimit: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 10,
  },
  pointListRow1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  totalPointText: {
    fontSize: 10,
  },
  purchasePointText: {
    fontSize: 10,
    textDecoration: 'underline',
  },
  dialogFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  purchaseButton: {
    backgroundColor: '#FF4786',
    width: '100%',
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  purchaseDialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  purchaseDialogContent: {
    padding: 16,
    backgroundColor: '#4D4D4D',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  chatBoard: {
    overflow: 'auto',
    height: 525,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 13,
    paddingBottom: 111,
  },
  chatBoardContainer: {
    position: 'relative',
  },
  chatMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  chatMessageUser: {
    fontSize: 14,
    color: '#FF4786',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
  },
  label: {
    textAlign: 'center',
  },
  chatHeader: {
    display: 'flex',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
  },
  headerIcon: {
    marginLeft: 17,
    width: 16,
    height: 12,
  },
  headerTitle: {
    marginLeft: 126,
    fontSize: 14,
    fontWeight: 'bold',
  },
  chatContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 18,
    paddingLeft: 15,
    paddingRight: 13,
    width: '100%',
  },
  accountInfo: {
    display: 'flex',
    marginTop: 17,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  accountInfoHeader: {
    display: 'flex',
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 16,
    paddingRight: 32,
    flexDirection: 'row',
    backgroundColor: 'rgba(71,106,255, 0.75)',
    alignItems: 'flex-end',
  },
  accountInfoContent: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 38,
    backgroundColor: '#476AFF',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  accountInfoContentText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: 14,
    color: 'black',
    flex: 1,
  },
  accountRemain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  accountRemainUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 17,
  },
  chatInputContainer: {
    backgroundColor: '#0A0A0A',
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 14.5,
    paddingBottom: 22,
    borderRadius: 4,
  },
  chatInputMobileContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    borderBottomRightRadius: 'unset',
    zIndex: 11,
    width: '100%',
    borderTopRightRadius: 'unset',
    backgroundColor: '#4D4D4D',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  iconButtonBg: {
    backgroundColor: '#FF4786',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
  },
  sendIcon: {
    width: 30,
  },
  chatTextInput: {
    fontSize: 14,
    color: 'white',
  },
  iconPurchase: {
    width: 20,
    height: 20,
    marginBottom: 12.5,
    marginLeft: 8,
  },
  userWatchingList: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  userWatchingItem: {
    display: 'flex',
    width: 40,
    height: 40,
    backgroundColor: '#476AFF',
    borderRadius: 4,
    marginRight: 4,
    padding: 4,
  },
  ...purchasePoints,
  purchaseItem: {
    height: 28,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  purchaseItemUnselected: {
    backgroundColor: 'transparent',
  },
  purchaseItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  purchaseCommentRoot: {
    backgroundColor: '#212121',
    height: 83,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  downTriangle: {
    width: 20,
    height: 14,
    marginLeft: 10,
    marginTop: -2,
  },
  [theme.breakpoints.down(768)]: {
    container: {
      width: '100%',
    },
    chatBoard: {
      height: 253,
    },
    purchaseDialogContainer: {
      width: 318,
    },
  },
}))
export default ChatContainer

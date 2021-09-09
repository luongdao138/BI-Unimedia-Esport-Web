import { Box, Typography, Icon, Button, OutlinedInput, IconButton, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState } from 'react'
// import sanitizeHtml from 'sanitize-html'
import useStyles from './styles'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import PremiumChatBox from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
import * as Yup from 'yup'
import i18n from '@locales/i18n'
import { useFormik } from 'formik'
import { PreloadUserItem } from '../PreloadContainer'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  userHasViewingTicket?: boolean
  myPoint: number
  handleKeyboardVisibleState?: (visible?: boolean) => void
}

export const purchasePoints = {
  p_100: {
    id: 'p_100',
    value: 100,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    flex: 65.5,
    maxLengthInput: 50,
  },
  p_300: {
    id: 'p_300',
    value: 300,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    flex: 86,
    maxLengthInput: 50,
  },
  p_500: {
    id: 'p_500',
    value: 500,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    flex: 94,
    maxLengthInput: 150,
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    flex: 94,
    maxLengthInput: 200,
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    flex: 98,
    maxLengthInput: 225,
  },
  p_5000: {
    id: 'p_5000',
    value: 5000,
    backgroundColor: '#9147F9',
    borderColor: '#9147F9',
    flex: 112,
    maxLengthInput: 250,
  },
  p_10000: {
    id: 'p_10000',
    value: 10000,
    backgroundColor: '#C91315',
    borderColor: '#C91315',
    flex: 151,
    maxLengthInput: 270,
  },
}

type MessageValidationType = {
  message: string
}

const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate, userHasViewingTicket, myPoint, handleKeyboardVisibleState }) => {
  // const { t } = useTranslation('common')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [messActiveUser, setMessActiveUser] = useState<string | number>('')

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const isLoading = true

  const validationSchema = Yup.object().shape({
    message: Yup.string()
      .required(i18n.t('common:live_stream_screen.chat_input_text_validate_msg_empty'))
      .max(50, i18n.t('common:live_stream_screen.chat_input_text_validate_msg_50_char_exceed'))
      .trim(),
  })

  const { handleChange, values, handleSubmit, errors } = useFormik<MessageValidationType>({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.message) {
        return
      }
    },
  })
  const classes = useStyles({ chatValidationError: !!errors.message })

  const getChatData = []
  Array(30)
    .fill('')
    .map((_, i) => ({
      id: i,
      user: 'Account Name',
      content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
    }))

  const handleChatInputOnFocus = () => {
    handleKeyboardVisibleState(true)
  }

  const handleChatInputOnBlur = () => {
    handleKeyboardVisibleState(false)
  }

  const handlePremiumChatBoxClickOutside = () => {
    setPurchaseDialogVisible(false)
  }

  const purchaseInfoDialog = () => (
    <PremiumChatBox onClickOutside={handlePremiumChatBoxClickOutside} onPressDonate={onPressDonate} myPoint={myPoint} />
  )

  const purchaseIconClick = () => {
    setPurchaseDialogVisible(!purchaseDialogVisible)
  }

  const handleSubmitChatContent = () => {
    handleSubmit()
  }

  const chatInputComponent = () => (
    <Box className={classes.chatInputMobileContainer}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      <Box className={classes.chatInputContainer}>
        {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
        <Box className={classes.chatBox}>
          <IconButton id="btnOpenPremiumChatDialog" onClick={purchaseIconClick} className={classes.iconPurchase}>
            <img id="btnOpenPremiumChatDialogImage" src="/images/ic_purchase.svg" />
          </IconButton>
          <OutlinedInput
            id={'message'}
            multiline
            rows={3}
            autoComplete="nope"
            onChange={handleChange}
            placeholder={i18n.t('common:live_stream_screen.message_placeholder')}
            value={values.message}
            classes={{ root: classes.input, input: classes.chatTextInput }}
            margin="dense"
            onFocus={handleChatInputOnFocus}
            onBlur={handleChatInputOnBlur}
          />
          <Button onClick={handleSubmitChatContent} className={classes.iconButtonBg}>
            <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
          </Button>
        </Box>
        {errors.message && <Typography className={classes.chatInputErrorText}>{errors.message}</Typography>}
      </Box>
    </Box>
  )

  const chatDonateMessage = () => (
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
  )

  const chatBoardComponent = () => (
    <Box className={`${classes.chatBoardContainer}`}>
      <Box className={`${classes.dialogMess} ${messActiveUser ? classes.dialogMessShow : ''}`}>
        {chatDonateMessage()}
        <Box
          className={`${classes.messContentOuter}`}
          onClick={() => {
            setMessActiveUser('')
          }}
        ></Box>
      </Box>
      <Box className={classes.chatBoard}>
        {getChatData?.length > 0 && !isLoading ? (
          getChatData.map((message, index) => {
            if (index === 2) return chatDonateMessage()
            const { user, content, id } = message
            return <ChatTextMessage key={id} message={content} user={user} />
          })
        ) : (
          <Box style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}></Box>
        )}
      </Box>
      {chatInputComponent()}
    </Box>
  )
  const getUserWatchingList = []
  Array(20)
    .fill('')
    .map((_, i) => ({
      id: i,
      user_avatar: '/images/dataVideoFake/fake_avatar.png',
    }))

  const userDoesNotHaveViewingTicketView = () => (
    <Box className={classes.chatPurchaseTicketBox}>
      <Typography className={classes.chatPurchaseTicketNote}>{i18n.t('common:live_stream_screen.chat_purchase_ticket_note')}</Typography>
    </Box>
  )

  const scrollToCurrentMess = () => {
    const current_mess = document.getElementById('chat_23')
    const mess_container = current_mess.parentNode as Element
    mess_container.scrollTop = current_mess.offsetTop
  }

  const renderPreLoadUserAvatarItem = () => {
    return (
      <>
        {downMd ? (
          <Box style={{ flexDirection: 'row', width: 50, marginRight: 16, justifyContent: 'center', alignItems: 'center' }}>
            <PreloadUserItem />
          </Box>
        ) : (
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              width: 50,
              marginRight: 16,
            }}
          >
            <PreloadUserItem />
          </Box>
        )}
      </>
    )
  }

  const chatContent = () => (
    <Box className={classes.chatContent}>
      <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button>
      <Box className={classes.userWatchingList}>
        {getUserWatchingList.length > 0 && !isLoading ? (
          getUserWatchingList.map(({ id, user_avatar }) => (
            <Box
              key={id}
              className={classes.userWatchingItem}
              onClick={() => {
                if (messActiveUser || messActiveUser === 0) {
                  setMessActiveUser('')
                } else {
                  setMessActiveUser(id)
                }
              }}
            >
              <img src={user_avatar} />
            </Box>
          ))
        ) : (
          <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>{renderPreLoadUserAvatarItem()}</Box>
        )}
      </Box>
      <Box style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>{chatBoardComponent()}</Box>
    </Box>
  )

  return (
    <Box className={classes.container}>
      {!isMobile && (
        <Box className={classes.chatHeader}>
          <Typography className={classes.headerTitle}>{'チャット'}</Typography>
        </Box>
      )}
      {userHasViewingTicket ? chatContent() : userDoesNotHaveViewingTicketView()}
      {/*<Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer} onClick={onPressDonate}>*/}
      {/*  <ButtonPrimary type="submit" round fullWidth>*/}
      {/*    {'Donate Points'}*/}
      {/*  </ButtonPrimary>*/}
      {/*</Box>*/}
    </Box>
  )
}

export default ChatContainer

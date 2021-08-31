import { Box, Typography, Icon, Button, OutlinedInput, IconButton, Input, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppDispatch } from '@store/hooks'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean
}

export const purchasePoints = {
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

const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate, onCloseChatPanel, userHasViewingTicket }) => {
  // const { t } = useTranslation('common')
  const [chatInput, setChatInput] = useState<string>('')
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>(null)
  const [chatInputValidationError, setChatInputValidationError] = useState<string>('')
  const [premiumChatValidationError, setPremiumChatValidationError] = useState<string>('')

  const { t } = useTranslation('common')
  const classes = useStyles({ chatValidationError: !!chatInputValidationError })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { checkNgWord } = useCheckNgWord()
  const dispatch = useAppDispatch()

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

  const handlePremiumChatClick = () => {
    const content = purchaseComment
    if (content.length === 0) {
      setPremiumChatValidationError(t('live_stream_screen.chat_premium_text_validate_msg_empty'))
      return
    }
    if (!purchaseValueSelected) {
      setPremiumChatValidationError(t('live_stream_screen.chat_premium_text_validate_no_donate_selected'))
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
    })

    // Submit chat message
    setPremiumChatValidationError('')
    setPurchaseComment('')

    const donatedPoint = purchasePoints[purchaseValueSelected].value
    onPressDonate(donatedPoint, purchaseComment)
  }
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
            classes={{ root: classes.purchaseCommentRoot, input: classes.purchaseCommentInput }}
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
        <Button onClick={handlePremiumChatClick}
            className={classes.purchaseButton}
        >
          <Typography className={classes.purchaseButtonText}>{i18n.t('common:live_stream_screen.send')}</Typography>
        </Button>
        {premiumChatValidationError && <Typography className={classes.premiumChatError}>{premiumChatValidationError}</Typography>}
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

  const handleSubmitChatContent = () => {
    const content = chatInput
    if (content.length === 0) {
      setChatInputValidationError(t('live_stream_screen.chat_input_text_validate_msg_empty'))
    }
    if (content.length > 50) {
      setChatInputValidationError('live_stream_screen.chat_input_text_validate_msg_50_char_exceed')
    }
    dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: 'aaaaaaaa' }))

    if (!_.isEmpty(checkNgWord(content))) {
      setChatInputValidationError('チャットが未入力です')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: [],
      allowedAttributes: {},
    })

    // Submit chat message
    setChatInputValidationError('')
    setChatInput('')
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
          <Button onClick={handleSubmitChatContent} className={classes.iconButtonBg}>
            <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
          </Button>
        </Box>
        {chatInputValidationError && <Typography className={classes.chatInputErrorText}>{chatInputValidationError}</Typography>}
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
    <Box className={classes.chatBoardContainer}>
      <Box className={classes.chatBoard}>
        {getChatData().map((message, index) => {
          if (index === 2) return chatDonateMessage()
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

  const userDoesNotHaveViewingTicketView = () => (
    <Box className={classes.chatPurchaseTicketBox}>
      <Typography className={classes.chatPurchaseTicketNote}>{t('live_stream_screen.chat_purchase_ticket_note')}</Typography>
    </Box>
  )

  const chatContent = () => (
    <Box className={classes.chatContent}>
      <Box className={classes.userWatchingList}>
        {getUserWatchingList().map(({ id, user_avatar }) => (
          <Box key={id} className={classes.userWatchingItem}>
            <img src={user_avatar} />
          </Box>
        ))}
      </Box>
      {chatBoardComponent()}
    </Box>
  )

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

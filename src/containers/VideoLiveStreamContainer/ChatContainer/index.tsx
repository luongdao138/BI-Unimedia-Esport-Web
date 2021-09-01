import { Box, Typography, Icon, Button, OutlinedInput, IconButton, Input, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState } from 'react'
// import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppDispatch } from '@store/hooks'
import { FormatHelper } from '@utils/helpers/FormatHelper'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  userHasViewingTicket?: boolean
  myPoint: number
}

export const purchasePoints = {
  p_100: {
    id: 'p_100',
    value: 100,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    width: 82,
  },
  p_300: {
    id: 'p_300',
    value: 300,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    width: 82,
  },
  p_500: {
    id: 'p_500',
    value: 500,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    width: 82,
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    width: 82,
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    width: 90,
  },
  p_5000: {
    id: 'p_5000',
    value: 5000,
    backgroundColor: '#9147F9',
    borderColor: '#9147F9',
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

const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate, userHasViewingTicket, myPoint }) => {
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
    // const sanitizedContent = sanitizeHtml(content, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // })

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
        <Button onClick={handlePremiumChatClick} className={classes.purchaseButton}>
          <Typography className={classes.purchaseButtonText}>{i18n.t('common:live_stream_screen.send')}</Typography>
        </Button>
        {premiumChatValidationError && <Typography className={classes.premiumChatError}>{premiumChatValidationError}</Typography>}
        <Box className={classes.dialogFooter}>
          <Typography className={classes.totalPointText}>
            {i18n.t('common:live_stream_screen.total_point_title') + ':'}
            {' ' + FormatHelper.currencyFormat(myPoint.toString())} {' ' + i18n.t('common:point_management_tab.eXe_point')}
          </Typography>
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
    // const sanitizedContent = sanitizeHtml(content, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // })

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
          <Typography className={classes.headerTitle}>{t('live_stream_screen.chat_header')}</Typography>
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

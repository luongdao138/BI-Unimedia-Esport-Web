/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, OutlinedInput, IconButton, Input, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect } from 'react'
// import sanitizeHtml from 'sanitize-html'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import useStyles from './styles'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _, { size } from 'lodash'
// import { showDialog } from '@store/common/actions'
// import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppSelector } from '@store/hooks'
// import { useAppDispatch, useAppSelector } from '@store/hooks'
import userProfileStore from '@store/userProfile'
import { UserProfile } from '@services/user.service'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { listMessages, listUsers } from 'src/graphql/queries'
import { createMessage, createUser } from 'src/graphql/mutations'
// import { createMessage, deleteMessage } from "src/graphql/mutations";
import { onCreateMessage } from 'src/graphql/subscriptions'
import * as APIt from 'src/types/graphqlAPI'

type ChatContainerProps = {
  onPressDonate?: (donatedPoint: number, purchaseComment: string) => void
  onCloseChatPanel?: () => void
  userHasViewingTicket?: boolean
  key_video_id?: string
  myPoint?: any
  handleKeyboardVisibleState: any
}

export const purchasePoints = {
  p_100: {
    id: 'p_100',
    value: 100,
    backgroundColor: '#2680EB',
    borderColor: '#2680EB',
    width: 65.5,
  },
  p_300: {
    id: 'p_300',
    value: 300,
    backgroundColor: '#01B7FB',
    borderColor: '#01B7FB',
    width: 65.5,
  },
  p_500: {
    id: 'p_500',
    value: 500,
    backgroundColor: '#0FB732',
    borderColor: '#0FB732',
    width: 65.5,
  },
  p_1000: {
    id: 'p_1000',
    value: 1000,
    backgroundColor: '#EBD600',
    borderColor: '#EBD600',
    width: 65.5,
  },
  p_3000: {
    id: 'p_3000',
    value: 3000,
    backgroundColor: '#FF6A1C',
    borderColor: '#FF6A1C',
    width: 90,
  },
  // p_2500: {
  //   id: 'p_2500',
  //   value: 5000,
  //   backgroundColor: '#9147F9',
  //   borderColor: '#9147F9',
  //   width: 90,
  // },
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

const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate, onCloseChatPanel, userHasViewingTicket, key_video_id }) => {
  const { t } = useTranslation('common')
  const [messageText, setMessageText] = useState<string>('')
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [purchaseValueSelected, setPurchaseValueSelected] = useState<string>(null)
  const [chatInputValidationError, setChatInputValidationError] = useState<string>('')
  const [premiumChatValidationError, setPremiumChatValidationError] = useState<string>('')
  const [messActiveUser, setMessActiveUser] = useState<string | number>('')
  const [allUsers, setAllUsers] = useState([])
  const [successFlagGetListUSer, setSuccessFlagGetListUSer] = useState(false)
  const [successFlagGetAddUSer, setSuccessFlagGetAddUSer] = useState(false)
  const { selectors } = userProfileStore
  const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)
  // console.log('userProfile', JSON.stringify(userProfile));
  const initialFruits: APIt.Message[] = []
  const [stateMessages, setStateMessages] = useState(initialFruits)
  const [chatUser, setChatUser] = useState<any>([])
  const classes = useStyles({ chatValidationError: !!chatInputValidationError })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { checkNgWord } = useCheckNgWord()
  // const dispatch = useAppDispatch()

  const handleCreateUserDB = async () => {
    console.log(
      `{
      // id:userProfile?.id,
      uuid: userProfile?.attributes?.uuid,
      avatar: userProfile?.attributes?.avatar_url,
      user_name: userProfile?.attributes?.nickname,
    }`,
      JSON.stringify({
        id: userProfile?.id,
        uuid: userProfile?.attributes?.uuid,
        avatar: userProfile?.attributes?.avatar_url,
        user_name: userProfile?.attributes?.nickname,
      })
    )

    const abc = await API.graphql(
      graphqlOperation(createUser, {
        input: {
          // id:userProfile?.id,
          uuid: userProfile?.attributes?.uuid,
          avatar: userProfile?.attributes?.avatar_url,
          user_name: userProfile?.attributes?.nickname,
        },
      })
    )
    console.log('abc', abc)
    setSuccessFlagGetAddUSer(true)
  }

  const getListUser = async () => {
    try {
      const listQV: APIt.ListMessagesQueryVariables = {}
      const userReq: any = await API.graphql(graphqlOperation(listUsers, listQV))
      setAllUsers(userReq.data.listUsers.items)
      if (size(userReq.data.listUsers.items) > 0) {
        setTimeout(() => {
          setSuccessFlagGetListUSer(true)
        }, 500)
      } else {
        setSuccessFlagGetListUSer(true)
      }
      // trick: nếu có data thì sau 500ms mới set cờ successFlagGetListUSer=true; để đảm bảo lúc chạy vào checkUserExist lúc nào data AllsUser cũng đã được set dữ liệu
      console.log('getListUser; ', userReq)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Subscribe to creation of message
    // Subscriptions is a GraphQL feature allowing the server to send data to its clients when a specific event happens. You can enable real-time data integration in your app with a subscription.
    const pubSubClient = API.graphql(graphqlOperation(onCreateMessage))
    pubSubClient.subscribe({
      next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        console.log('New Messages: ', JSON.stringify(subMessage))

        setStateMessages((stateMessages) => [...stateMessages, subMessage.data.onCreateMessage])
      },
      error: (error) => console.warn(error),
    })

    async function getMessages() {
      try {
        const listQV: APIt.ListMessagesQueryVariables = {}
        const messagesResults: any = await API.graphql(graphqlOperation(listMessages, listQV))
        console.log('getMessages Results; ', messagesResults)

        setStateMessages(messagesResults.data.listMessages.items)
      } catch (error) {
        console.error(error)
      }
    }
    getMessages()
    getListUser()
  }, [])

  const checkUserExist = (checkedAllUsers: any) => {
    if (!checkedAllUsers) {
      console.log('tạo mới tài khoản vì k tồn tại checkedAllUsers')
      handleCreateUserDB()
    } else {
      console.log(
        'checkedAllUsers; ',
        JSON.stringify(checkedAllUsers),
        '\nuserProfile; ',
        JSON.stringify(userProfile),
        'userProfile.uuid ',
        userProfile?.attributes?.uuid
      )

      const currentUser = checkedAllUsers.find((user) => user.uuid === userProfile?.attributes?.uuid)
      if (currentUser) {
        console.log('Tồn tại currentUser ', currentUser)
        setChatUser(currentUser)
        setSuccessFlagGetAddUSer(true)
      } else {
        console.log('tồn tại checkedAllUsers nhưng  userProfile chưa có trong listUser của DynamoDB nên cần tạo mới', userProfile)
        handleCreateUserDB()
      }
    }
  }

  useEffect(() => {
    if (userProfile && successFlagGetListUSer) {
      checkUserExist(allUsers)
    }
  }, [userProfile, successFlagGetListUSer])

  // function getUrlParameter(sParam: string) {
  //   let sPageURL = window.location.search.substring(1),
  //     sURLVariables = sPageURL.split('&'),
  //     sParameterName,
  //     i

  //   for (i = 0; i < sURLVariables.length; i++) {
  //     sParameterName = sURLVariables[i].split('=')

  //     if (sParameterName[0] === sParam) {
  //       return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
  //     }
  //   }
  //   return false
  // }

  // async function deleteMsg(idDelete: string, e: any) {
  //   const input = {
  //     id: idDelete
  //   };
  //   const deleteAt: any = await API.graphql(graphqlOperation(deleteMessage, {input: input}));
  //   console.log(deleteAt);
  //   if (deleteAt.data) {
  //     setStateMessages(stateMessages.filter(({ id }) => id !== idDelete));
  //   }
  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value)
  }

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseComment(e.target.value)
  }

  const getPurchasePointList = () => Object.values(purchasePoints)

  // const getChatData = () =>
  //   Array(30)
  //     .fill('')
  //     .map((_, i) => ({
  //       id: i,
  //       user: 'Account Name',
  //       content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
  //     }))

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

  const handleSubmitChatContent = async () => {
    const content = messageText
    if (content.length === 0) {
      setChatInputValidationError(t('live_stream_screen.chat_input_text_validate_msg_empty'))
    }
    if (content.length > 50) {
      setChatInputValidationError('live_stream_screen.chat_input_text_validate_msg_50_char_exceed')
    }
    // dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: 'aaaaaaaa' }))

    if (!_.isEmpty(checkNgWord(content))) {
      setChatInputValidationError('チャットが未入力です')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const sanitizedContent = sanitizeHtml(content, {
    //   allowedTags: [],
    //   allowedAttributes: {},
    // })

    if (successFlagGetAddUSer || chatUser) {
      const input = {
        // id is auto populated by AWS Amplify
        owner: chatUser.user_name,
        text: messageText,
        uuid: chatUser.uuid,
        video_id: key_video_id,
        video_time: '20',
        // point: 500,//optional : show when Post is use pOint
        // is_premium: false,
        userId: chatUser.uuid,
      }
      console.log('input', input)

      await API.graphql(graphqlOperation(createMessage, { input }))
    }

    // // Submit chat message
    setChatInputValidationError('')
    setMessageText('')
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
            value={messageText}
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
        {stateMessages
          // sort messages oldest to newest client-side
          .sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
          .map((msg: any, i) => {
            return (
              <Typography key={i} className={classes.chatMessage} id={`chat_${i}`}>
                <span className={classes.chatMessageUser}>{`Account ${msg.owner}: `}</span>
                {msg.text}
              </Typography>
            )
          })}
        {/* {getChatData().map((message, index) => {
          if (index === 2) return chatDonateMessage()
          const { user, content, id } = message
          return (
            <Typography key={id} className={classes.chatMessage} id={`chat_${id}`}>
              <span className={classes.chatMessageUser}>{`${user}: `}</span>
              {content}
            </Typography>
          )
        })} */}
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

  const scrollToCurrentMess = () => {
    const current_mess = document.getElementById('chat_23')
    const mess_container = current_mess.parentNode as Element
    mess_container.scrollTop = current_mess.offsetTop
  }

  const chatContent = () => (
    <Box className={classes.chatContent}>
      <Button onClick={scrollToCurrentMess}>Scroll to chat mess</Button>
      <Box className={classes.userWatchingList}>
        {getUserWatchingList().map(({ id, user_avatar }) => (
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

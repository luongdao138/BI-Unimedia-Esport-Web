/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Typography, Icon, Button, OutlinedInput, IconButton, Input, useTheme, useMediaQuery } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import React, { useState, useEffect } from 'react'
// import sanitizeHtml from 'sanitize-html'
import useStyles from './styles'
import ChatTextMessage from '@containers/VideoLiveStreamContainer/ChatContainer/ChatTextMessage'
import PremiumChatBox from '@containers/VideoLiveStreamContainer/ChatContainer/PremiumChatDialog'
import * as Yup from 'yup'
import i18n from '@locales/i18n'
import { useFormik } from 'formik'

import API, {GraphQLResult, graphqlOperation} from '@aws-amplify/api';
import { listMessages } from "src/graphql/queries";
import { createMessage } from "src/graphql/mutations";
// import { createMessage, deleteMessage } from "src/graphql/mutations";
import { onCreateMessage } from "src/graphql/subscriptions";
import * as APIt from 'src/types/graphqlAPI';

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
  const [messageText, setMessageText] = useState<string>('')
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const [messActiveUser, setMessActiveUser] = useState<string | number>('')

  const initialFruits: APIt.Message[] = [];
  const [stateMessages, setStateMessages] = useState(initialFruits);

  const { t } = useTranslation('common')
  const classes = useStyles({ chatValidationError: !!chatInputValidationError })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { checkNgWord } = useCheckNgWord()
  const dispatch = useAppDispatch()

  useEffect(() => {
     // Subscribe to creation of message
     // Subscriptions is a GraphQL feature allowing the server to send data to its clients when a specific event happens. You can enable real-time data integration in your app with a subscription.
    const pubSubClient = API.graphql(
      graphqlOperation(onCreateMessage)
    );
    pubSubClient.subscribe({
      next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value;
        console.log('new mess: ',JSON.stringify(subMessage));
        
        setStateMessages((stateMessages) => [
          ...stateMessages,
          subMessage.data.onCreateMessage
        ]);
      },
      error: (error) => console.warn(error)
    });

    async function getMessages() {
      try {
        const listQV: APIt.ListMessagesQueryVariables = {
        };
        const messagesReq: any = await API.graphql(
          graphqlOperation(listMessages, listQV),
        );
        console.log('messagesRes; ',messagesReq);
        
        setStateMessages(messagesReq.data.listMessages.items);
      } catch (error) {
        console.error(error);
      }
    }
    getMessages();
  }, []);

  function getUrlParameter(sParam: string) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
  }

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

  // const getChatData = () =>
  //   Array(30)
  //     .fill('')
  //     .map((_, i) => ({
  //       id: i,
  //       user: 'Account Name',
  //       content: 'チャットのコメントははここに表示されます。チャットのコメントははここに表示されます。',
  //     }))

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

  const handleSubmitChatContent = async() => {
    const input = {
      // id is auto populated by AWS Amplify
      message: messageText, // the message content the user submitted (from state)
      owner: getUrlParameter('name'), // this is the username of the current user
      video_id: 'bc69fa88-1716-46ad-a54e-16343cb0179d',
      uuid_user: getUrlParameter('uuid_user')
    };
    await API.graphql(graphqlOperation(createMessage, {input: input}));

    const content = messageText
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
    setMessageText('')
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
            autoComplete="off"
            onChange={onChange}
            placeholder={'チャットを送信'}
            id={'search'}
            value={messageText}
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
        {stateMessages
          // sort messages oldest to newest client-side
          .sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt))
          .map((msg: any, i) => {
            return (
              <Typography key={i} className={classes.chatMessage} id={`chat_${i}`}>
                <span className={classes.chatMessageUser}>{`Account ${msg.owner}: `}</span>
                {msg.message}
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
      <Typography className={classes.chatPurchaseTicketNote}>{i18n.t('common:live_stream_screen.chat_purchase_ticket_note')}</Typography>
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

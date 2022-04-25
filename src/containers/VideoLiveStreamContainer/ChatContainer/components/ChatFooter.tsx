import { useMediaQuery, useTheme, Box, IconButton } from '@material-ui/core'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import React, { useCallback, useEffect, useState } from 'react'
import ChatInputContainer from '@containers/VideoLiveStreamContainer/ChatContainer/ChatInputContainer'
import useStyles from '@containers/VideoLiveStreamContainer/ChatContainer/styles'
import TipChatDialog from '@containers/VideoLiveStreamContainer/ChatContainer/TipChatDialog/index'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { purchasePoints, sanitizeMess } from '@containers/VideoLiveStreamContainer/ChatContainer/index'
import { STATUS_SEND_MESS } from '@constants/common.constants'
import { useAppSelector } from '@store/hooks'
import { UserProfile } from '@services/user.service'
import userProfileStore from '@store/userProfile'
import LoginRequired from '@containers/LoginRequired'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import usePurchaseTicketSuperChat from '@containers/VideoLiveStreamContainer/usePurchaseTicket'

type MessInput = {
  id?: string
  owner?: string
  text?: string
  uuid?: string | null
  video_id?: string
  delete_flag?: boolean | null
  video_time?: number
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  is_premium_number?: number | null
  userId?: string
  local_id?: string | null
  created_time?: string | null
  parent?: {
    avatar?: string
    user_name?: string
  }
  giftMasterId?: string
  receiver?: { name: string; image: string }
}

interface Props {
  isEnabledChat: boolean // done
  isStreaming: boolean // done
  donateConfirmModalIsShown: any
  handleKeyboardVisibleState: any
  onPressDonate: any // done
  openPurchasePointModal: any // done
  errorMsgDonatePoint: any // done
  clearMessageDonatePoint: any // done
  chatContainerRef: any // done
  isEnabledGift: any // done
  successFlagGetAddUSer: boolean // done
  chatUser: any // done
  key_video_id: any // done
  videoPlayedSecond: any // done
  handleCreateMess: any // done
}

const ChatFooter: React.FC<Props> = ({
  donateConfirmModalIsShown,
  handleKeyboardVisibleState,
  isEnabledChat,
  isStreaming,
  onPressDonate,
  openPurchasePointModal,
  errorMsgDonatePoint,
  clearMessageDonatePoint,
  chatContainerRef,
  isEnabledGift,
  successFlagGetAddUSer,
  chatUser,
  key_video_id,
  videoPlayedSecond,
  handleCreateMess,
}) => {
  const [errorMess, setErrorMess] = useState<string>('')

  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769)) || isLandscape
  const [purchaseDialogVisible, setPurchaseDialogVisible] = useState<boolean>(false)
  const { selectors } = userProfileStore
  const userProfile = useAppSelector<UserProfile>(selectors.getUserProfile)
  const { tipFunctionVisibleState, isFullScreen, detailVideoResult, getVideoGiftMasterList, updateUseGiftFlag } = useDetailVideo()
  const { dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  const [isResetMess, setIsResetMess] = useState<boolean>(false)

  const [preLoading, setPreLoading] = useState<boolean>(false)

  const handlePremiumChatBoxClickOutside = () => {
    setPurchaseDialogVisible(false)
  }

  const createMess = async (
    message: string,
    point = 0,
    tip_mess = {
      master_uuid: null,
      name: null,
      image: null,
    }
  ): Promise<void> => {
    const { master_uuid, name, image } = tip_mess
    if (!point && !message) {
      return
    }
    if (successFlagGetAddUSer && Object.keys(chatUser).length > 0 && isEnabledChat && isStreaming) {
      const videoTime = videoPlayedSecond.current
      let input: MessInput = {
        // id is auto populated by AWS Amplify
        owner: chatUser.user_name,
        text: sanitizeMess(message),
        uuid: chatUser.uuid,
        video_id: key_video_id,
        video_time: videoTime,
        // point: 500,//optional : show when Post is use pOint
        is_premium: false,
        is_premium_number: 0,
        userId: chatUser.id,
        delete_flag: false,
        local_id: uuidv4(),
        created_time: moment().toISOString(),
      }
      if (point) {
        input = {
          ...input,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          point: point.toString(),
          is_premium: true,
          is_premium_number: 1,
          display_avatar_time: videoTime + purchasePoints[`p_${point}`].displayTime,
        }
        if (master_uuid) {
          input = {
            ...input,
            giftMasterId: master_uuid,
          }
        }
      }

      let local_message = {
        ...input,
        mess_status: STATUS_SEND_MESS.PENDING,
      }
      if (point) {
        const { nickname, avatar_url } = userProfile.attributes
        local_message = {
          ...local_message,
          parent: { avatar: avatar_url, user_name: nickname },
        }
        if (master_uuid) {
          local_message = {
            ...local_message,
            receiver: { name, image },
          }
        }
      }

      handleCreateMess(local_message, input, point, setIsResetMess)
    }
  }

  const purchaseIconClick = () => {
    setPreLoading(true)
    setTimeout(() => {
      if (detailVideoResult) {
        getVideoGiftMasterList(
          { video_id: `${detailVideoResult?.uuid}` },
          () => {
            setPreLoading(false)
            updateUseGiftFlag(1)
          },
          () => {
            setPreLoading(false)
            updateUseGiftFlag(0)
            setPurchaseDialogVisible(false)
          }
        )
      }
    }, 100)
    setPurchaseDialogVisible(!purchaseDialogVisible)
  }

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200) {
      setPurchaseDialogVisible(false)
    }
  }, [dataPurchaseTicketSuperChat])

  const refProps = { ref: chatContainerRef }

  const purchaseInfoDialog = () => (
    <TipChatDialog
      normalMessHasError={errorMess ? true : false}
      createMess={createMess}
      onClickOutside={donateConfirmModalIsShown() ? null : handlePremiumChatBoxClickOutside}
      onPressDonate={onPressDonate}
      openPurchasePointModal={openPurchasePointModal}
      errorMsgDonatePoint={errorMsgDonatePoint}
      clearMessageDonatePoint={clearMessageDonatePoint}
      preLoading={preLoading}
    />
  )

  const purchaseButton = () => {
    if (tipFunctionVisibleState === 0) return <Box />
    return (
      <LoginRequired>
        <IconButton
          disabled={!isEnabledGift}
          onClick={purchaseIconClick}
          id="btnOpenPremiumChatDialog"
          className={`${classes.iconPurchase} ${isEnabledGift ? '' : 'giftDisabled'}`}
        >
          <img id="btnOpenPremiumChatDialogImage" src="/images/tip_icon.svg" />
        </IconButton>
      </LoginRequired>
    )
  }

  const renderBlurInput = () => {
    return <Box className={`${classes.blurInputChat}`}></Box>
  }

  const handleChatInputOnFocus = useCallback(() => handleKeyboardVisibleState(true), [])
  const handleChatInputOnBlur = useCallback(() => handleKeyboardVisibleState(true), [])

  const chatInputComponent = () => (
    <Box {...refProps} className={`${classes.chatInputMobileContainer}`}>
      {purchaseDialogVisible && isMobile && purchaseInfoDialog()}
      {isEnabledChat &&
        (isStreaming ? (
          <Box className={`${classes.chatInputContainer} ${isEnabledGift ? '' : classes.hideIconGift}`}>
            {purchaseDialogVisible && !isMobile && purchaseInfoDialog()}
            {!isMobile && purchaseButton()}
            <ChatInputContainer
              purchaseButton={purchaseButton}
              isResetMess={isResetMess}
              handleChatInputOnFocus={handleChatInputOnFocus}
              handleChatInputOnBlur={handleChatInputOnBlur}
              setErrorMess={setErrorMess}
              sendNormalMess={createMess}
            ></ChatInputContainer>
          </Box>
        ) : (
          <></>
        ))}
      {purchaseDialogVisible && renderBlurInput()}
    </Box>
  )

  const chatComponentMobile = () => {
    return purchaseDialogVisible ? (
      <>
        {purchaseInfoDialog()}
        {renderBlurInput()}
      </>
    ) : (
      chatInputComponent()
    )
  }

  return isMobile ? !isFullScreen && chatComponentMobile() : chatInputComponent()
}

export default ChatFooter

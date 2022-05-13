import { makeStyles } from '@material-ui/core'
import { ChatStyleProps, purchasePoints } from './index'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  singleMessTab: {},
  messageTabs: {},
  rankingContainer: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  tabsContent: {
    width: '100%',
    // height: '100%',
    padding: (props: ChatStyleProps) => (props.isRankingTab ? 0 : '10px 16px 2px 16px'),
    // flex: 1 1 0px;
    // overflow: auto;
  },
  singleTab: { maxWidth: 'none' },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottom: `1px solid ${Colors.white_opacity[30]}`,
  },
  tabs: {
    display: 'flex',
    overflowY: 'hidden',
    width: '100%',
    '& .MuiButtonBase-root': {
      background: '#212121',
      flex: 1,
      minHeight: '53px',
      padding: '16px 12px',
      minWidth: '100px',
      '& .MuiTab-wrapper': {
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '17px',
      },
      '&.Mui-selected': {
        '& .MuiTab-wrapper': {
          color: Colors.white,
        },
      },
    },
    '& .MuiTabs-indicator': {
      backgroundColor: Colors.white,
      height: 1,
    },
  },
  iconAngleDown: {
    color: Colors.grey[200],
  },
  bottomArrow: {
    transform: 'translateX(50%)',
    position: 'absolute',
    right: '50%',
    bottom: 30,
    zIndex: 3,
    background: Colors.white,
    '&:hover': {
      background: Colors.white,
    },
  },
  loaderBox: {
    flexGrow: 0,
    width: 20,
    height: 20,
    // position: 'absolute',
    zIndex: 1000,
    left: 0,
    right: 0,
    top: '0px',
    margin: '0 auto',
    '& svg': {
      width: '100%',
      color: 'red',
    },
  },
  chatFooter: {
    height: 40,
    width: '100%',
  },
  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '16px',
    height: '100%',
    flex: 1,
  },
  chatMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    '&:hover $three_dot': {
      display: 'flex',
    },
  },
  icon: {},
  chatInputErrorText: {
    marginTop: '8px',
    marginLeft: '28px',
    marginRight: '8px',
    fontSize: '12px',
    color: '#F7F735',
    fontFamily: 'Meiryo',
  },
  chatPurchaseTicketBox: {
    display: 'flex',
  },
  chatPurchaseTicketNote: {
    fontSize: 14,
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
    color: '#FFFFFF',
  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointListRow1: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  purchaseDialogContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 4,
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
    scrollBehavior: 'smooth',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 16,
    // marginTop: 8,
    scrollbarColor: '#222 transparent',
    // '&::-webkit-scrollbar': {
    //   width: '20px',
    //   opacity: 1,
    //   padding: 2,
    //   cursor: 'pointer',
    // },
    // '&::-webkit-scrollbar-track': {
    //   background: '#4D4D4D',
    //   border: 'solid 3px transparent',
    // },
    // '&::-webkit-scrollbar-thumb': {
    //   backgroundColor: '#212121',
    //   backgroundClip: 'padding-box',
    //   border: '4px solid rgba(0, 0, 0, 0)',
    //   width: '14px',
    //   cursor: 'pointer',
    // },
  },
  listContainer: {
    scrollbarColor: '#222 transparent',
    '&::-webkit-scrollbar': {
      width: 16,
      opacity: 1,
      padding: 2,
      cursor: 'pointer',
    },
    '&::-webkit-scrollbar-track': {
      background: '#4D4D4D',
      border: 'solid 3px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#212121',
      backgroundClip: 'padding-box',
      border: '4px solid rgba(0, 0, 0, 0)',
      width: '14px',
      cursor: 'pointer',
    },
  },
  chatBoardContainer: {
    position: 'relative',
    paddingLeft: '16px',
    flex: 1,
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 14,
    // height: 'calc(100% - 12px)'
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
    paddingLeft: '16px',
    display: 'flex',
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: 'black',
    flexShrink: 0,
  },
  headerIcon: {
    marginLeft: 17,
    width: 16,
    height: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 0,
    width: '100%',
    // height: "calc(100% - 35px)",
    position: 'relative',
    flex: 1,
    background: 'blue',
  },
  chatInputContainer: {
    backgroundColor: '#0A0A0A',
    borderRadius: 4,
    position: 'relative',
    padding: '4px 8px 16px 8px',
  },
  hideIconGift: {
    padding: '47px 8px 16px 8px',
  },
  chatInputMobileContainer: {
    backgroundColor: '#212121',
    // position: 'absolute',
    // left: 0,
    width: '100%',
    // bottom: 0
    position: 'relative',
  },
  blurInputChat: {
    background: 'rgb(0 0 0 / 80%)',
    backdropFilter: 'blur(4px)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    zIndex: 20,
  },
  // chatInputStreamingStyle: {
  //   position: 'relative',
  //   bottom: 0,
  // },
  input: () => ({
    height: 42,
    borderBottomRightRadius: 'unset',
    zIndex: 11,
    width: '100%',
    borderTopRightRadius: 'unset',
    // backgroundColor: !props?.chatValidationError ? '#4D4D4D' : '#F7F73544',
    backgroundColor: '#4D4D4D',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      // borderColor: !props?.chatValidationError ? '#FFFFFF' : '#F7F560',
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      // backgroundColor: 'transparent',
      // '& .MuiOutlinedInput-notchedOutline': {
      //   borderColor: 'transparent',
      // },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #4d4d4d inset',
    },
  }),
  iconButtonBg: {
    height: 42,
    backgroundColor: '#FF4786',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
  },
  sendIcon: {
    width: 30,
  },
  iconPurchase: {
    padding: '0px',
    margin: '0 0 3px 0',
    '&.giftDisabled': {
      opacity: 0.5,
    },
  },
  userWatchingList: {
    marginTop: '16px',
    marginBottom: '0px',
    // marginLeft: '16px',
    // marginRight: '16px',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    overflow: 'auto',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    flexShrink: 0,
    // height: 40,
    padding: '0 0 0 16px',
    '&::-webkit-scrollbar': {
      height: 10,
      opacity: 1,
      padding: 10,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: '#3d3d3c',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  textPoint: {
    position: 'absolute',
    bottom: '4px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
    height: '14px',
  },
  userWatchingItem: {
    display: 'flex',
    width: 52,
    height: 52,
    backgroundColor: '#476AFF',
    borderRadius: 4,
    marginRight: 8,
    padding: '5px 9px 0px 9px',
    cursor: 'pointer',
    justifyContent: 'center',
    position: 'relative',
  },
  ...purchasePoints,
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
  dialogMess: {
    position: 'absolute',
    background: '#000000AB',
    height: '100%',
    zIndex: 18,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.5s',
    top: 0,
  },
  dialogMessShow: {
    opacity: 1,
    visibility: 'visible',
    width: '100%',
    paddingLeft: '16px',
    paddingRight: '20px',
  },
  messContentOuter: {
    flex: 1,
  },
  btn_show_more: {
    background: Colors.primary,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary,
    padding: '4px 6px',
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: '16px',
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    bottom: '9px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    visibility: 'hidden',
    opacity: '0',
    transition: 'all 0.5s',
  },
  displaySeeMore: {
    visibility: 'visible',
    opacity: '1',
  },
  btn_scroll_mess: {
    background: Colors.primary,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.primary,
    padding: '12px 6px',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: '16px',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    height: 50,
  },
  [theme.breakpoints.down(1100)]: {
    chatArea: {
      // width: 350,
    },
  },
  [theme.breakpoints.down(870)]: {
    chatArea: {
      // width: 240,
    },
  },
  [theme.breakpoints.down(769)]: {
    btn_scroll_mess: {
      position: 'relative',
      left: 'auto',
      bottom: 'auto',
    },
    chatContent: {
      height: 'auto',
    },
    userWatchingList: {
      // marginLeft: '16px',
      // marginRight: '16px',
      marginTop: '16px',
    },
    chatArea: {
      width: '100%',
      border: 'unset',
      paddingBottom: 'unset',
      marginRight: 'unset',
      marginLeft: 'unset',
      height: 'auto',
      background: '#212121',
    },
    // chatBoard: {
    //   height: 'calc(100vh - 300px)',
    // },
    purchaseDialogContainer: {
      width: 318,
    },

    chatInputMobileContainer: {
      // position: 'absolute',
      // bottom: 120,
      bottom: 0,
      position: 'fixed',
      zIndex: 10,
      width: 'calc(100vw - 32px)',
      borderRadius: '4px',
    },
    blurInputChat: {
      position: 'fixed',
      height: 110,
    },
    tabsContainer: {
      display: 'none',
    },
    iconPurchase: {
      margin: '0px !important',
      padding: '0px !important',
    },
    chatInputContainer: {
      padding: '8px 6px 8px 6px',
    },
    hideIconGift: {
      padding: '6px',
    },
  },
  [`@media (orientation: landscape)`]: {
    chatBoard: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          height: '100%',
        }
    },
    chatArea: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          width: '100%',
          border: 'unset',
          paddingBottom: 'unset',
          marginRight: 'unset',
          marginLeft: 'unset',
          height: '100%',
        }
    },
    chatBoardContainer: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          flex: '1 1 0',
          minWidth: 0,
        }
    },
    tabsContainer: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          display: 'none',
        }
    },
    chatInputMobileContainer: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          width: 'calc(100% - 32px)',
          bottom: 0,
          position: 'absolute',
        }
    },

    // chat input landscape
    chatInputContainer: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          padding: '8px 6px 8px 6px',
        }
    },
    iconPurchase: (props: ChatStyleProps) => {
      if (props.isLandscape)
        return {
          margin: '0 3px 0 0',
        }
    },
    blurInputChat: (props: ChatStyleProps) => {
      if (props.isLandscape) {
        return {
          display: 'none',
        }
      }
    },
  },
}))

export default useStyles

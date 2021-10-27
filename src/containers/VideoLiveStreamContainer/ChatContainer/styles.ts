import { makeStyles } from '@material-ui/core'
import { purchasePoints } from './index'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // width: 482,
    marginLeft: '16px',
    marginRight: '16px',
    border: `1px solid #FFFFFF4D`,
    paddingBottom: '16px',
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
    margin: '18px 16px',
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
    position: 'relative',
    overflow: 'auto',
    // height: 565,
    // height: 300,
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 16,
    // marginTop: 8,
    scrollbarColor: '#222 transparent',
    '&::-webkit-scrollbar': {
      width: '20px',
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
  },
  chatInputContainer: {
    backgroundColor: '#0A0A0A',
    padding: 16,
    borderRadius: 4,
  },
  chatInputMobileContainer: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  // chatInputStreamingStyle: {
  //   position: 'relative',
  //   bottom: 0,
  // },
  chatBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '& .MuiFormControl-root': {
      flex: 1,
    },
  },
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
  chatTextInput: {
    fontSize: 14,
    color: 'white',
    '&::placeholder': {
      color: '#FFFFFF',
      opacity: 1,
    },
  },
  iconPurchase: {
    width: 20,
    height: 20,
    marginBottom: 12.5,
    marginRight: 8,
  },
  userWatchingList: {
    marginTop: '16px',
    marginBottom: '0px',
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'row',
    // width: '100%',
    overflow: 'auto',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 10,
      opacity: 1,
      padding: 10,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222222',
      borderRadius: 6,
    },
  },
  userWatchingItem: {
    display: 'flex',
    // width: 40,
    // height: 40,
    backgroundColor: '#476AFF',
    borderRadius: 4,
    marginRight: 4,
    padding: 4,
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0,
    },
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
    top: 8,
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
  },
  [theme.breakpoints.between(769, 1281)]: {
    chatInputContainer: {
      padding: '6px 16px 8px 16px',
    },
    input: () => ({
      height: 36,
    }),
    iconButtonBg: {
      height: 36,
    },
    iconPurchase: {
      marginBottom: 5,
    },
  },
  [theme.breakpoints.down(1100)]: {
    container: {
      // width: 350,
    },
  },
  [theme.breakpoints.down(870)]: {
    container: {
      // width: 240,
    },
  },
  [theme.breakpoints.down(769)]: {
    userWatchingList: {
      marginLeft: '16px',
      marginRight: '16px',
      marginTop: '16px',
    },
    container: {
      width: '100%',
      border: 'unset',
      paddingBottom: 'unset',
      marginRight: 'unset',
      marginLeft: 'unset',
    },
    chatBoard: {
      height: 253,
    },
    purchaseDialogContainer: {
      width: 318,
    },
    chatInputMobileContainer: {
      position: 'fixed',
      bottom: 0,
      zIndex: 2,
    },
  },
}))

export default useStyles

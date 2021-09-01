import { makeStyles } from '@material-ui/core'
import { purchasePoints } from './index'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 482,
  },
  chatInputErrorText: {
    marginTop: '4px',
    marginLeft: '8px',
    marginRight: '8px',
    fontSize: '12px',
    color: '#F7F735',
    fontFamily: 'Meiryo',
  },
  premiumChatError: {
    marginTop: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#F7F735',
  },
  chatPurchaseTicketBox: {
    display: 'flex',
  },
  chatPurchaseTicketNote: {
    fontSize: 14,
    margin: '18px 15px',
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
    color: '#FFFFFF',
    whiteSpace: 'pre',
  },
  purchasePointText: {
    fontSize: 10,
    textDecoration: 'underline',
    color: '#FFFFFF',
    cursor: 'pointer',
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
    color: '#FFFFFF',
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
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 10,
      opacity: 1,
      padding: 2,
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
  chatBoardContainer: {
    position: 'relative',
  },
  chatMessage: {
    fontSize: 14,
    marginBottom: 4,
    color: '#FFFFFF',
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
    justifyContent: 'center',
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
    paddingTop: 18,
    paddingLeft: 15,
    paddingRight: 13,
    width: '100%',
  },
  accountInfo: {
    display: 'flex',
    marginBottom: 4,
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
    marginBottom: 3,
    marginRight: 20,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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
    marginBottom: 3,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
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
  input: (props: { chatValidationError?: boolean }) => ({
    borderBottomRightRadius: 'unset',
    zIndex: 11,
    width: '100%',
    borderTopRightRadius: 'unset',
    backgroundColor: !props?.chatValidationError ? '#4D4D4D' : '#F7F73544',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: !props?.chatValidationError ? '#FFFFFF' : '#F7F560',
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
  }),
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
    '&::placeholder': {
      color: '#FFFFFF',
      opacity: 1,
    },
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
    color: '#FFFFFF',
  },
  purchaseCommentRoot: {
    backgroundColor: '#212121',
    height: 83,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  purchaseCommentInput: {
    fontSize: '12px',
    color: '#FFFFFF',
    '&::placeholder': {
      color: '#FFFFFF',
      opacity: 1,
    },
  },
  downTriangle: {
    width: 20,
    height: 14,
    marginLeft: 10,
    marginTop: -2,
  },
  [theme.breakpoints.down(1100)]: {
    container: {
      width: 350,
    },
  },
  [theme.breakpoints.down(870)]: {
    container: {
      width: 240,
    },
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

export default useStyles

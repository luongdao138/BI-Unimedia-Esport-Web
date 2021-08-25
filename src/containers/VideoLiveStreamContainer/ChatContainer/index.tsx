import { Box, Typography, makeStyles, Icon, Button, OutlinedInput, IconButton } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { useState } from 'react'

type ChatContainerProps = {
  onPressDonate?: () => void
}
const ChatContainer: React.FC<ChatContainerProps> = ({ onPressDonate }) => {
  // const { t } = useTranslation('common')
  const [chatInput, setChatInput] = useState<string>('')
  const classes = useStyles()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const getUserWatchingList = () =>
    Array(20)
      .fill('')
      .map((_, i) => ({
        id: i,
        user_avatar: '/images/dataVideoFake/fake_avatar.png',
      }))
  return (
    <Box className={classes.container}>
      <Box className={classes.chatHeader}>
        <IconButton className={classes.headerIcon}>
          <img src="/images/ic_collapse_right.svg" />
        </IconButton>
        <Typography className={classes.headerTitle}>{'チャット'}</Typography>
      </Box>
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
        <Box className={classes.chatInputContainer}>
          <IconButton className={classes.iconPurchase}>
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
      <Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer} onClick={onPressDonate}>
        <ButtonPrimary type="submit" round fullWidth>
          {'Donate Points'}
        </ButtonPrimary>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 482,
    width: '100%',
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
    marginTop: 5,
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
}))
export default ChatContainer

import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
// import LoginRequired from '@containers/LoginRequired'

interface OverlayContentProps {
  buttonText?: string
  buttonDescriptionText?: string
  message?: string
  onClickButton?: () => void
}

const OverlayContent: React.FC<OverlayContentProps> = (props) => {
  const classes = useStyles()
  const { buttonText, buttonDescriptionText, message } = props

  return (
    <Box className={classes.container}>
      {/* <LoginRequired> */}
      {buttonText && (
        <ButtonPrimary className={classes.button} onClick={props?.onClickButton}>
          {buttonText}
        </ButtonPrimary>
      )}
      {/* </LoginRequired> */}
      {buttonDescriptionText && <Typography className={classes.buttonDescription}>{buttonDescriptionText}</Typography>}
      {message && <Typography className={classes.message}>{message}</Typography>}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  button: {
    '&.MuiButtonBase-root.button-primary': {
      paddingLeft: '62px',
      paddingRight: '62px',
      height: '50px',
    },
  },
  buttonDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '16px',
  },
  message: {
    marginTop: '35px',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F7F735',
    textAlign: 'center',
  },
  [theme.breakpoints.down(475)]: {
    button: {
      '&.MuiButtonBase-root.button-primary': {
        paddingLeft: '30px',
        paddingRight: '30px',
        height: '40px',
      },
    },
    message: {
      marginTop: '15px',
      fontSize: 12,
      textAlign: 'center',
    },
    buttonDescription: {
      fontSize: 12,
      marginTop: '10px',
    },
  },
}))

export default OverlayContent

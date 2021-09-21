import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'

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
      {buttonText && (
        <ButtonPrimary className={classes.button} onClick={props?.onClickButton}>
          {buttonText}
        </ButtonPrimary>
      )}
      {buttonDescriptionText && <Typography className={classes.buttonDescription}>{buttonDescriptionText}</Typography>}
      {message && <Typography className={classes.message}>{message}</Typography>}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    marginBottom: '91px',
  },
}))

export default OverlayContent

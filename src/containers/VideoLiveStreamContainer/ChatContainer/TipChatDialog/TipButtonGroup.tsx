import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import ESButton from '@components/Button'

type TipButtonGroupProps = {
  formHasError?: boolean
  textAgree?: string
  onClick?: () => void
  onCancel?: () => void
}

const TipButtonGroup: React.FC<TipButtonGroupProps> = ({
  textAgree = i18n.t('common:payment_information_screen.confirm_status_title'),
  onClick,
  onCancel,
  formHasError = false,
}) => {
  const classes = useStyles()

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Button onClick={onCancel} className={`${classes.button} ${classes.backButton}`} disabled={false}>
        <Typography className={classes.backButtonText}>
          {`${i18n.t('common:common.confirm_back')}`}
          {/* {i18n.t('common:live_stream_screen.send')} */}
        </Typography>
      </Button>
      <ESButton onClick={onClick} className={`${classes.button} ${classes.purchaseButton}`} disabled={formHasError}>
        <Typography className={classes.purchaseButtonText}>
          {textAgree}
          {/* {i18n.t('common:live_stream_screen.send')} */}
        </Typography>
      </ESButton>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  button: {
    width: 122,
    height: '28px',
  },
  purchaseButton: {
    backgroundColor: '#FF4786',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#FF4786',
    },
    '&.Mui-disabled': {
      backgroundColor: '#4D4D4D',
      '& $purchaseButtonText': {
        color: Colors.white_opacity['30'],
      },
      '&:hover': {
        backgroundColor: '#4D4D4D !important',
      },
    },
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: '20px',
  },
  backButton: {
    background: 'transparent',
    border: `1px solid ${Colors.white_opacity['70']}`,
    marginRight: 24,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  backButtonText: {
    fontSize: 14,
    color: Colors.white_opacity['70'],
    lineHeight: '20px',
  },
  [theme.breakpoints.down(1401)]: {
    button: {
      width: '35%',
      height: 26,
    },
    backButton: {
      marginRight: '10%',
    },
    purchaseButtonText: {
      fontSize: 12,
    },
    backButtonText: {
      fontSize: 12,
    },
  },
  [theme.breakpoints.down(769)]: {
    purchaseButton: {
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#FF4786',
      },
    },
  },
}))

export default TipButtonGroup

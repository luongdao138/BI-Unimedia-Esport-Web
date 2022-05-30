import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ESButton from '@components/Button'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const PaymentResult: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const [status, setStatus] = useState('')
  const [secondToCloseWindow, setSecond] = useState(6)
  let intervalCountDown = null
  useEffect(() => {
    if (status && isPaymentSuccess(status)) {
      localStorage.setItem('reload_point', Math.random().toString())
      let counter = 6
      intervalCountDown = setInterval(() => {
        if (counter === -1) {
          clearInterval(intervalCountDown)
        } else {
          counter -= 1
          setSecond(counter)
        }
      }, 1000)
    }
  }, [status])

  useEffect(() => {
    if (secondToCloseWindow === 0) {
      window.close()
    }
  }, [secondToCloseWindow])

  useEffect(() => {
    const queryKey = 'status'
    const s = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
    if (typeof s === 'string') {
      setStatus(s || '')
    }
  }, [router])

  const handleCloseClick = () => {
    if (intervalCountDown) {
      clearInterval(intervalCountDown)
    }
    window.close()
    // localStorage.setItem('reload_point', Math.random().toString())
  }

  const isPaymentSuccess = useCallback((result) => {
    return result && result !== 'fail'
  }, [])

  return (
    <Box className={classes.container}>
      {status === 'ok' ? (
        <Typography className={classes.title}>決済が正常に完了しました。</Typography>
      ) : (
        <>
          <Typography className={classes.messError}>お支払いに失敗しました。</Typography>
          <Typography className={classes.messError}>「閉じる」ボタンをクリックして、再度ご購入手続きをお願いいたします。</Typography>
        </>
      )}
      <ESButton
        disabled={!status}
        variant="contained"
        color="primary"
        size="medium"
        round
        className={classes.button}
        onClick={handleCloseClick}
      >
        {t('common:tournament_create.close')} {secondToCloseWindow}
      </ESButton>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '300px',
  },
  button: {
    marginTop: '48px',
  },
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(6),
    color: '#ffff00',
    textAlign: 'center',
  },
  messError: {
    fontSize: 20,
    color: '#ffff00',
    textAlign: 'center',
  },
}))

export default memo(PaymentResult)

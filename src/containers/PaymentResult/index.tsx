import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
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
    if (status) {
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
      localStorage.setItem('reload_point', Math.random().toString())
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
    // window.close()
    localStorage.setItem('reload_point', Math.random().toString())
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>{`${status}`}</Typography>
      <Typography className={classes.title}>{`Close in ${secondToCloseWindow}`}</Typography>
      <ESButton variant="contained" color="primary" size="medium" round className={classes.button} onClick={handleCloseClick}>
        {t('common:tournament_create.close')}
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
    fontSize: 30,
    marginBottom: theme.spacing(6),
  },
}))

export default PaymentResult

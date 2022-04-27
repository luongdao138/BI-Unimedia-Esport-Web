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

  useEffect(() => {
    if (status) {
      localStorage.setItem('reload_point', Math.random().toString())
    }
  }, [status])

  useEffect(() => {
    const queryKey = 'status'
    const s = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))
    if (typeof s === 'string') {
      setStatus(s || '')
    }
  }, [router])

  const handleCloseClick = () => {
    window.close()
  }

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>{status}</Typography>
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

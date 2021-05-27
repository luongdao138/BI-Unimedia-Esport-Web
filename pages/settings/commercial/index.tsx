import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import { Theme, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import React from 'react'

const CommercialPage: PageWithLayoutType = () => {
  const { t } = useTranslation('commercial')
  const classes = useStyles()
  return (
    <div>
      <HeaderWithButton title={t('title')} />
      <Typography className={classes.wrap} paragraph={true}>
        {t('text')}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    whiteSpace: 'pre-line',
    margin: theme.spacing(3),
    padding: theme.spacing(2),
    color: Colors.white_opacity[70],
    background: Colors.black_opacity[70],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
}))

CommercialPage.Layout = MainLayout

export default CommercialPage

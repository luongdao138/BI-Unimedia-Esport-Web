import { useRouter } from 'next/router'
import PageWithLayoutType from '@constants/page'
import { Box, Icon, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import MainLayout from '@layouts/MainLayout'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  header: {
    padding: 16,
    width: '100%',
    position: 'sticky',
    background: Colors.black,
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    height: 60,
    borderBottom: '1px solid #212121',
  },
}))

const NotificaionDetail: PageWithLayoutType = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()
  const { id } = router.query

  return (
    <MainLayout footer={false}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('common:notification.title')}
        </Typography>
      </Box>
      roomID:{id}
    </MainLayout>
  )
}
export default NotificaionDetail

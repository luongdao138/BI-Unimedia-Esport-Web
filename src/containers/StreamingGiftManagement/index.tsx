import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Footer from '@containers/StreamingGiftManagement/footer'
import ButtonPrimary from '@components/ButtonPrimary'
import React from 'react'
import { Colors } from '@theme/colors'
import GiftItem from '@containers/StreamingGiftManagement/giftitem'

const StreamingGiftManagement: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const handleOnNavigateToAddNewReceiver = () => {
    // TODO
  }
  const pageMessage = isMobile ? t('streaming_gift_management.empty_message_md') : t('streaming_gift_management.empty_message')
  const getGiftData = () => Array.from(Array(10).keys())
  return (
    <div>
      <HeaderWithButton title={t('streaming_gift_management.title')} />
      <Box className={classes.listContainer}>
        <span className={classes.label}>{pageMessage}</span>
        <Box className={classes.list}>
          {getGiftData().map((_, index) => {
            return <GiftItem key={index} index={index + 1} />
          })}
        </Box>
        <ButtonPrimary size="small" className={classes.addButton} gradient={false} onClick={handleOnNavigateToAddNewReceiver}>
          {t('streaming_gift_management.add')}
        </ButtonPrimary>
      </Box>
      <Footer />
    </div>
  )
}
const useStyles = makeStyles((theme) => ({
  label: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  list: {
    paddingLeft: '83px',
    paddingRight: '83px',
    width: '100%',
  },
  listContainer: {
    paddingTop: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: '162px',
  },
  addButton: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    margin: '31px 0',
  },
  [theme.breakpoints.down('md')]: {
    label: {
      margin: '0 24px',
    },
    list: {
      paddingLeft: '24px',
      paddingRight: '24px',
      width: '100%',
    },
  },
}))

export default StreamingGiftManagement

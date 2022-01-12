import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Footer from '@containers/StreamingGiftManagement/footer'
import ButtonPrimary from '@components/ButtonPrimary'
import React from 'react'
import { Colors } from '@theme/colors'
import GiftItem from '@containers/StreamingGiftManagement/giftitem'

const StreamingGiftManagement: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const handleOnNavigateToAddNewReceiver = () => {
    // TODO
  }
  return (
    <div>
      <HeaderWithButton title={t('streaming_gift_management.title')} />
      <Box className={classes.listContainer}>
        <Typography className={classes.label}>{t('streaming_gift_management.empty_message')}</Typography>
        <Box className={classes.list}>
          <GiftItem />
        </Box>
        <ButtonPrimary size="small" className={classes.addButton} gradient={false} onClick={handleOnNavigateToAddNewReceiver}>
          {t('streaming_gift_management.add')}
        </ButtonPrimary>
      </Box>
      <Footer />
    </div>
  )
}
const useStyles = makeStyles(() => ({
  label: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
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
  },
  addButton: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    marginTop: '31px',
  },
}))

export default StreamingGiftManagement

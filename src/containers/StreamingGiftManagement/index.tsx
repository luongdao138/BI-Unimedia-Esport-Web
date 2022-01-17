import HeaderWithButton from '@components/HeaderWithButton'
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Footer from '@containers/StreamingGiftManagement/footer'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { useState } from 'react'
import { Colors } from '@theme/colors'
import GiftItem from '@containers/StreamingGiftManagement/giftitem'
import AddPersonTarget from './AddPersonTarget'

const StreamingGiftManagement: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [step, setStep] = useState(1)
  const handleNext = () => {
    setStep(2)
  }
  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <Grid container className={classes.contentContainer}>
            <AddPersonTarget handleAdd={handleNext} />
          </Grid>
        )
      case 2:
        return <StepTwo />
      default:
        return <AddPersonTarget handleAdd={handleNext} />
    }
  }
  return (
    <>
      <HeaderWithButton title={t('streaming_gift_management.title')} />
      {renderContent()}
      <Footer />
    </>
  )
}

const StepTwo = () => {
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
  )
}
const useStyles = makeStyles((theme) => ({
  contentContainer: {},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 24px',
  },
  wrap_check_box: {
    display: 'flex',
    flexDirection: 'row',
  },
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
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      margin: '0 24px',
    },
    list: {
      paddingLeft: '24px',
      paddingRight: '24px',
      width: '100%',
    },
  },
  // [theme.breakpoints.down('sm')]: {
  //   contentContainer: {
  //     display: 'flex',
  //     // width: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  // },
}))

export default StreamingGiftManagement

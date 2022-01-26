import HeaderWithButton from '@components/HeaderWithButton'
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React, { useCallback, useState } from 'react'
import AddPersonTarget from './AddPersonTarget'
import ListTargetPerson from './ListTargetPerson'
import { Colors } from '@theme/colors'
import Footer from './footer'
// import useGiftManage from './useGiftTarget'

const StreamingGiftManagement: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(414))
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(1)
  }

  const renderContent = useCallback(() => {
    switch (step) {
      case 1:
        return <ListTargetPerson handlePress={() => setStep(2)} handleFooterConfirm={() => setStep(3)} />
      case 2:
        return (
          <Grid container className={classes.contentContainer}>
            <AddPersonTarget handleSuccess={handleNext} />
          </Grid>
        )
      case 3:
        return (
          <Box className={classes.labelContainer}>
            <span className={classes.label}>
              {isMobile ? t('streaming_gift_management.message_gift_success_sp') : t('streaming_gift_management.message_gift_success')}
            </span>
          </Box>
        )
      default:
        return <AddPersonTarget handleSuccess={handleNext} />
    }
  }, [setStep, step])

  return (
    <>
      <HeaderWithButton title={t('streaming_gift_management.title')} />
      {renderContent()}
      {step === 3 && <Footer success />}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: '200px',
    color: Colors.white_opacity['70'],
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  [theme.breakpoints.down('md')]: {
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}))

export default StreamingGiftManagement

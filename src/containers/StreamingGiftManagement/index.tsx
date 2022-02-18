import HeaderWithButton from '@components/HeaderWithButton'
import { Box, Grid, makeStyles, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import React, { useCallback, useState } from 'react'
import PersonTarget from './PersonTarget'
import ListTargetPerson from './ListTargetPerson'
import { Colors } from '@theme/colors'
import Footer from './footer'
import useGiftManage from '@containers/StreamingGiftManagement/useGiftTarget'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useToast from '@utils/hooks/useToast'
import i18n from '@locales/i18n'

export const MODE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
}

const StreamingGiftManagement: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(414))
  const [step, setStep] = useState(1)
  const [addNewErrorMessage, setErrorMessage] = useState('')
  const [mode, setMode] = useState('')
  const [idTargetPerson, setIdTargetPerson] = useState('')
  const { addToast } = useToast()

  const { addNewGiftMaster, giftTargetData, resetTargetPersonData } = useGiftManage()

  const handleNext = () => {
    setStep(1)
  }

  const handleAddPersonPress = () => {
    setMode(MODE.ADD)
    setStep(2)
  }

  const handleUpdatePersonPress = useCallback((id: string) => {
    setMode(MODE.UPDATE)
    setStep(2)
    setIdTargetPerson(id)
  }, [])

  const addNewGiftMasterSuccessCallback = () => {
    setStep(3)
    addToast(i18n.t('common:streaming_gift_management.toast_message_success'))
    resetTargetPersonData()
  }

  const addNewGiftMasterErrorCallback = (message) => {
    setErrorMessage(message)
  }
  const handleFooterConfirmClick = () => {
    setErrorMessage('')
    addNewGiftMaster(addNewGiftMasterSuccessCallback, addNewGiftMasterErrorCallback)
  }

  const handleOnNavigateBackToStreamSettingScreen = () => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  const renderContent = useCallback(() => {
    switch (step) {
      case 2:
        return (
          <Grid container className={classes.contentContainer}>
            <PersonTarget handleSuccess={handleNext} mode={mode} idTargetPerson={idTargetPerson} />
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
        return <ListTargetPerson handlePress={handleAddPersonPress} handleModeUpdate={handleUpdatePersonPress} />
    }
  }, [addNewErrorMessage, setStep, step, giftTargetData])
  return (
    <>
      <HeaderWithButton title={t('streaming_gift_management.title')} />
      {renderContent()}
      <Footer
        step={step}
        onCancel={handleOnNavigateBackToStreamSettingScreen}
        onConfirm={handleFooterConfirmClick}
        errorMessage={addNewErrorMessage}
      />
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

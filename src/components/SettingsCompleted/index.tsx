import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, IconButton } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { TwitterShareButton } from 'react-share'

type Props = {
  title?: string
  titleNotification?: string
  messageNotification?: string
  onClose: () => void
  onComplete: () => void
  titleButton?: string
  isShare?: boolean
  titlePost?: string
  contentPost?: string
}

const SettingsCompleted: React.FC<Props> = ({
  titleNotification,
  messageNotification,
  onClose,
  onComplete,
  titleButton,
  isShare = false,
  titlePost,
  contentPost,
}) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  return (
    <Box>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2}>
          <IconButton className={classes.iconButtonBg} onClick={onClose}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" className={classes.wrapContent}>
          <Typography variant="h2" className={classes.headerStep3}>
            {titleNotification || t('common:streaming_setting_screen.complete_delivery_settings')}
          </Typography>
          <Typography variant="subtitle1" className={classes.contentStep3}>
            {messageNotification || t('common:streaming_setting_screen.step3_delivery_settings_content')}
          </Typography>
          {isShare ? (
            <TwitterShareButton
              title={titlePost}
              url={contentPost}
              onShareWindowClose={onComplete}
              resetButtonStyle={false}
              style={{ opacity: 1, backgroundColor: 'transparent', border: 0 }}
            >
              <Box className={classes.redirectButton}>
                <ButtonPrimary fullWidth round>
                  {titleButton || t('common:streaming_setting_screen.step3_close_btn')}
                </ButtonPrimary>
              </Box>
            </TwitterShareButton>
          ) : (
            <Box className={classes.redirectButton} onClick={onComplete}>
              <ButtonPrimary fullWidth round>
                {titleButton || t('common:streaming_setting_screen.step3_close_btn')}
              </ButtonPrimary>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    topContainer: {
      paddingTop: 0,
    },
  },
  box: {
    paddingLeft: 0,
  },
  headerStep3: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: '30px',
  },
  contentStep3: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: 'normal',
    paddingBottom: '144px',
    textAlign: 'center',
  },
  redirectButton: {
    width: '220px',
  },
  wrapContent: {
    padding: '53px 40px 0 40px',
  },
  [theme.breakpoints.down(414)]: {
    wrapContent: {
      padding: '53px 20px 0 20px',
    },
  },
  [theme.breakpoints.down(375)]: {
    wrapContent: {
      padding: '53px 0 0 0',
    },
  },
}))

export default SettingsCompleted

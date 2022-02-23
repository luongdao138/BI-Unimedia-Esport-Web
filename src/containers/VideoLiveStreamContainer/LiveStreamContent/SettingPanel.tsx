import React from 'react'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

export type SettingResult = {
  resolution?: string
}

type Props = {
  isLive?: boolean
  handleOnQualityChangeClick?: () => void
  handleOnReportClick?: () => void
  handleOnPlaySpeedClick: () => void
  settingResult?: SettingResult
}

const SettingPanel: React.FC<Props> = ({ isLive, handleOnQualityChangeClick, handleOnReportClick, settingResult }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  return (
    <Box className={classes.container}>
      {!isLive && (
        <Box onClick={handleOnQualityChangeClick} className={classes.row}>
          <Typography className={classes.text}>{t('videos_top_tab.play_speed')}</Typography>
          <Box className={classes.iconContainer}>
            <Typography>{t('videos_top_tab.standard')}</Typography>
            <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
          </Box>
        </Box>
      )}
      <Box onClick={handleOnQualityChangeClick} className={classes.row}>
        <Typography className={classes.text}>{t('videos_top_tab.resolution_select')}</Typography>
        <Box className={classes.iconContainer}>
          <Typography>{settingResult.resolution}</Typography>
          <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
        </Box>
      </Box>
      <Box onClick={handleOnReportClick} className={classes.row}>
        <Typography className={classes.text}>{t('videos_top_tab.report_setting')}</Typography>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: Colors.black_opacity[70],
    borderRadius: '10px',
    position: 'absolute',
    bottom: '64px',
    right: '45px',
    paddingTop: '8px',
    paddingBottom: '8px',
    width: '260px',
  },
  row: {
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  text: {
    fontSize: '10px',
    color: Colors.white,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: '8px',
  },
}))
export default SettingPanel

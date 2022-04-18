import React, { memo } from 'react'
import { Box, Icon, makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { SettingPanelState } from './ControlBar'
import { CommonHelper } from '@utils/helpers/CommonHelper'

type Props = {
  handleOnBackClick?: () => void
  resolutionList: Array<any>
  selectedResolution?: string
  onSelected?: (item: string, index?: number) => void
  typeSetting?: any
}

const VideoResolutionPanel: React.FC<Props> = ({
  handleOnBackClick,
  resolutionList,
  selectedResolution = '1080p',
  onSelected,
  typeSetting,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  const RadioButton = ({ title, selected, onClick }) => {
    return (
      <Box
        className={classes.radioContainer}
        onClick={(e) => {
          // e.preventDefault()
          CommonHelper.disableOnClickEvent(e)
          onClick()
        }}
      >
        <Box className={`${classes.radio} ${selected ? classes.radioSelected : classes.radioUnselected}`} />
        <Typography className={classes.radioTitle}>{title}</Typography>
      </Box>
    )
  }
  return (
    <Box
      className={classes.container}
      onClick={(e) => {
        CommonHelper.disableOnClickEvent(e)
        // e.stopPropagation()
      }}
    >
      <Box className={classes.header}>
        <Icon
          onClick={(e) => {
            CommonHelper.disableOnClickEvent(e)
            // e.stopPropagation()
            handleOnBackClick()
          }}
          className={`fas fa-chevron-left ${classes.backIcon}`}
          fontSize="small"
        />
        <Typography className={classes.textHeader}>
          {typeSetting === SettingPanelState.VIDEO_RESOLUTION
            ? t('videos_top_tab.resolution_select')
            : typeSetting === SettingPanelState.PLAY_SPEED && t('videos_top_tab.play_speed')}
        </Typography>
      </Box>
      {resolutionList.map((item, index) => {
        return (
          <RadioButton
            key={`RadioButton-${item}`}
            title={item}
            selected={item === selectedResolution}
            onClick={() => {
              onSelected(item, index)
            }}
          />
        )
      })}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  radioTitle: {
    marginLeft: '16px',
    fontSize: '10px',
    color: Colors.white,
  },
  radioContainer: {
    cursor: 'pointer',
    padding: '4px 24px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: '9px',
    height: '9px',
    borderRadius: '5px',
  },
  radioSelected: {
    backgroundColor: Colors.white,
  },
  radioUnselected: {
    border: '1px solid #FFFFFF',
  },
  container: {
    backgroundColor: Colors.black_opacity[70],
    borderRadius: '10px',
    position: 'absolute',
    bottom: '64px',
    right: '45px',
    paddingTop: '12px',
    paddingBottom: '12px',
    width: '260px',
  },
  textHeader: {
    fontSize: '10px',
    color: Colors.white,
    marginLeft: '8px',
  },
  text: {
    fontSize: '10px',
    color: Colors.white,
  },
  header: {
    marginLeft: '16px',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: `1px solid ${Colors.white_opacity['50']}`,
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  backIcon: {
    cursor: 'pointer',
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      bottom: '40px',
    },
  },
}))
export default memo(VideoResolutionPanel, (prev, next) => {
  if (prev.selectedResolution !== next.selectedResolution) {
    return false
  }
  return true
})

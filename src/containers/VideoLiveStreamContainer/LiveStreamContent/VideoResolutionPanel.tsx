import React from 'react'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

type Props = {
  handleOnBackClick?: () => void
  resolutionList: Array<any>
  selectedResolution: string
}

const VideoResolutionPanel: React.FC<Props> = ({ handleOnBackClick, resolutionList, selectedResolution = '1080p' }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const RadioButton = ({ title, selected }) => {
    return (
      <Box className={classes.radioContainer}>
        <Box className={`${classes.radio} ${selected ? classes.radioSelected : classes.radioUnselected}`} />
        <Typography className={classes.radioTitle}>{title}</Typography>
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Icon onClick={handleOnBackClick} className={`fas fa-chevron-left ${classes.backIcon}`} fontSize="small" />
        <Typography className={classes.textHeader}>{t('videos_top_tab.resolution_select')}</Typography>
      </Box>
      {resolutionList.map((item) => {
        return <RadioButton key={`RadioButton-${item}`} title={item} selected={item === selectedResolution} />
      })}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
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
}))
export default VideoResolutionPanel

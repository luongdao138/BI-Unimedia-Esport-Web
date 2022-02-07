import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Icon, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ESSelect from '@components/Select'
import ESButton from '@components/Button'

type Props = {
  handleOnBackClick?: () => void
  handleOnSendClick?: () => void
}

const ReportPanel: React.FC<Props> = ({ handleOnBackClick }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const reportItems = [
    t('videos_top_tab.report_reason_interrupt'),
    t('videos_top_tab.report_reason_delayed'),
    t('videos_top_tab.report_reason_video_can_not_load'),
    t('videos_top_tab.report_reason_video_can_not_play'),
  ]
  const [selectReportItem, setSelectReportItem] = useState('')

  const handleChange = (event) => {
    setSelectReportItem(event.target.value)
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Icon onClick={handleOnBackClick} className={`fas fa-chevron-left ${classes.backIcon}`} fontSize="small" />
        <Typography className={classes.textHeader}>{t('videos_top_tab.report_setting')}</Typography>
      </Box>
      <Box className={classes.pickerContainer}>
        <ESSelect id="title" name="title" fullWidth value={selectReportItem} onChange={handleChange} required={false} disabled={false}>
          <option disabled value={''}>
            {''}
          </option>
          {reportItems.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </ESSelect>
        <ESButton className={classes.sendButton} fullWidth>
          <Typography className={classes.text}>{t('videos_top_tab.send')}</Typography>
        </ESButton>
        <Typography className={classes.successMessage}>{t('videos_top_tab.success_message')}</Typography>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  successMessage: {
    width: '100%',
    textAlign: 'center',
    fontSize: '8px',
    color: Colors.yellow,
    marginTop: '16px',
  },
  pickerContainer: {
    marginLeft: '24px',
    marginRight: '24px',
  },
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
  reasonPicker: {
    '&.MuiSelect-select': {},
  },
  sendButton: {
    marginTop: '16px',
    border: '1px solid #FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
  },
}))

export default ReportPanel

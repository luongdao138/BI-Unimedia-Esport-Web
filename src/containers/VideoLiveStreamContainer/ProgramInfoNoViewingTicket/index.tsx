import { Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface InfoSectionProps {
  title?: string
  containerClass?: string
  content?: string
}

interface ProgramInfoProps {
  videoInfo?: any
}

const ProgramInfoNoViewingTicket: React.FC<ProgramInfoProps> = ({ videoInfo }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const InfoSection = (props: InfoSectionProps) => {
    const { title, containerClass, content } = props
    return (
      <Box className={`${classes.infoSectionContainer} ${containerClass}`}>
        <Typography className={classes.infoSectionTitle}>{title}</Typography>
        <Box className={classes.infoContent}>
          <Typography className={classes.infoSectionContent}>{content}</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.infoFirstRow}>
        <InfoSection
          title={t('live_stream_screen.delivery_start_date_and_time')}
          content={CommonHelper.formatDateTimeJP(videoInfo?.stream_schedule_start_time)}
        />
        <InfoSection
          title={t('live_stream_screen.ticket_sales_date_and_time')}
          containerClass={classes.infoRowRightItem}
          content={CommonHelper.formatDateTimeJP(videoInfo?.sell_ticket_start_time)}
        />
      </Box>
      <Box className={classes.infoSecondRow}>
        <InfoSection
          title={t('live_stream_screen.archive_publication_period')}
          content={CommonHelper.formatDateTimeJP(videoInfo?.archived_end_time)}
        />
        <InfoSection
          title={t('live_stream_screen.point_required_for_viewing')}
          containerClass={classes.infoRowRightItem}
          content={`${FormatHelper.currencyFormat(videoInfo?.ticket_price)} eXeポイント`}
        />
      </Box>
      <InfoSection title={t('live_stream_screen.explanation')} containerClass={classes.infoLastItem} content={videoInfo?.description} />
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    width: '100%',
    paddingLeft: '22px',
    paddingRight: '16px',
    flexDirection: 'column',
  },
  infoSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoSectionTitle: {
    fontSize: 14,
    color: 'white',
  },
  infoFirstRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: '38px',
  },
  infoRowRightItem: {
    marginLeft: '81px',
  },
  infoContent: {
    marginTop: '9px',
    padding: '16px 14px',
    backgroundColor: 'black',
    border: '1px solid #4c4c4c',
    borderRadius: '4px',
    width: '100%',
  },
  infoSectionContent: {
    color: 'white',
  },
  infoSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: '16px',
  },
  infoLastItem: {
    marginTop: '20px',
  },
}))
export default ProgramInfoNoViewingTicket

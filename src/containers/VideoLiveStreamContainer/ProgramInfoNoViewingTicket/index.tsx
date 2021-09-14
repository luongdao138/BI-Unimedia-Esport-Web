import { Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import BannerCarousel from '@containers/VideosTopContainer/BannerCarousel'

interface InfoSectionProps {
  title?: string
  containerClass?: string
  content?: string
}

const ProgramInfoNoViewingTicket: React.FC = () => {
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
  const dataBanner = [
    // { id: 0, url: '/images/banners/banner_01.png', target: 'image_01' },
    // { id: 1, url: '/images/banners/banner_02.png', target: 'image_02' },
    { id: 2, image: '/images/banners/banner_03.png', target: 'image_03' },
    { id: 3, image: '/images/banners/banner_04.png', target: 'image_04' },
    { id: 4, image: '/images/banners/banner_05.png', target: 'image_05' },
    { id: 5, image: 'https://i.pinimg.com/564x/16/c7/44/16c744a2c5187694bfb9f2d220dc4f16.jpg', target: 'image_06' },
    { id: 6, image: 'https://i.pinimg.com/236x/c4/7e/52/c47e523f07996bd610f1e1ecfa842ebb.jpg', target: 'image_07' },
    { id: 7, image: 'https://i.pinimg.com/564x/09/b5/27/09b52762cc9d8aee221ebb6a062dee98.jpg', target: 'image_08' },
    { id: 8, image: 'https://i.pinimg.com/564x/b1/1e/0c/b11e0cbe33201bac50a28b214bb459bf.jpg', target: 'image_09' },
  ]

  return (
    <Box className={classes.container}>
      {dataBanner.length > 0 && (
        <BannerCarousel
          data={dataBanner}
          bannerHeight={189}
          bannerCurrentVisibleSlide={1}
          bannerMaxVisibleSlide={1}
          bannerCustomScales={[1, 0.85]}
          buttonLeftContainer={{
            top: '33%',
          }}
          buttonRightContainer={{
            top: '33%',
          }}
        />
      )}
      <Box className={classes.infoFirstRow}>
        <InfoSection title={t('live_stream_screen.delivery_start_date_and_time')} content={'2021年7月31日 18時00分～19時30分'} />
        <InfoSection
          title={t('live_stream_screen.ticket_sales_date_and_time')}
          containerClass={classes.infoRowRightItem}
          content={'2021年6月30日 18時00分～アーカイブ公開期間の前日'}
        />
      </Box>
      <Box className={classes.infoSecondRow}>
        <InfoSection title={t('live_stream_screen.archive_publication_period')} content={'配信終了後から30日後の23時59分まで'} />
        <InfoSection
          title={t('live_stream_screen.point_required_for_viewing')}
          containerClass={classes.infoRowRightItem}
          content={`${FormatHelper.currencyFormat('2500')} eXeポイント`}
        />
      </Box>
      <InfoSection
        title={t('live_stream_screen.explanation')}
        containerClass={classes.infoLastItem}
        content={
          'ここに番組説明が入りまここに番組説明が入りますここに番組説明が入りますここに番組説明が入りますここに番組説明が入りますす。' +
          'ここに番組説明が入りますここに番組説明が入りますここに番組説明が入りますここに番組説明が入りますここに番組説明が入りますここに'
        }
      />
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

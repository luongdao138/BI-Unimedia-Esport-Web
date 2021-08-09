import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import ESLabel from '@components/Label'
import CoverUploaderStream from '@containers/arena/UpsertForm/Partials/CoverUploaderStream'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'

interface Step02Props {
  onNext: (step: number) => void
}

const Step02: React.FC<Step02Props> = ({ onNext }) => {
  // const onSubmitClicked = (): void => {}
  const [showPreview, setShowPreview] = useState(false)
  const classes = useStyles()
  const { checkNgWord } = useCheckNgWord()
  const { t } = useTranslation(['common'])
  const content = 'sample@exelab.jp'
  const check_title = checkNgWord([content])
  useEffect(() => {
    if (_.isEmpty(check_title)) {
      setShowPreview(true)
    }
  }, [])
  const onClickNext = () => {
    onNext(3)
  }

  return (
    <Box pb={9} py={4} className={classes.container}>
      <Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'https://exelab.jp/xxxxxxxxxxxxxxxxxx'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_url')}
            required
            disabled={true}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.thumbnail')} required={true} />
          <Box pt={1} className={classes.box}>
            <Grid item xs={6}>
              <CoverUploaderStream src={''} isUploading={false} disabled={true} size="big" />
            </Grid>
          </Box>
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'テキストテキストテキストテキストここの文字数制限あるの'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_title')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={
              '番組概要テキストテキストテキストテキストテキストテキストテキストテキスト\n' +
              'テキストテキストテキストテキストテキストテキストテキストテキストテキス\n' +
              'トテキストテキストテキストテキストテキストテキストテキストテキストテキ\n' +
              'ストテキストテキストテ\n' +
              'https://sample.jp テキストテキスト'
            }
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_description')}
            multiline={true}
            required
            disabled={true}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'ゲーム：Apex Legends'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_stream_category')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'2021年6月20日 10:00'}
            fullWidth
            labelPrimary={i18n.t('common:delivery_reservation_tab.notification_datetime')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'2021年7月1日 15:45'}
            fullWidth
            labelPrimary={i18n.t('common:delivery_reservation_tab.scheduled_delivery_start_datetime')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'2021年7月1日 18:45'}
            fullWidth
            labelPrimary={i18n.t('common:delivery_reservation_tab.scheduled_end_datetime')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'利用しない'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.ticket_use')}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>

        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'1,500 eXeポイント'}
            fullWidth
            labelPrimary={''}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>

        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'2021年6月20日'}
            fullWidth
            labelPrimary={i18n.t('common:delivery_reservation_tab.ticket_sales_start_datetime')}
            required
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={'共有する'}
            fullWidth
            labelPrimary={t('common:streaming_settings_live_streaming_screen.share_SNS')}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_url')}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={2}>
          <ESInput
            id="title"
            name="title"
            value={i18n.t('common:streaming_settings_live_streaming_screen.stream_mask')}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.stream_key')}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box pb={1}>
          <ESInput
            id="title"
            name="title"
            value={'公開する'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.publish_delivery')}
            multiline={true}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pt')}
        </Typography>
        <Typography className={classes.captionNote}>
          {i18n.t('common:streaming_settings_live_streaming_screen.note_for_publish_delivery_pb')}
        </Typography>
        <Grid item xs={6} sm={8} md={8} lg={6}>
          <Box className={classes.actionButtonContainer}>
            <Box className={classes.actionButton}>
              <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large">
                {t('common:common.cancel')}
              </ESButton>
            </Box>
            <Box className={classes.actionButton}>
              <ButtonPrimary round fullWidth onClick={onClickNext}>
                {t('common:streaming_settings_live_streaming_screen.start_live_stream')}
              </ButtonPrimary>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default Step02
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.Mui-disabled': {
      color: Colors.white_opacity['70'],
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        padding: 0,
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      padding: 0,
      // paddingBottom: theme.spacing(1),
    },
  },
  [theme.breakpoints.up('md')]: {
    container: {
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
  },
  urlCopy: {
    marginLeft: 20,
    cursor: 'pointer',
    color: '#EB5686',
  },
  link: {
    marginRight: 5,
    fontSize: 14,
    paddingTop: 3,
  },
  box: {
    paddingLeft: 0,
  },
  overviewText: {
    fontSize: 14,
    color: 'white',
  },
  captionNote: {
    fontSize: 12,
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 27,
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      flexDirection: 'column-reverse',
    },
  },
  actionButton: {
    width: theme.spacing(27.5),
    margin: 8,
  },
  cancelBtn: {
    padding: '12px 22px',
  },
}))

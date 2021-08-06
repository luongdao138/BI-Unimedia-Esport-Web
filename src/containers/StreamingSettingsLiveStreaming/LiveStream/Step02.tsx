import { Box, Grid, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import ESButton from '@components/Button'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import _ from 'lodash'
import ESLabel from '@components/Label'
import CoverUploaderStream from '@containers/arena/UpsertForm/Partials/CoverUploaderStream'

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
        <Box>
          <ESInput
            id="title"
            name="title"
            value={'https://exelab.jp/xxxxxxxxxxxxxxxxxx'}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_input_url')}
            required
            disabled={true}
            size="small"
            classes={{ root: classes.root }}
          />
        </Box>
        <Box paddingBottom={1} />
        <Box>
          <ESLabel label={i18n.t('common:streaming_settings_live_streaming_screen.thumbnail')} required={true} />
          <Box pb={4} className={classes.box}>
            <Grid item xs={9}>
              <CoverUploaderStream src={''} isUploading={false} disabled={true} size="big" />
            </Grid>
          </Box>
        </Box>
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
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
        <Box paddingBottom={1} />
        <Box mt={1}>
          <ESInput
            id="title"
            name="title"
            value={
              '公開する\n' +
              '※チェックを入れた場合、TOPページの一覧に表示されます。\n' +
              '　ただし、チェックを入れなくてもURLを知っていた場合は配信画面へアクセスすることは可能です。'
            }
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.publish_delivery')}
            multiline={true}
            disabled={showPreview}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>
      </Box>
      <ESButton onClick={onClickNext}></ESButton>
    </Box>
  )
}

export default Step02
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.Mui-disabled': {
      color: 'white',
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
}))

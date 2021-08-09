import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import i18n from '@locales/i18n'
import React, { FC, useState } from 'react'
import { Colors } from '@theme/colors'
import ESButton from '@components/Button'
import ButtonPrimary from '@components/ButtonPrimary'
import { useTranslation } from 'react-i18next'
import SnsInfoStream from '@components/SnsInfoStream'

interface Step02Props {
  onNext: (step: number) => void
}

const Step02: FC<Step02Props> = ({ onNext }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [profile, setProfile] = useState([])
  const [showPreview] = useState(true)
  const onBasicInfoChanged = (data): void => {
    setProfile((prevState) => {
      return { ...prevState, ...data }
    })
  }
  const handleError = () => {
    // console.log('handleError')
  }

  const onClickNext = () => {
    onNext(3)
  }
  const onPrev = () => {
    onNext(1)
  }
  return (
    <Box pb={9} py={4} className={classes.container}>
      <Box>
        <Box pb={2}>
          <ESInput
            id="channelName"
            name="channelName"
            fullWidth
            required={true}
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_channel_name')}
            value={'テキストテキストテキストテキストここの文字数制限'}
            disabled={true}
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
              'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテ\n' +
              'https://sample.jp テキストテキスト'
            }
            multiline={true}
            rows={4}
            fullWidth
            labelPrimary={i18n.t('common:streaming_settings_live_streaming_screen.label_overview')}
            required
            disabled={true}
            size="big"
            classes={{ root: classes.root }}
          />
        </Box>

        <Box pb={4} className={classes.box}>
          <Grid item xs={9}>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:user_profile.sns')}
            </Typography>
            <SnsInfoStream showPreview={showPreview} profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
          </Grid>
        </Box>

        <Grid item xs={6} sm={8} md={8} lg={6}>
          <Box className={classes.actionButtonContainer}>
            <Box className={classes.actionButton}>
              <ESButton className={classes.cancelBtn} variant="outlined" round fullWidth size="large" onClick={onPrev}>
                {t('common:common.cancel')}
              </ESButton>
            </Box>
            <Box className={classes.actionButton}>
              <ButtonPrimary round fullWidth onClick={onClickNext}>
                {t('common:streaming_settings_live_streaming_screen.save_channel_live_info')}
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
  actionButton: {
    width: theme.spacing(27.5),
    margin: 8,
  },
  cancelBtn: {
    padding: '12px 22px',
  },
  [theme.breakpoints.up('md')]: {
    container: {
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
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
      paddingBottom: theme.spacing(1),
    },
  },
}))

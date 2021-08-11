import { useEffect, useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import * as actions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import useProfileEdit from './useProfileEdit'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import BasicInfo from '@components/BasicInfo'
import NameInfo from '../Partials/NameInfo'
import SnsInfo from '../Partials/SnsInfo'
import TagSelectDialog from '../Partials/TagSelectDialog'
import useGetProfile from '@utils/hooks/useGetProfile'
import useGetPrefectures from '@containers/UserSettings/useGetPrefectures'
import useSettings from '@containers/UserSettings/useSettings'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { showDialog } from '@store/common/actions'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import _ from 'lodash'

const ProfileEditContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { features, getFeatures } = useSettings()
  const { prefectures, getPrefectures } = useGetPrefectures()
  // const { nicknames2, getNicknames, profileEdit, meta, resetMeta } = useProfileEdit()
  const { getNicknames, profileEdit, meta, resetMeta } = useProfileEdit()
  // const [nicknameData, setNicknameData] = useState([])
  const { userProfile, getUserProfileMeta } = useGetProfile()
  const [profile, setProfile] = useState(null)
  const [hasError, setError] = useState(false)
  const [isValidDate, setValidDate] = useState(false)
  const { checkNgWordByField } = useCheckNgWord()
  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.attributes)
    }
  }, [userProfile])

  // useEffect(() => {
  //   if (nicknames2) {
  //     setNicknameData(nicknames2)
  //   }
  // }, [nicknames2])

  useEffect(() => {
    if (meta.loaded && !meta.error) {
      resetMeta()
      dispatch(actions.addToast(i18n.t('common:messages.profile_updated')))
      router.push(ESRoutes.PROFILE)
    } else if (meta.error) {
      dispatch(actions.addToast(i18n.t('common:error.failed')))
    }
  }, [meta.loaded])

  useEffect(() => {
    getNicknames()
    getFeatures()
    getPrefectures(true)
  }, [])

  const onBasicInfoChanged = (data) => {
    setProfile((prevState) => {
      return { ...prevState, ...data }
    })
  }

  const onFeatureSelect = (selectedFeatures) => {
    setProfile((prevState) => {
      return { ...prevState, features: selectedFeatures }
    })
  }

  const handleError = (errors) => {
    setError(!_.isEmpty(errors))
  }

  const trimField = (profile, field) => {
    if (_.isString(profile[field])) profile[field] = profile[field].trim()
  }

  const handleSubmit = () => {
    const failedFields = checkNgWordByField({
      [i18n.t('common:profile.nickname')]: profile.nickname,
      [i18n.t('common:profile.bio_section')]: profile.bio,
      [i18n.t('common:profile.discord')]: profile.discord_link,
      [i18n.t('common:profile.facebook')]: profile.facebook_link,
      [i18n.t('common:profile.instagram')]: profile.instagram_link,
      [i18n.t('common:profile.twitch')]: profile.twitch_link,
      [i18n.t('common:profile.twitter')]: profile.twitter_link,
    })
    if (_.isEmpty(failedFields)) {
      const newProfile = _.cloneDeep(profile)
      const fields = ['nickname', 'bio', 'discord_link', 'facebook_link', 'instagram_link', 'twitch_link', 'twitter_link']
      for (const field of fields) {
        trimField(newProfile, field)
      }
      profileEdit({ ...newProfile, features: _.map(profile.features, (feature) => feature.id) })
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: failedFields.join(', ') }))
    }
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={() => router.push(ESRoutes.PROFILE)}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>{<Typography variant="h2">{i18n.t('common:user_profile.edit_profile')}</Typography>}</Box>
        </Box>

        {profile && getUserProfileMeta.loaded && (
          <Box>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:register_profile.nickname')}
            </Typography>
            <NameInfo profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:profile.tag')}
            </Typography>
            <TagSelectDialog selected={profile.features} features={features} onFeatureSelect={onFeatureSelect} max={5} />
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:profile.basic_info')}
            </Typography>
            <Box paddingX={3}>
              <BasicInfo profile={profile} prefectures={prefectures} onDataChange={onBasicInfoChanged} handleDateError={setValidDate} />
            </Box>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {i18n.t('common:user_profile.sns')}
            </Typography>
            <SnsInfo profile={profile} onDataChange={onBasicInfoChanged} handleError={handleError} />
          </Box>
        )}

        <Box className={classes.blankSpace}></Box>
      </Box>

      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth disabled={hasError || isValidDate} onClick={handleSubmit}>
              {i18n.t('common:common.save')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
      <ESLoader open={getUserProfileMeta.pending || meta.pending} />
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    paddingRight: theme.spacing(6),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.black,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default ProfileEditContainer

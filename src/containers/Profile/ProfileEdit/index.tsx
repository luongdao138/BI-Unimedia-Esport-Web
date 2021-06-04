import { useEffect, useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useProfileEdit from './useProfileEdit'
import ESToast from '@components/Toast'
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
import _ from 'lodash'

const ProfileEditContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  const { features, getFeatures } = useSettings()
  const { prefectures, getPrefectures } = useGetPrefectures()
  const { nicknames2, getNicknames, profileEdit, meta, resetMeta } = useProfileEdit()
  const [nicknameData, setNicknameData] = useState([])
  const { userProfile, getUserProfileMeta } = useGetProfile()
  const [profile, setProfile] = useState(null)
  const [hasError, setError] = useState(false)
  const [isValidDate, setValidDate] = useState(false)

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.attributes)
    }
  }, [userProfile])

  useEffect(() => {
    if (nicknames2) {
      setNicknameData(nicknames2)
    }
  }, [nicknames2])

  useEffect(() => {
    if (meta.loaded && !meta.error) {
      resetMeta()
      router.push(ESRoutes.PROFILE)
    }
  }, [meta.loaded])

  useEffect(() => {
    getNicknames()
    getFeatures()
    getPrefectures()
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

  const handleSubmit = () => {
    profileEdit({ ...profile, features: _.map(profile.features, (feature) => feature.id) })
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={() => router.push(ESRoutes.PROFILE)}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>{<Typography variant="h2">{t('common:user_profile.edit_profile')}</Typography>}</Box>
        </Box>

        {profile && getUserProfileMeta.loaded && (
          <Box>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {t('common:register_profile.nickname')}
            </Typography>
            <NameInfo profile={profile} nicknameData={nicknameData} onDataChange={onBasicInfoChanged} handleError={handleError} />
            <Typography variant="h3" gutterBottom className={classes.label}>
              {t('common:profile.tag')}
            </Typography>
            <TagSelectDialog selected={profile.features} features={features} onFeatureSelect={onFeatureSelect} />
            <Typography variant="h3" gutterBottom className={classes.label}>
              {t('common:profile.basic_info')}
            </Typography>
            <Box paddingX={3}>
              <BasicInfo profile={profile} prefectures={prefectures} onDataChange={onBasicInfoChanged} handleDateError={setValidDate} />
            </Box>
            <Typography variant="h3" gutterBottom className={classes.label}>
              {t('common:user_profile.sns')}
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
              {t('common:common.save')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
      <ESLoader open={getUserProfileMeta.pending || meta.pending} />
      {!!meta.error && <ESToast open={!!meta.error} message={t('common:error.failed')} resetMeta={resetMeta} />}
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

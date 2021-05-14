import { useEffect, useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import GameSelector from '@components/GameSelector'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useGameEdit from './useGameEdit'
import ESToast from '@components/Toast'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import useGetProfile from '@utils/hooks/useGetProfile'
import { ESRoutes } from '@constants/route.constants'
import { GameTitle } from '@services/game.service'
import { useRouter } from 'next/router'
import _ from 'lodash'

const GameEditContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()

  const { gameEdit, resetMeta, meta } = useGameEdit()
  const { userProfile, getUserProfileMeta } = useGetProfile()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile.attributes)
    }
  }, [userProfile])

  useEffect(() => {
    if (meta.loaded && !meta.error) {
      resetMeta()
      router.push(ESRoutes.PROFILE)
    }
  }, [meta.loaded])

  const onGameChange = (games: GameTitle['attributes'][]) => {
    setProfile({ ...profile, game_titles: games })
  }

  const handleSubmit = () => {
    gameEdit({ game_titles: _.map(profile.game_titles, (g) => g.id) })
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={() => router.push(ESRoutes.PROFILE)}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>{<Typography variant="h2">{t('common:user_profile.choose_game')}</Typography>}</Box>
        </Box>

        {profile && getUserProfileMeta.loaded && (
          <Box>
            <GameSelector values={profile.game_titles} onChange={onGameChange} />
          </Box>
        )}

        <Box className={classes.blankSpace}></Box>
      </Box>

      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth onClick={handleSubmit}>
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

export default GameEditContainer

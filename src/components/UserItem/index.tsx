import { useState, useEffect } from 'react'
import { Grid, Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import * as services from '@services/search.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/hooks/useGetProfile'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  data: any
  isFollowed?: boolean
  handleClick?: () => void
}

const UserListItem: React.FC<Props> = ({ data, isFollowed, handleClick }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const user = data.attributes
  const { userProfile } = useGetProfile()

  const [followed, setFollowed] = useState<boolean | undefined>(isFollowed)
  const [mounted, setMounted] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    return () => setMounted(false)
  }, [])

  const follow = async () => {
    setLoading(true)
    try {
      await services.follow({ user_id: Number(data.id) })
      if (mounted) {
        setFollowed(true)
        setLoading(false)
      }
    } catch (error) {
      if (mounted) {
        setLoading(false)
      }
    }
  }

  const unfollow = async () => {
    setLoading(true)
    try {
      await services.unfollow({ user_id: Number(data.id) })
      if (mounted) {
        setFollowed(false)
        setLoading(false)
      }
    } catch (error) {
      if (mounted) {
        setLoading(false)
      }
    }
  }

  const toProfile = () => router.push(`${ESRoutes.PROFILE}/${user.user_code}`)

  const body = () => {
    return (
      <>
        <Box display="flex" overflow="hidden">
          {handleClick ? (
            <ESAvatar alt={user.nickname} src={user.avatar} />
          ) : (
            <ButtonBase onClick={toProfile}>
              <ESAvatar alt={user.nickname} src={user.avatar} />
            </ButtonBase>
          )}
          <Box overflow="hidden" textOverflow="ellipsis" ml={2} display="flex" flexDirection="column" justifyContent="center">
            <Box color={Colors.white}>
              <Typography variant="h3" noWrap>
                {user.nickname}
              </Typography>
            </Box>
            <Typography variant="caption" noWrap>
              {t('common:common.at')}
              {user.user_code}
            </Typography>
          </Box>
        </Box>
        {followed !== undefined && userProfile.id != data.id && (
          <Box flexShrink={0}>
            {followed ? (
              <ESButton disabled={isLoading} onClick={unfollow} variant="contained" color="primary" size="medium" round>
                {t('common:home.unfollow')}
              </ESButton>
            ) : (
              <ESButton disabled={isLoading} onClick={follow} variant="outlined" size="medium" round>
                {t('common:home.follow')}
              </ESButton>
            )}
          </Box>
        )}
      </>
    )
  }

  return (
    <Grid item xs={12}>
      {handleClick ? (
        <ButtonBase className={classes.container} disabled={!handleClick} onClick={handleClick}>
          {body()}
        </ButtonBase>
      ) : (
        <Box className={classes.container}>{body()}</Box>
      )}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'start',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default UserListItem

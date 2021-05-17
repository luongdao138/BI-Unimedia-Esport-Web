import { useState, useEffect } from 'react'
import { Grid, Typography, Box, ButtonBase } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import * as services from '@services/search.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'

interface Props {
  data: any
  isFollowed?: boolean
}

const UserListItem: React.FC<Props> = ({ data, isFollowed }) => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const user = data.attributes

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

  const editGame = () => router.push(`${ESRoutes.PROFILE}/${user.user_code}`)

  return (
    <Grid item xs={12}>
      <Box marginY={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden">
          <ButtonBase onClick={editGame}>
            <ESAvatar alt={user.nickname} src={user.avatar} />
          </ButtonBase>
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
        {followed !== undefined && (
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
      </Box>
    </Grid>
  )
}

export default UserListItem

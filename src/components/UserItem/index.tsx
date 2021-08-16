import { useState, useEffect } from 'react'
import { Typography, Box, ButtonBase, Theme } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import ESButton from '@components/Button'
import * as services from '@services/user.service'
import * as blockServices from '@services/block.service'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import useGetProfile from '@utils/hooks/useGetProfile'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  data: any
  isFollowed?: boolean
  isBlocked?: boolean
  handleClick?: () => void
  handleClose?: () => void
  changeFollowState?: (type: number) => void
  nicknameYellow?: boolean
  rightItem?: JSX.Element
}

enum FOLLOWING_STATE_CHANGE_TYPE {
  FOLLOW = 1,
  UNFOLLOW = 0,
}

const UserListItem: React.FC<Props> = ({
  data,
  isFollowed,
  isBlocked,
  handleClose,
  handleClick,
  changeFollowState,
  nicknameYellow,
  rightItem,
}) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const user = data.attributes
  const { userProfile } = useGetProfile()

  const [followed, setFollowed] = useState<boolean | undefined>(isFollowed)
  const [blocked, setBlocked] = useState<boolean | undefined>(isBlocked)
  const [mounted, setMounted] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setFollowed(isFollowed)
  }, [isFollowed])

  useEffect(() => {
    return () => setMounted(false)
  }, [])

  const unblock = async () => {
    setLoading(true)
    try {
      await blockServices.unblockUser({ user_code: user.user_code })
      if (mounted) {
        setBlocked(false)
        setLoading(false)
      }
    } catch (error) {
      if (mounted) {
        setLoading(false)
      }
    }
  }

  const follow = async () => {
    setLoading(true)
    try {
      await services.follow({ user_code: user.user_code })
      if (mounted) {
        setFollowed(true)
        setLoading(false)
        if (changeFollowState) {
          changeFollowState(FOLLOWING_STATE_CHANGE_TYPE.FOLLOW)
        }
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
      await services.unfollow({ user_code: user.user_code })
      if (mounted) {
        setFollowed(false)
        setLoading(false)
        if (changeFollowState) {
          changeFollowState(FOLLOWING_STATE_CHANGE_TYPE.UNFOLLOW)
        }
      }
    } catch (error) {
      if (mounted) {
        setLoading(false)
      }
    }
  }

  const toProfile = () => {
    if (handleClose) handleClose()
    router.push(`${ESRoutes.PROFILE}/${user.user_code}`)
  }

  const clickable = !!handleClick

  return (
    <Box className={classes.container} pr={2}>
      <Box display="flex" overflow="hidden">
        <ButtonBase onClick={clickable ? handleClick : toProfile}>
          <ESAvatar alt={user.nickname} src={user.avatar} />
        </ButtonBase>
        <Box
          overflow="hidden"
          textOverflow="ellipsis"
          ml={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          onClick={clickable ? handleClick : undefined}
          style={clickable ? { cursor: 'pointer' } : undefined}
        >
          <Box color={Colors.white}>
            <Typography variant="h3" noWrap style={nicknameYellow === true ? { color: Colors.yellow } : undefined}>
              {user.nickname}
            </Typography>
          </Box>
          <Typography variant="caption" noWrap>
            {t('common:common.at')}
            {user.user_code}
          </Typography>
        </Box>
      </Box>
      {followed !== undefined && userProfile?.id != data.id && (
        <Box flexShrink={0}>
          {blocked ? (
            <ESButton
              disabled={isLoading}
              onClick={unblock}
              variant="outlined"
              className={classes.button}
              size="medium"
              round
              normalColor={Colors.red[10]}
              hoverColor={Colors.red[30]}
            >
              {t('common:common.blocking')}
            </ESButton>
          ) : followed ? (
            <ESButton
              disabled={isLoading}
              onClick={unfollow}
              variant="contained"
              color="primary"
              size="medium"
              round
              className={classes.button}
            >
              {t('common:home.unfollow')}
            </ESButton>
          ) : (
            <ESButton disabled={isLoading} onClick={follow} variant="outlined" size="medium" round className={classes.button}>
              {t('common:home.follow')}
            </ESButton>
          )}
        </Box>
      )}
      {rightItem && <Box flexShrink={0}>{rightItem}</Box>}
    </Box>
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
  button: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
}))

export default UserListItem

import { Typography, Box, Theme } from '@material-ui/core'
import ESSlider from '@components/Slider'
import ESAvatar from '@components/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { CommonHelper } from '@utils/helpers/CommonHelper'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerWrap: { width: 72, cursor: 'pointer' },
  avatar: {
    margin: '0 auto',
  },
  name: {
    color: Colors.white,
    marginTop: theme.spacing(0.5),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    display: 'inline-block',
    width: 72,
    textAlign: 'center',
  },
}))

interface Props {
  users: Array<userProps>
}

type userProps = {
  type: string
  attributes: userAttributesProps
}

type userAttributesProps = {
  user_code: string
  nickname: string
  avatar_url: string
}

export const RecommendedUser: React.FC<Props> = ({ users }) => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const USER_LIMIT = 10

  return (
    <ESSlider
      title={t('common:home.recommended_user')}
      navigation
      slidesPerView={'auto'}
      smallSliderButton
      items={users.slice(0, USER_LIMIT).map((user, i) => (
        <Box key={i}>
          <Box
            className={classes.innerWrap}
            onClick={() =>
              CommonHelper.checkUserCode(user.attributes.user_code, () => {
                router.push(`${ESRoutes.PROFILE}/${user.attributes.user_code}`)
              })
            }
            style={{ cursor: CommonHelper.handleAccountSystem(user.attributes.user_code) ? 'default' : 'point' }}
          >
            <ESAvatar alt={user.attributes.nickname} className={classes.avatar} src={user.attributes.avatar_url} />
            <Typography variant="caption" className={classes.name}>
              {user.attributes.nickname}
            </Typography>
          </Box>
        </Box>
      ))}
    />
  )
}

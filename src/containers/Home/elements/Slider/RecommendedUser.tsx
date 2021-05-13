import { Typography, Box, Theme } from '@material-ui/core'
import ESSlider from '@components/Slider'
import ESAvatar from '@components/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerWrap: { width: 60 },
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
    width: 60,
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
  avatar: string
}

export const RecommendedUser: React.FC<Props> = ({ users }) => {
  const classes = useStyles()

  return (
    <ESSlider
      title="おすすめユーザー"
      moreLink="#"
      navigation={false}
      width={84}
      disableResponsiveWidth
      items={users.map((user, i) => (
        <Box key={i}>
          <Box className={classes.innerWrap}>
            <ESAvatar className={classes.avatar} src={user.attributes.avatar} />
            <Typography variant="caption" className={classes.name}>
              {user.attributes.nickname}
            </Typography>
          </Box>
        </Box>
      ))}
    />
  )
}

import { Box, Typography, makeStyles } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'

interface dataItem {
  id: number
  type: string
}

const DistributorInfo: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  const getDistributorSocialInfo = () => [
    {
      id: 0,
      type: 'twitter',
    },
    {
      id: 1,
      type: 'instagram',
    },
    {
      id: 2,
      type: 'discord',
    },
  ]
  const getSocialIconUrl = (type) => {
    switch (type) {
      case 'twitter':
        return '/images/ic_twitter_colored.png'
      case 'instagram':
        return '/images/ic_instagram_colored.png'
      default:
        return '/images/ic_discord_colored.png'
    }
  }

  return (
    <Box className={classes.container}>
      <ESAvatar className={classes.avatar} src={'/images/avatar.png'} />
      <Box className={classes.textContainer}>
        <Typography className={classes.title}>{'配信者の名前がはいります'}</Typography>
        <Typography className={classes.content}>
          {'配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
            '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
            '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
            '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
            '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
            '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。'}
        </Typography>
      </Box>
      <Box className={classes.socialMediaContainer}>
        {getDistributorSocialInfo().map((item: dataItem) => {
          return <img className={classes.socialIcon} src={getSocialIconUrl(item.type)} key={item.id} />
        })}
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    marginTop: 58,
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 22,
  },
  label: {},
  avatar: {
    marginRight: '14px',
    width: '72px',
    height: '72px',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: 36,
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginTop: 7,
  },
  socialMediaContainer: {
    width: 372,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  socialIcon: {
    width: 60,
    height: 60,
    marginLeft: 22,
    borderRadius: 30,
  },
}))
export default DistributorInfo

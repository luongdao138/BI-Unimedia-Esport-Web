import { useEffect } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TopicCard from '@components/TopicCard'
import useFollower from './useFollower'

const TopicFollowerContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, followersTopicList, getFollowersTopicList } = useFollower()

  useEffect(() => {
    getFollowersTopicList()
  }, [])

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:topic.topic_follower_list')}
        </Typography>
      </Box>
      <Grid container className={classes.container}>
        {followersTopicList.map((topic, i) => (
          <Grid key={i} item xs={6} md={4}>
            <TopicCard topic={topic} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
}))

export default TopicFollowerContainer

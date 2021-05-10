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

export const RecommendedUser: React.FC = () => {
  const classes = useStyles()

  return (
    <ESSlider
      title="おすすめユーザー"
      moreLink="#"
      navigation={false}
      width={84}
      disableResponsiveWidth
      items={[
        <Box key="1" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/100/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたなべ
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/101/300/300" />
          <Typography variant="caption" className={classes.name}>
            グレちゃんグレちゃんグレちゃん
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/99/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/98/300/300" />
          <Typography variant="caption" className={classes.name}>
            コイチ
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/97/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたなべ
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/96/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/95/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/94/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/93/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/92/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/91/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/90/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/89/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/88/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
        <Box key="2" className={classes.wrap}>
          <ESAvatar src="https://picsum.photos/id/87/300/300" />
          <Typography variant="caption" className={classes.name}>
            わたうに
          </Typography>
        </Box>,
      ]}
    />
  )
}

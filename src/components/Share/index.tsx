import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Box from '@material-ui/core/Box'
import {
  FacebookShareButton,
  // LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  // LineIcon,
  TwitterIcon,
} from 'react-share'
// import { isMobile } from 'react-device-detect'

interface shareProps {
  url: string
  title: string
}

const useStyles = makeStyles((_theme) => ({
  share: {
    outline: 0,
  },
  infoText: {
    fontSize: 13,
    color: Colors.grey[400],
    marginRight: 5,
  },
  [_theme.breakpoints.down('sm')]: {
    infoText: {
      display: 'none',
    },
  },
}))

const Share = (props: shareProps) => {
  const { url, title } = props
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box className={classes.infoText}>共有</Box>
      <Box style={{ paddingLeft: 2, paddingRight: 2 }}>
        <FacebookShareButton className={classes.share} resetButtonStyle={true} url={url}>
          <FacebookIcon borderRadius={8} size={36} />
        </FacebookShareButton>
      </Box>
      <Box style={{ paddingLeft: 2, paddingRight: 2 }}>
        <TwitterShareButton className={classes.share} url={url} title={title}>
          <TwitterIcon borderRadius={8} size={36} />
        </TwitterShareButton>
      </Box>
      <Box style={{ paddingLeft: 2, paddingRight: 2 }}>
        {/* <LineShareButton className={classes.share} resetButtonStyle={true} url={url} title={title} isMobile={isMobile}>
          <LineIcon borderRadius={8} size={36} />
        </LineShareButton> */}
      </Box>
    </Box>
  )
}
export default Share

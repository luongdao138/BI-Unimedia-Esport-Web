import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { Colors } from '@theme/live/colors'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import DateElement from '@containers/Stream/elements/Date'
import IconStatus from './IconStatus'
import Share from '@components/Share'
import Avatar from '@material-ui/core/Avatar'
import { STREAM_STATUS } from '@constants/stream.constants'
import _ from 'lodash'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import Link from '@material-ui/core/Link'

const { cutLinksIntoPieces } = CommonHelper

interface detailProps {
  data: any
  countData?: any
  url: string
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 18,
    fontWeight: 400,
    paddingBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 5,
  },
  share: {
    outline: 0,
  },
  infoText: {
    fontSize: 14,
    color: Colors.grey[200],
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  desc: {
    fontSize: 11,
    color: theme.palette.grey[500],
    marginTop: 10,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    // background: theme.palette.grey[950],
  },
  container: {
    height: 36,
    width: '100%',
    borderWidth: 1,
    flex: 1,
  },
  [theme.breakpoints.down('md')]: {
    infoText: {
      fontSize: 12,
    },
    title: {
      fontSize: 16,
    },
    subTitle: {
      fontSize: 14,
    },
  },
  linkBreak: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
}))

const StreamDetail = (props: detailProps) => {
  const { data, countData, url } = props
  const status = _.get(data, 'attributes.flag', undefined)
  const desc = _.get(data, 'attributes.description', '')
  const time = _.get(data, 'attributes.live_start_datetime', undefined)
  const title = _.get(data, 'attributes.title_static', '')

  const renderLiveIcon = () => {
    // console.log()
    if (data && status === STREAM_STATUS.LIVE_STREAMING) {
      return (
        <Chip
          size="small"
          color="primary"
          style={{
            // background: Colors.secondary,
            borderRadius: 0,
            fontWeight: 600,
            height: 25,
            minWidth: 41,
          }}
          label="LIVE"
        />
      )
    }
    return null
  }

  const playCount = () => {
    return data.attributes.archive_view_count + (countData?.playCount ? countData?.playCount : 0)
  }

  const formatDescription = (description: string) => {
    const pieces = cutLinksIntoPieces(description)
    return pieces.map((piece, index, _arr) => {
      if (piece.type === 'text') {
        return piece.text
      } else {
        return (
          <Link key={index} href={piece.text} target="_blank" className={classes.lineBreak}>
            {piece.text}
          </Link>
        )
      }
    })
  }

  const classes = useStyles()
  return (
    <Box padding={1}>
      <Box className={classes.title}>
        {renderLiveIcon()}
        {data ? data.attributes.title_static : null}
      </Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
          <DateElement time={time} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box display="flex" flexDirection="row" alignItems="center" className={classes.container}>
            <Box display="flex" flexDirection="row">
              <IconStatus type="views" count={playCount()} desc="（視聴回数）" />
              <IconStatus type="comment" count={countData?.messageCount} desc="（コメント数）" />
            </Box>
            <Box display="flex" flex="1" justifyContent="flex-end">
              <Share url={url ? url : ''} title={title} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box style={{ paddingTop: 10 }} display="flex" flexDirection="row" alignItems="center">
        <Avatar alt="Host" src="/images/icon_detail.png" className={classes.large} />
        <Box className={classes.subTitle}>&GAMES</Box>
      </Box>
      <Box className={classes.desc}>{desc ? formatDescription(desc) : ''}</Box>
    </Box>
  )
}
export default StreamDetail

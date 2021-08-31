import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/live/colors'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import DateElement from '@containers/Stream/elements/Date'
import IconStatus from './IconStatus'
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
    color: '#707070',
    marginTop: 10,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    background: Colors.grey[900],
    padding: 8,
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

const StreamDetail: React.FC<detailProps> = (props) => {
  const { data, countData } = props
  const desc = _.get(data, 'attributes.description', '')
  const time = _.get(data, 'attributes.live_start_datetime', undefined)

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
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DateElement time={time} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Box display="flex" flexDirection="row" alignItems="center" className={classes.container}>
            <Box display="flex" flexDirection="row">
              <IconStatus type="views" count={playCount()} desc="（視聴回数）" />
              <IconStatus type="comment" count={countData?.messageCount} desc="（コメント数）" />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box className={classes.desc}>{desc ? formatDescription(desc) : ''}</Box>
    </Box>
  )
}
export default StreamDetail

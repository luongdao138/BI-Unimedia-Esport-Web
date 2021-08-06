import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import Date from './Date'

export interface BeforeHolderProps {
  time?: any
  text: any
  dates?: any[]
}

const useStyles = makeStyles((theme) => ({
  titleBeforeStart: {
    fontSize: 20,
    color: theme.palette.grey[400],
  },
  dateBeforeStart: {
    fontSize: 13,
    color: theme.palette.grey[400],
    paddingRight: 10,
  },
  media: {
    height: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    height: '100%',
  },
}))

const BeforeHolder: React.FC<BeforeHolderProps> = (props) => {
  const { time, text, dates } = props

  const classes = useStyles()

  return (
    <Box className={classes.box}>
      <CardMedia className={classes.media} image="/images/player_cover.png" title="Contemplative Reptile">
        <Box>
          <Box textAlign="center" className={classes.titleBeforeStart}>
            {text}
          </Box>
          {dates ? (
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" marginTop={1}>
              <Box className={classes.dateBeforeStart}>アーカイブ視聴期間</Box>
            </Box>
          ) : null}
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            {time ? (
              <>
                <Box className={classes.dateBeforeStart}>配信開始</Box>
                <Date time={time} absolute={false} />
              </>
            ) : null}

            {dates ? (
              <Box display="flex" flexDirection="row">
                <Date time={dates[0]} absolute={false} />
                <Date time={dates[1]} showLabel={false} />
              </Box>
            ) : null}
          </Box>
        </Box>
      </CardMedia>
    </Box>
  )
}

export default BeforeHolder

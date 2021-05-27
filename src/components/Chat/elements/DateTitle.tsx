import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'

export interface DateTitleProps {
  text?: string
}

const DateTitle: React.FC<DateTitleProps> = (props) => {
  const classes = useStyles()

  const { text } = props

  return (
    <Box className={classes.section}>
      <Box className={classes.box}>
        <Typography className={classes.text} variant="body2">
          {text}
        </Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    width: '100%',
    textAlign: 'center',
  },
  box: {
    width: 'auto',
    height: '100%',
    margin: '0 auto',
    borderRadius: 24,
    background: '#FFFFFF26',
    display: 'inline-block',
    textAlign: 'center',
  },
  text: {
    display: 'inline-block',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },
}))

export default DateTitle

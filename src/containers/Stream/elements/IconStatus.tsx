import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/live/colors'
import Box from '@material-ui/core/Box'
import PersonIcon from '@material-ui/icons/Person'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'

interface detailProps {
  type: 'comment' | 'views'
  count: number
  desc: string
  textStyle?: any
}

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 14,
    color: Colors.grey[200],
    paddingTop: 0,
    paddingInline: 2,
    fontWeight: 300,
    marginLeft: 6,
  },
  [theme.breakpoints.down('md')]: {
    infoText: {
      fontSize: 12,
    },
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      alignItems: 'flex-end',
    },
    infoContainer: {
      flexDirection: 'column-reverse',
    },
  },
}))

const IconStatus = (props: detailProps) => {
  const { type, count, desc, textStyle } = props
  const classes = useStyles()
  const renderIcon = () => {
    return type === 'comment' ? (
      <QuestionAnswerIcon style={{ color: Colors.grey[500] }} fontSize="small" />
    ) : (
      <PersonIcon style={{ color: Colors.grey[500] }} fontSize="small" />
    )
  }
  return (
    <Box className={classes.container} display="flex" flexDirection="row" alignItems="center">
      <Box>{renderIcon()}</Box>
      <Box className={classes.infoContainer} display="flex" flexDirection="row">
        <Box className={classes.text} style={textStyle}>
          {count.toLocaleString()}
        </Box>
        <Box
          style={{
            paddingTop: 7,
            paddingInline: 2,
            fontSize: 7,
            color: Colors.grey[500],
            fontWeight: 300,
          }}
        >
          {desc}
        </Box>
      </Box>
    </Box>
  )
}
export default IconStatus

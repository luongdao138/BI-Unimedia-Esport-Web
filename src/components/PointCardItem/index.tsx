import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface PointCardItemProps {
  titleText: string
  points: number
  pointText: string
}

const PointCardItem: FC<PointCardItemProps> = ({ points, titleText, pointText }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.titleText} component="div">
        {titleText}
      </Typography>
      <Box className={classes.contentContainer}>
        <Typography className={classes.pointStyle}>{FormatHelper.currencyFormat(points.toString())}</Typography>
        <Typography className={classes.pointText}>{pointText}</Typography>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.black,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.grey['200'],
    color: theme.palette.text.primary,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  titleText: {
    color: Colors.white,
  },
  pointText: {
    color: Colors.grey['200'],
  },
  pointStyle: {
    color: Colors.white,
    marginRight: 18,
  },
}))
export default PointCardItem

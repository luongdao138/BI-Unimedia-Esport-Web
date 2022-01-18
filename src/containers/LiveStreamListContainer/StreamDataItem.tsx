import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'

type StreamDataItemProps = {
  title: string
  value: number
  containerStyle?: any
}
const StreamDataItem: React.FC<StreamDataItemProps> = ({ title, value, containerStyle }) => {
  const classes = useStyles()
  return (
    <Box className={classes.itemContainer} style={containerStyle}>
      <Typography className={classes.titleStyle} style={{ display: 'inline-block' }}>
        {title}
      </Typography>
      <Typography className={classes.numberStyle}>{FormatHelper.currencyFormat(String(value))}</Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  titleStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 40,
  },
  numberStyle: {
    fontSize: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: Colors.white,
    wordBreak: 'break-word',
    textAlign: 'right',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    border: `1px solid ${Colors.grey['200']}`,
    borderRadius: 4,
    padding: '8px 12px 8px 12px',
    height: '100%',
  },
}))
export default StreamDataItem

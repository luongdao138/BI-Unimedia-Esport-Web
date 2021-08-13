import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface MyPointsCardProps {
  my_points: number
}

const MyPointsCard: FC<MyPointsCardProps> = ({ my_points }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography className={classes.titleText} component="div">
        {i18n.t('common:point_management_tab.my_points')}
      </Typography>
      <Box className={classes.contentContainer}>
        <Typography className={classes.pointStyle}>{FormatHelper.currencyFormat(my_points.toString())}</Typography>
        <Typography className={classes.pointText}>{i18n.t('common:point_management_tab.eXe_point')}</Typography>
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
export default MyPointsCard

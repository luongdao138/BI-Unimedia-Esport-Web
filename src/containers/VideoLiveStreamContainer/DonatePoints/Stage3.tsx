import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import i18n from '@locales/i18n'
import PointCardItem from '@components/PointCardItem'

interface StepThreeProps {
  myPoints: number
  missingPoints?: number
}

const StepThree: React.FC<StepThreeProps> = ({ myPoints, missingPoints }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box width="100%">
        <PointCardItem titleText={i18n.t('common:donate_points.title_purchase_point_step_3')} points={myPoints} pointText={'eXePoint'} />
        {missingPoints && (
          <PointCardItem
            titleText={i18n.t('common:donate_points.title_total_point_step_3')}
            points={missingPoints}
            pointText={'eXePoint'}
          />
        )}
      </Box>
      <Box className={classes.messageContainer}>
        <Typography className={classes.messageStyle}>{i18n.t('common:donate_points.success_message_purchase')}</Typography>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: '0 auto',
  },
  messageContainer: {
    marginTop: 45,
  },
  messageStyle: {
    fontSize: 14,
    color: '#707070',
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
}))
export default StepThree

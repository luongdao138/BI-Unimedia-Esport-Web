import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import i18n from '@locales/i18n'
import PointCardItem from '@components/PointCardItem'

interface StepOneProps {
  onClickPurchaseLackedPoint: () => void
  onClickPurchaseNewPoints: () => void
  myPoints: number
  lackedPoint?: number
}

const StepOne: React.FC<StepOneProps> = ({ onClickPurchaseLackedPoint, onClickPurchaseNewPoints, myPoints, lackedPoint }) => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Box width="100%">
        <PointCardItem titleText={i18n.t('common:donate_points.my_points')} points={myPoints} pointText={'eXeポイント'} />
        <PointCardItem titleText={i18n.t('common:donate_points.missing_points')} points={lackedPoint} pointText={'eXeポイント'} />
      </Box>
      <Box className={classes.buttonRootContainer}>
        <Box
          className={`${classes.buttonContainer} ${+lackedPoint <= 0 ? classes.disable_btn : ''}`}
          onClick={() => {
            if (+lackedPoint > 0) {
              onClickPurchaseLackedPoint()
            }
          }}
        >
          <Typography className={classes.buttonTextStyle}>{i18n.t('common:donate_points.purchase_missing_points')}</Typography>
        </Box>
        <Box className={classes.buttonContainer} onClick={onClickPurchaseNewPoints}>
          <Typography className={classes.buttonTextStyle}>{i18n.t('common:donate_points.purchase_new_points')}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: '0 auto',
  },
  buttonRootContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 60,
  },
  buttonContainer: {
    cursor: 'pointer',
    display: 'flex',
    backgroundColor: '#4D4D4D',
    borderRadius: 4,
    width: '35%',
    height: 116,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  [theme.breakpoints.down(415)]: {
    container: {
      paddingTop: 0,
    },
    buttonRootContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 32,
      alignItems: 'center',
    },
    buttonContainer: {
      display: 'flex',
      backgroundColor: '#4D4D4D',
      borderRadius: 4,
      width: '60%',
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
  },
  disable_btn: {
    cursor: 'not-allowed',
    '& p': {
      color: '#ffffff4d',
    },
  },
}))
export default StepOne

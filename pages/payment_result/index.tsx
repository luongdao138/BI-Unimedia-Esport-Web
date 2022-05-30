import PageWithLayoutType from '@constants/page'
import PaymentResultContainer from '@containers/PaymentResult'
import { Box, makeStyles } from '@material-ui/core'

const PaymentResult: PageWithLayoutType = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <PaymentResultContainer />
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default PaymentResult

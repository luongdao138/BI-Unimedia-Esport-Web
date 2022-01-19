import { Box, makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { ReactNode } from 'react'

type BoxDashProps = {
  children?: ReactNode
  isSelectedGift?: boolean
}
const ESBoxftDashColumn: React.FC<BoxDashProps> = ({ children, isSelectedGift }) => {
  const classes = useStyles({ isSelected: isSelectedGift })
  return (
    <Box pb={2} className={classes.wrap_input_box_switch}>
      <div className={classes.firstItemBoxSwitch} style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={classes.dashLine} />
        {children}
      </div>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  wrap_input_box_switch: (props: { isSelected?: boolean }) => ({
    paddingLeft: 0,
    paddingBottom: 0,
    height: props.isSelected ? 'auto' : '0px',
    transition: 'opacity 0.5s',
    opacity: props.isSelected ? 1 : 0,
    visibility: props.isSelected ? 'visible' : 'hidden',
  }),
  firstItemBoxSwitch: {
    // width: '494px',
  },
  dashLine: {
    width: 2,
    height: 'auto',
    background: Colors.primary,
    marginLeft: 18,
  },
  [theme.breakpoints.down(768)]: {
    firstItemBoxSwitch: {
      width: '100%',
    },
    wrap_input_box_switch: {
      position: 'relative',
      width: '100%',
      flexWrap: 'wrap-reverse',
      justifyContent: 'flex-end',
    },
    dashLine: {
      marginLeft: 8,
    },
  },
}))

export default ESBoxftDashColumn

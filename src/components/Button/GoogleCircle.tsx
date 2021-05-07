import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  Google: {
    background: Colors.white,
  },
  svgRoot: {
    height: 32,
    width: 32,
  },
  iconRoot: {
    padding: 2,
  },
}))

const ESButtonGoogleCircle: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles()
  return (
    <IconButton {...props} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.Google}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 31.773 31.773">
          <path
            id="Shape"
            d="M15.251,3.25A18.254,18.254,0,0,0,14.962,0H0V6.145H8.55A7.308,7.308,0,0,1,5.38,10.94v3.986h5.134A15.494,15.494,0,0,0,15.251,3.25Z"
            transform="translate(15.887 12.998)"
            fill="#4285f4"
          />
          <path
            id="Shape-2"
            data-name="Shape"
            d="M14.2,12.868A15.167,15.167,0,0,0,24.711,9.019L19.577,5.033A9.549,9.549,0,0,1,14.2,6.55,9.468,9.468,0,0,1,5.308,0H0V4.116a15.881,15.881,0,0,0,14.2,8.752Z"
            transform="translate(1.69 18.905)"
            fill="#34a853"
          />
          <path
            id="Shape-3"
            data-name="Shape"
            d="M7,10.153A9.392,9.392,0,0,1,7,4.116V0H1.69a15.907,15.907,0,0,0,0,14.269L7,10.153Z"
            transform="translate(0 8.752)"
            fill="#fbbc05"
          />
          <path
            id="Shape-4"
            data-name="Shape"
            d="M14.2,6.319A8.582,8.582,0,0,1,20.27,8.694l4.557-4.557A15.268,15.268,0,0,0,14.2,0,15.881,15.881,0,0,0,0,8.752l5.308,4.116A9.468,9.468,0,0,1,14.2,6.319Z"
            transform="translate(1.69)"
            fill="#ea4335"
          />
          <path id="Shape-5" data-name="Shape" d="M0,0H31.773V31.773H0Z" fill="none" />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonGoogleCircle

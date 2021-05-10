import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
  },
  facebook: {
    background: '#1877F2',
  },
  svgRoot: {
    height: 18,
    width: 10,
  },
  iconRoot: {
    padding: 4,
  },
}))

const ESButtonFacebookCircle: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles()

  return (
    <IconButton {...props} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.facebook}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 9.5 17.872">
          <path
            id="Path_98"
            data-name="Path 98"
            d="M310.878,209.977l.492-3.21h-3.08v-2.083a1.605,1.605,0,0,1,1.81-1.734h1.4v-2.733a17.076,17.076,0,0,0-2.486-.217c-2.537,0-4.195,1.537-4.195,4.321v2.447H302v3.21h2.82v7.76a11.222,11.222,0,0,0,3.47,0v-7.76Z"
            transform="translate(-302 -200)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonFacebookCircle

import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  facebook: {
    background: '#1877F2',
  },
  svgRoot: {
    height: 36,
    width: 19,
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
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 19 36">
          <path
            id="Path_98"
            data-name="Path 98"
            d="M319.755,219.954l.985-6.42h-6.16v-4.166c0-1.756.86-3.468,3.619-3.468H321v-5.466a34.154,34.154,0,0,0-4.972-.434c-5.073,0-8.389,3.075-8.389,8.641v4.893H302v6.42h5.639v15.52a22.447,22.447,0,0,0,6.941,0v-15.52Z"
            transform="translate(-302 -200)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonFacebookCircle

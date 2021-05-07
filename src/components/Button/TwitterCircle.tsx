import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  Twitter: {
    background: '#1D9BF0',
  },
  svgRoot: {
    height: 34,
    width: 27,
  },
  iconRoot: {
    padding: 4,
  },
}))

const ESButtonTwitterCircle: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles()
  return (
    <IconButton {...props} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.Twitter}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 33.25 27.022">
          <path
            id="Path_104"
            data-name="Path 104"
            d="M99.957,141.53c12.548,0,19.409-10.4,19.409-19.409,0-.3-.006-.589-.019-.882a13.879,13.879,0,0,0,3.4-3.532,13.618,13.618,0,0,1-3.918,1.074,6.847,6.847,0,0,0,3-3.774,13.67,13.67,0,0,1-4.332,1.656,6.828,6.828,0,0,0-11.625,6.221,19.367,19.367,0,0,1-14.061-7.127,6.827,6.827,0,0,0,2.112,9.107,6.773,6.773,0,0,1-3.09-.853c0,.028,0,.057,0,.087a6.825,6.825,0,0,0,5.473,6.688,6.809,6.809,0,0,1-3.081.117A6.829,6.829,0,0,0,99.6,135.64a13.688,13.688,0,0,1-8.473,2.92,13.889,13.889,0,0,1-1.627-.095,19.313,19.313,0,0,0,10.457,3.064"
            transform="translate(-89.5 -114.507)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonTwitterCircle

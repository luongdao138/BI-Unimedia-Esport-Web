import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  Instagram: {
    background: 'transparent linear-gradient(46deg, #FCD81D 0%, #EB1C24 50%, #A33A93 100%) 0% 0% no-repeat padding-box;',
  },
  svgRoot: {
    height: 36,
    width: 36,
  },
  iconRoot: {
    padding: 2,
  },
}))

const ESButtonInstagramCircle: React.FC<IconButtonProps> = (props) => {
  const classes = useStyles()
  return (
    <IconButton {...props} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.Instagram}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 36.235 36.235">
          <path
            id="Path_16708"
            data-name="Path 16708"
            d="M22.2,7.343c4.838,0,5.411.018,7.321.106a10.028,10.028,0,0,1,3.364.624,6,6,0,0,1,3.438,3.438,10.027,10.027,0,0,1,.624,3.364c.087,1.91.106,2.483.106,7.321s-.018,5.411-.106,7.321a10.028,10.028,0,0,1-.624,3.364,6,6,0,0,1-3.438,3.438,10.028,10.028,0,0,1-3.364.624c-1.91.087-2.483.106-7.321.106s-5.411-.018-7.321-.106a10.028,10.028,0,0,1-3.364-.624,6,6,0,0,1-3.438-3.438,10.028,10.028,0,0,1-.624-3.364c-.087-1.91-.106-2.483-.106-7.321s.018-5.411.106-7.321a10.028,10.028,0,0,1,.624-3.364,6,6,0,0,1,3.438-3.438,10.028,10.028,0,0,1,3.364-.624c1.91-.087,2.483-.106,7.321-.106m0-3.264c-4.92,0-5.537.021-7.47.109a13.3,13.3,0,0,0-4.4.842,9.264,9.264,0,0,0-5.3,5.3,13.3,13.3,0,0,0-.842,4.4c-.088,1.932-.109,2.549-.109,7.47s.021,5.537.109,7.47a13.3,13.3,0,0,0,.842,4.4,9.264,9.264,0,0,0,5.3,5.3,13.3,13.3,0,0,0,4.4.842c1.932.088,2.549.109,7.47.109s5.537-.021,7.47-.109a13.3,13.3,0,0,0,4.4-.842,9.264,9.264,0,0,0,5.3-5.3,13.3,13.3,0,0,0,.842-4.4c.088-1.932.109-2.549.109-7.47s-.021-5.537-.109-7.47a13.3,13.3,0,0,0-.842-4.4,9.264,9.264,0,0,0-5.3-5.3,13.3,13.3,0,0,0-4.4-.842c-1.932-.088-2.549-.109-7.47-.109Z"
            transform="translate(-4.079 -4.079)"
            fill="#fff"
          />
          <path
            id="Path_16709"
            data-name="Path 16709"
            d="M135.939,126.635a9.3,9.3,0,1,0,9.3,9.3A9.3,9.3,0,0,0,135.939,126.635Zm0,15.343a6.039,6.039,0,1,1,6.039-6.039A6.039,6.039,0,0,1,135.939,141.978Z"
            transform="translate(-117.821 -117.821)"
            fill="#fff"
          />
          <circle
            id="Ellipse_201"
            data-name="Ellipse 201"
            cx="2.174"
            cy="2.174"
            r="2.174"
            transform="translate(25.615 6.272)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonInstagramCircle

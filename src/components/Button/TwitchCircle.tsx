import { Avatar, SvgIcon, Link, LinkProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  Twitch: {
    background: '#6441A5',
  },
  svgRoot: {
    height: 31,
    width: 33,
  },
}))

const ESButtonTwitchCircle: React.FC<LinkProps> = ({ classes: _classes, className: _className, ...rest }) => {
  const classes = useStyles(rest)
  return (
    <Link {...rest}>
      <Avatar classes={{ root: classes.root }} className={classes.Twitch}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 31.056 32.475">
          <path
            id="Path_16710"
            data-name="Path 16710"
            d="M12.571,11.2l-2.118,5.648V39.437h7.762v4.238h4.238l4.233-4.238h6.352l8.472-8.468V11.2Zm2.821,2.822h23.3V29.554L33.745,34.5H25.981l-4.232,4.232V34.5H15.392Zm7.766,14.121h2.824V19.673H23.158Zm7.764,0h2.824V19.673H30.921Z"
            transform="translate(-10.453 -11.2)"
            fill="#fff"
            fillRule="evenodd"
          />
        </SvgIcon>
      </Avatar>
    </Link>
  )
}

export default ESButtonTwitchCircle

import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
  },
  svgRoot: {
    height: 18,
    width: 18,
  },
  iconRoot: {
    padding: 4,
  },
  avatar: (props: { disabled: boolean }) => {
    return {
      background: 'transparent linear-gradient(46deg, #FCD81D 0%, #EB1C24 50%, #A33A93 100%) 0% 0% no-repeat padding-box;',
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

interface SocialProps {
  link?: string
}

const ESButtonInstagramCircle: React.FC<IconButtonProps & SocialProps> = ({ link }) => {
  const disabled = !link || link.length === 0
  const classes = useStyles({ disabled: disabled })
  return (
    <IconButton href={link} target="_blank" disabled={disabled} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.avatar}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 18.118 18.118">
          <path
            id="Path_16708"
            data-name="Path 16708"
            d="M13.138,5.711c2.419,0,2.705.009,3.661.053a5.014,5.014,0,0,1,1.682.312A3,3,0,0,1,20.2,7.8a5.014,5.014,0,0,1,.312,1.682c.044.955.053,1.242.053,3.661s-.009,2.705-.053,3.661A5.014,5.014,0,0,1,20.2,18.48,3,3,0,0,1,18.48,20.2a5.014,5.014,0,0,1-1.682.312c-.955.044-1.242.053-3.661.053s-2.705-.009-3.661-.053A5.014,5.014,0,0,1,7.8,20.2,3,3,0,0,1,6.076,18.48,5.014,5.014,0,0,1,5.764,16.8c-.044-.955-.053-1.242-.053-3.661s.009-2.705.053-3.661A5.014,5.014,0,0,1,6.076,7.8,3,3,0,0,1,7.8,6.076a5.014,5.014,0,0,1,1.682-.312c.955-.044,1.242-.053,3.661-.053m0-1.632c-2.46,0-2.769.01-3.735.055a6.649,6.649,0,0,0-2.2.421A4.632,4.632,0,0,0,4.555,7.2a6.649,6.649,0,0,0-.421,2.2c-.044.966-.055,1.275-.055,3.735s.01,2.769.055,3.735a6.649,6.649,0,0,0,.421,2.2A4.632,4.632,0,0,0,7.2,21.721a6.649,6.649,0,0,0,2.2.421c.966.044,1.275.055,3.735.055s2.769-.01,3.735-.055a6.649,6.649,0,0,0,2.2-.421,4.632,4.632,0,0,0,2.649-2.649,6.649,6.649,0,0,0,.421-2.2c.044-.966.055-1.275.055-3.735s-.01-2.769-.055-3.735a6.649,6.649,0,0,0-.421-2.2,4.632,4.632,0,0,0-2.649-2.649,6.649,6.649,0,0,0-2.2-.421c-.966-.044-1.275-.055-3.735-.055Z"
            transform="translate(-4.079 -4.079)"
            fill="#fff"
          />
          <path
            id="Path_16709"
            data-name="Path 16709"
            d="M131.287,126.635a4.652,4.652,0,1,0,4.652,4.652A4.652,4.652,0,0,0,131.287,126.635Zm0,7.671a3.02,3.02,0,1,1,3.02-3.02A3.02,3.02,0,0,1,131.287,134.306Z"
            transform="translate(-122.228 -122.228)"
            fill="#fff"
          />
          <circle
            id="Ellipse_201"
            data-name="Ellipse 201"
            cx="1.087"
            cy="1.087"
            r="1.087"
            transform="translate(12.807 3.136)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonInstagramCircle

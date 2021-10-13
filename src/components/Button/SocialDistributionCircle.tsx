import i18n from '@locales/i18n'
import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useToast from '@utils/hooks/useToast'

const getIconBackgroundColor = (social) => {
  switch (social) {
    case 'twitter':
      return '#1D9BF0'
    case 'instagram':
      return 'transparent linear-gradient(46deg, #FCD81D 0%, #EB1C24 50%, #A33A93 100%) 0% 0% no-repeat padding-box;'
    default:
      return '#7289DA'
  }
}

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  svgRoot: {
    height: 28,
    width: 34,
  },
  iconRoot: {
    padding: 0,
  },
  avatar: (props: { disabled: boolean; social: string }) => {
    return {
      background: getIconBackgroundColor(props.social),
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

const getPath = (social, classes) => {
  switch (social) {
    case 'twitter':
      return (
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 16.625 13.511">
          <path
            id="Path_104"
            data-name="Path 104"
            d="M94.728,128.018a9.639,9.639,0,0,0,9.7-9.7c0-.148,0-.295-.01-.441a6.939,6.939,0,0,0,1.7-1.766,6.809,6.809,0,0,1-1.959.537,3.423,3.423,0,0,0,1.5-1.887,6.835,6.835,0,0,1-2.166.828,3.414,3.414,0,0,0-5.813,3.111,9.684,9.684,0,0,1-7.031-3.564,3.414,3.414,0,0,0,1.056,4.553,3.386,3.386,0,0,1-1.545-.427c0,.014,0,.029,0,.043a3.412,3.412,0,0,0,2.736,3.344,3.4,3.4,0,0,1-1.54.058,3.415,3.415,0,0,0,3.186,2.369,6.844,6.844,0,0,1-4.236,1.46,6.943,6.943,0,0,1-.814-.047,9.656,9.656,0,0,0,5.228,1.532"
            transform="translate(-89.5 -114.507)"
            fill="#fff"
          />
        </SvgIcon>
      )
    case 'instagram':
      return (
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
      )
    default:
      return (
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 16 16">
          <path
            id="Path_99"
            data-name="Path 99"
            d="M4.832,13.309h0A7,7,0,0,1,2.6,12.885a5.8,5.8,0,0,1-1.5-.823A4.52,4.52,0,0,1,0,10.9,18.958,18.958,0,0,1,.356,7.3a22.151,22.151,0,0,1,.784-2.936,18.929,18.929,0,0,1,1.14-2.7h0A7.884,7.884,0,0,1,6.716,0h.018l.159.19A13.408,13.408,0,0,0,3.739,1.537a6.463,6.463,0,0,0-1.012.729h0c.09-.049.421-.224.931-.458a13.483,13.483,0,0,1,2.226-.76A9.216,9.216,0,0,1,7.256.808l.016,0,.019,0h0A1.317,1.317,0,0,1,7.526.776a13.348,13.348,0,0,1,3.2-.031,12.923,12.923,0,0,1,4.768,1.521,6.5,6.5,0,0,0-.962-.7A12.931,12.931,0,0,0,11.55.254L11.772,0h.018a7.883,7.883,0,0,1,4.434,1.664h0a18.9,18.9,0,0,1,1.14,2.7A22.114,22.114,0,0,1,18.148,7.3,18.966,18.966,0,0,1,18.5,10.9a4.522,4.522,0,0,1-1.111,1.163,5.862,5.862,0,0,1-1.5.823,7,7,0,0,1-2.234.423c-.005-.006-.576-.688-1.046-1.284a6.153,6.153,0,0,0,1.324-.542,5.259,5.259,0,0,0,.888-.621,3.561,3.561,0,0,0,.655-.723,9.008,9.008,0,0,1-1.821.935,10.407,10.407,0,0,1-2.3.682,10.813,10.813,0,0,1-1.985.183,11.6,11.6,0,0,1-2.118-.2,13.237,13.237,0,0,1-2.329-.681,9.213,9.213,0,0,1-1.156-.539.653.653,0,0,0-.071-.039.682.682,0,0,1-.072-.04.226.226,0,0,1-.063-.048c-.247-.137-.4-.239-.442-.267h0a3.5,3.5,0,0,0,.632.709,5.223,5.223,0,0,0,.859.614,6.108,6.108,0,0,0,1.282.546c-.473.6-1.056,1.309-1.062,1.315Zm7.24-7.4a1.541,1.541,0,0,0-1.147.517,1.87,1.87,0,0,0,.006,2.483,1.523,1.523,0,0,0,2.287,0,1.877,1.877,0,0,0,0-2.483A1.54,1.54,0,0,0,12.073,5.909Zm-5.782,0a1.541,1.541,0,0,0-1.147.517A1.868,1.868,0,0,0,5.149,8.91a1.524,1.524,0,0,0,2.288,0,1.92,1.92,0,0,0,.34-1.952A1.736,1.736,0,0,0,7.4,6.385,1.554,1.554,0,0,0,6.29,5.909Z"
            transform="translate(-1 1)"
            fill="#fff"
          />
        </SvgIcon>
      )
  }
}

interface SocialProps {
  link?: string
  onlyIcon?: boolean
  className?: string
  social?: string
}

const SocialDistributionCircle: React.FC<IconButtonProps & SocialProps> = ({ link, onlyIcon, className, social }) => {
  const disabled = !link || link.length === 0
  const { addToast } = useToast()
  const classes = useStyles({ disabled: onlyIcon ? false : disabled, social })

  function copyToClipboard() {
    const dummy = document.createElement('textarea')
    document.body.appendChild(dummy)
    dummy.value = link
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
    addToast(i18n.t('common:live_stream_screen.discord_id_copied'))
  }
  return (
    <>
      {social !== 'discord' ? (
        <IconButton href={link} target={'_blank'} disabled={disabled} classes={{ root: classes.iconRoot }} className={className}>
          <div className="esbutton-hover" />
          <Avatar classes={{ root: classes.root }} className={classes.avatar}>
            {getPath(social, classes)}
          </Avatar>
        </IconButton>
      ) : (
        <IconButton onClick={copyToClipboard} disabled={disabled} classes={{ root: classes.iconRoot }} className={className}>
          <div className="esbutton-hover" />
          <Avatar classes={{ root: classes.root }} className={classes.avatar}>
            {getPath(social, classes)}
          </Avatar>
        </IconButton>
      )}
    </>
  )
}

export default SocialDistributionCircle

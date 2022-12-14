import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  svgRoot: {
    height: 39,
    width: 38,
  },
  iconRoot: {
    padding: 0,
  },
  avatar: (props: { disabled: boolean }) => {
    return {
      background: '#00B900',
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

interface SocialProps {
  link?: string
  onlyIcon?: boolean
  className?: string
}

const ESButtonLineCircle: React.FC<IconButtonProps & SocialProps> = ({ link, onlyIcon, className }) => {
  const disabled = !link || link.length === 0
  const classes = useStyles({ disabled: onlyIcon ? false : disabled })
  return (
    <IconButton href={link} target="_blank" disabled={disabled} classes={{ root: classes.iconRoot }} className={className}>
      <div className="esbutton-hover" />
      <Avatar classes={{ root: classes.root }} className={classes.avatar}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 39.155 37.308">
          <g id="Group_7252" data-name="Group 7252">
            <path
              id="Path_16886"
              data-name="Path 16886"
              d="M416.214,272.793c0-8.76-8.782-15.888-19.578-15.888s-19.578,7.127-19.578,15.888c0,7.854,6.965,14.431,16.373,15.675.638.137,1.506.42,1.725.965a4.026,4.026,0,0,1,.063,1.77s-.23,1.381-.28,1.676c-.085.495-.393,1.936,1.7,1.055s11.274-6.639,15.382-11.366h0c2.837-3.112,4.2-6.269,4.2-9.775"
              transform="translate(-377.059 -256.905)"
              fill="#fff"
            />
            <g id="Group_7251" data-name="Group 7251" transform="translate(6.423 11.654)">
              <path
                id="Path_16887"
                data-name="Path 16887"
                d="M409.712,282.914h-1.373a.381.381,0,0,0-.381.38v8.531a.381.381,0,0,0,.381.38h1.373a.381.381,0,0,0,.381-.38v-8.531a.381.381,0,0,0-.381-.38"
                transform="translate(-400.534 -282.914)"
                fill="#00b900"
              />
              <path
                id="Path_16888"
                data-name="Path 16888"
                d="M423.439,282.914h-1.373a.381.381,0,0,0-.381.38v5.068l-3.909-5.279a.424.424,0,0,0-.03-.039l0,0c-.007-.009-.015-.016-.023-.024l-.007-.006-.02-.017-.01-.008-.02-.014-.012-.007-.02-.011-.012-.006-.022-.009-.013,0-.022-.007-.013,0-.022,0-.016,0-.02,0h-1.406a.381.381,0,0,0-.381.38v8.531a.381.381,0,0,0,.381.38h1.373a.381.381,0,0,0,.381-.38v-5.067l3.914,5.286a.386.386,0,0,0,.1.094l0,0,.023.014.011.006.018.009.019.008.011,0,.026.008h.005a.389.389,0,0,0,.1.013h1.373a.381.381,0,0,0,.381-.38v-8.531a.381.381,0,0,0-.381-.38"
                transform="translate(-404.809 -282.914)"
                fill="#00b900"
              />
              <path
                id="Path_16889"
                data-name="Path 16889"
                d="M397.259,290.069h-3.731v-6.775a.381.381,0,0,0-.381-.381h-1.373a.381.381,0,0,0-.381.381v8.53h0a.379.379,0,0,0,.107.263l.005.006.005.005a.378.378,0,0,0,.263.106h5.486a.381.381,0,0,0,.381-.381V290.45a.381.381,0,0,0-.381-.381"
                transform="translate(-391.392 -282.913)"
                fill="#00b900"
              />
              <path
                id="Path_16890"
                data-name="Path 16890"
                d="M442.664,285.05a.381.381,0,0,0,.38-.381V283.3a.381.381,0,0,0-.38-.381h-5.486a.379.379,0,0,0-.265.108l0,0-.006.007a.377.377,0,0,0-.106.263h0v8.529h0a.378.378,0,0,0,.107.263l.005.006.005,0a.378.378,0,0,0,.263.107h5.486a.381.381,0,0,0,.38-.381v-1.373a.381.381,0,0,0-.38-.381h-3.731v-1.442h3.731a.381.381,0,0,0,.38-.381v-1.373a.381.381,0,0,0-.38-.382h-3.731V285.05Z"
                transform="translate(-416.451 -282.914)"
                fill="#00b900"
              />
            </g>
          </g>
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonLineCircle

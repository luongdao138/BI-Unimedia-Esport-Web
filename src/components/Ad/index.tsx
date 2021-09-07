import { makeStyles } from '@material-ui/core/styles'

interface Props {
  src: string
  height?: number | string
  link: string
  target?: string
  style?: any
}

const Ad: React.FC<Props> = ({ src, link, target }) => {
  const classes = useStyles()

  return (
    <a style={{ display: 'block' }} href={link} target={target}>
      <img className={classes.media} src={src} />
    </a>
  )
}

const useStyles = makeStyles(() => ({
  media: {
    width: '100%',
    height: 'auto',
  },
}))

Ad.defaultProps = {
  target: '_blank',
  src: '#',
  height: 127,
  style: {},
}

export default Ad

import { makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'

type Props = {
  variant: 'text' | 'contained' | 'outlined'
  disabled: boolean
  onClick: () => void
  title: string
  color?: 'inherit' | 'default' | 'primary' | 'secondary'
  primaryTextColor?: boolean
}

const DetailInfoButtons: React.FC<Props> = ({ variant, disabled, onClick, title, color, primaryTextColor }) => {
  const classes = useStyles({ primaryTextColor })

  return (
    <ESButton
      variant={variant}
      color={color}
      hoverColor={color === 'primary' && 'rgba(255,71,134,.3)'}
      normalColor={color === 'primary' && Colors.primary}
      round
      className={classes.button}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </ESButton>
  )
}

const useStyles = makeStyles(() => ({
  button: {
    color: (props: { primaryTextColor?: boolean }) => props.primaryTextColor && Colors.primary,
    borderColor: (props: { primaryTextColor?: boolean }) => props.primaryTextColor && Colors.primary,
    height: 36,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
}))

export default DetailInfoButtons

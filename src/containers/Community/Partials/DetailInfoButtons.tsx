import { makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'

type Props = {
  variant: 'text' | 'contained' | 'outlined'
  disabled: boolean
  onClick: () => void
  title: string
  color?: 'inherit' | 'default' | 'primary' | 'secondary'
}

const DetailInfoButtons: React.FC<Props> = ({ variant, disabled, onClick, title, color }) => {
  const classes = useStyles()

  return (
    <ESButton variant={variant} color={color} round className={classes.button} disabled={disabled} onClick={onClick}>
      {title}
    </ESButton>
  )
}

const useStyles = makeStyles(() => ({
  button: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
}))

export default DetailInfoButtons

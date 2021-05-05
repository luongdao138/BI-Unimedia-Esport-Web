import { CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  label?: string
}

const ESCheckbox: React.FC<CheckboxProps & Props> = ({ label, ...rest }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      control={<Checkbox color="primary" classes={classes} {...rest} />}
      label={label}
      labelPlacement="end"
    />
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.dark,
    },
  },
  checked: {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.main,
    },
  },
}))

export default ESCheckbox

import { CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

type Props = {
  label?: string
}

const ESCheckbox: React.FC<CheckboxProps & Props> = ({ label, ...rest }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      className={classes.formControl}
      control={<Checkbox color="primary" classes={{ root: classes.root, checked: classes.checked }} {...rest} />}
      label={label}
      labelPlacement="end"
    />
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginLeft: 0,
  },
  root: {
    padding: theme.spacing(1 / 2),
    '&:hover': {
      backgroundColor: 'transparent',
    },
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

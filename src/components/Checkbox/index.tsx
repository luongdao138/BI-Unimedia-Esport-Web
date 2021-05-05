import { CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core'

type Props = {
  label?: string
}

const ESCheckbox: React.FC<CheckboxProps & Props> = ({ label, ...rest }) => {
  return (
    <FormControlLabel
      control={<Checkbox color="primary" {...rest} />}
      label={label}
      labelPlacement="end"
    />
  )
}

export default ESCheckbox

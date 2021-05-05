import {
  CheckboxProps,
  Checkbox,
  FormControlLabel,
  FormControlProps,
} from '@material-ui/core'

const ESCheckbox: React.FC<CheckboxProps & FormControlProps> = (props) => {
  return (
    <FormControlLabel
      value="end"
      control={<Checkbox color="primary" {...props} />}
      label="End"
      labelPlacement="end"
    />
  )
}

export default ESCheckbox

import { TextField, withStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'

const SelectInputTextField = withStyles({
  root: {
    '& .MuiAutocomplete-popupIndicator': {
      display: 'none',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: '10px !important',
    },
    '& .MuiOutlinedInput-root': {
      color: Colors.white,
      height: 40,
      paddingTop: 0,
      paddingBottom: 0,
      '&.Mui-focused fieldset': {
        border: '1px solid white',
      },
    },
  },
})(TextField)

export default SelectInputTextField

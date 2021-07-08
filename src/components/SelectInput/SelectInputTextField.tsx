import { TextField, withStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'

const SelectInputTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: Colors.white,
      height: 30,
      borderBottom: 'none',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiAutocomplete-popupIndicator': {
      display: 'none',
    },
  },
})(TextField)

export default SelectInputTextField

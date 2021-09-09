import { DateTimePicker, DateTimePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { makeStyles } from '@material-ui/core/styles'
import { FormHelperText, FormControl } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { DateTimePickerToolbar } from './DateTimePickerToolbar'

type Props = {
  helperText?: string
}

const ESInputDatePicker: React.FC<Props & DateTimePickerProps> = ({ helperText, ...rest }) => {
  const classes = useStyles()
  const start = new Date()
  start.setHours(0, 0, 0, 0)

  return (
    <FormControl fullWidth={rest.fullWidth}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          ampm={false}
          ToolbarComponent={DateTimePickerToolbar}
          format="YYYY年MM月DD日 HH:mm"
          inputVariant="outlined"
          minutesStep={5}
          margin="dense"
          minDateMessage=""
          disablePast={!rest.disabled}
          initialFocusedDate={start}
          className={classes.noMargin}
          InputProps={{
            classes: { root: classes.root },
          }}
          {...rest}
        />
      </MuiPickersUtilsProvider>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: Colors.black,
    borderRadius: 4,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#fff',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  noMargin: {
    marginBottom: 0,
  },
}))

export default ESInputDatePicker

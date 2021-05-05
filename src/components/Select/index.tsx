import {
  Select,
  SelectProps,
  FormControl,
  FormHelperText,
  Typography,
  withStyles,
  OutlinedInput,
} from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
// import ArrowDownIcon from '@common/icons/ArrowDownIcon'

type Props = {
  helperText?: string
  label?: string
  required?: boolean
}

const ESSelect: React.FC<SelectProps & Props> = ({
  helperText,
  label,
  required = false,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <FormControl fullWidth={rest.fullWidth}>
      {label && (
        <label htmlFor={label} style={{ marginBottom: '0.35em' }}>
          {label}
          {required && (
            <Typography
              component="span"
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 2,
                paddingLeft: 4,
                paddingRight: 4,
                fontSize: 10,
                marginLeft: 8,
                color: Colors.white,
              }}
            >
              必須
            </Typography>
          )}
        </label>
      )}
      <Select
        id={label}
        variant="outlined"
        margin="dense"
        native
        classes={classes}
        input={<Input />}
        {...rest}
        // IconComponent={ArrowDownIcon}
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const Input = withStyles(() =>
  createStyles({
    root: {
      backgroundColor: Colors.black,
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
  })
)(OutlinedInput)

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: Colors.black,
  },
  iconOutlined1: {
    '&.Mui-focused': {
      border: '2px solid red',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  },
}))

export default ESSelect

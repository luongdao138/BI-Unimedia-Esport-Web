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
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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
    <FormControl fullWidth={rest.fullWidth} className={classes.formPadding}>
      {label && (
        <label htmlFor={label} className={classes.labelMargin}>
          {label}
          {required && (
            <Typography component="span" className={classes.required}>
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
        className={classes.root}
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: Colors.black,
  },
  formPadding: {
    paddingTop: theme.spacing(1),
  },
  labelMargin: {
    marginBottom: '0.35em',
  },
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
}))

export default ESSelect

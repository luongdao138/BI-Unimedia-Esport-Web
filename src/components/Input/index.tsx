import { OutlinedInput, OutlinedInputProps, FormHelperText, FormControl, Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactElement } from 'react'

export type InputProps = {
  helperText?: string
  labelPrimary?: string
  labelSecondary?: ReactElement
  required?: boolean
}

const ESInput: React.FC<OutlinedInputProps & InputProps> = ({ helperText, labelPrimary, labelSecondary, required = false, ...rest }) => {
  const classes = useStyles()

  return (
    <FormControl fullWidth={rest.fullWidth} className={classes.formPadding}>
      {(labelPrimary || labelSecondary) && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <label htmlFor={labelPrimary} className={classes.labelMargin}>
            {labelPrimary}
            {required && (
              <Typography component="span" className={classes.required}>
                必須
              </Typography>
            )}
          </label>
          {labelSecondary}
        </Box>
      )}
      <OutlinedInput id={labelPrimary} classes={{ root: classes.root }} margin="dense" {...rest} />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: Colors.black,
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

export default ESInput

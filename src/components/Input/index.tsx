import {
  OutlinedInput,
  OutlinedInputProps,
  FormHelperText,
  FormControl,
  Box,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactElement } from 'react'

export type InputProps = {
  helperText?: string
  labelPrimary?: string
  labelSecondary?: ReactElement
  required?: boolean
}

const ESInput: React.FC<OutlinedInputProps & InputProps> = ({
  helperText,
  labelPrimary,
  labelSecondary,
  required = false,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <FormControl fullWidth={rest.fullWidth} style={{ paddingTop: 8 }}>
      {(labelPrimary || labelSecondary) && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <label htmlFor={labelPrimary} style={{ marginBottom: '0.35em' }}>
            {labelPrimary}
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
          {labelSecondary}
        </Box>
      )}
      <OutlinedInput
        id={labelPrimary}
        classes={classes}
        margin="dense"
        {...rest}
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const useStyles = makeStyles(() => ({
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
}))

export default ESInput

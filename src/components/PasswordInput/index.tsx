import { IconButton, OutlinedInputProps, InputAdornment, makeStyles } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Colors } from '@theme/live/colors'
import ESInput from '@components/Input'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  nowrapHelperText?: boolean
  size?: 'big' | 'small'
  strengthMeterValue?: number
}

const ESPasswordInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <ESInput
      {...props}
      fullWidth
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position="end" className={classes.inputContainer}>
          <div className={classes.borderLeft}></div>
          <IconButton
            aria-label="toggle password visibility"
            size="small"
            disableRipple
            color="inherit"
            onMouseDown={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
          </IconButton>
        </InputAdornment>
      }
    />
  )
}

const useStyles = makeStyles({
  inputContainer: {
    position: 'relative',
    paddingRigth: 7,
  },
  borderLeft: {
    width: 1,
    height: 24,
    backgroundColor: Colors.grey[1000],
    position: 'absolute',
    left: -8,
  },
})

export default ESPasswordInput

import { OutlinedInput, OutlinedInputProps, FormHelperText, FormControl, Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
  isNumber?: boolean
  nowrapHelperText?: boolean
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void
}

function TextMaskCustom(props: TextMaskCustomProps) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      mask={createNumberMask({ ...defaultMaskOptions })}
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null)
      }}
    />
  )
}

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  thousandsSeparatorSymbol: ',', //11,111
  allowDecimal: false,
  decimalSymbol: '.',
  decimalLimit: 0, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const ESInputStream: React.FC<OutlinedInputProps & InputProps> = ({
  size = 'big',
  helperText,
  labelPrimary,
  labelSecondary,
  required = false,
  isNumber = false,
  nowrapHelperText = false,
  ...rest
}) => {
  const classes = useStyles({ hasSecondary: !!labelSecondary, isBig: size === 'big', isNumber: rest.type === 'number' })
  const { t } = useTranslation(['common'])
  return (
    <FormControl fullWidth={rest.fullWidth} className={nowrapHelperText ? classes.nowrapHelperText : ''}>
      {(labelPrimary || labelSecondary) && (
        <Box display="flex" justifyContent="space-between" alignItems="center" pb={1}>
          {typeof labelPrimary === 'string' && (
            <Box className={classes.labelPrimaryContainer} display="flex" alignItems="center">
              <label htmlFor={rest.id} className={classes.labelMargin}>
                {labelPrimary}
              </label>
              {required && (
                <Typography component="span" className={classes.required}>
                  {t('common:common.required')}
                </Typography>
              )}
            </Box>
          )}
          {typeof labelPrimary === 'object' && labelPrimary}
          {labelSecondary}
        </Box>
      )}
      {isNumber ? (
        <OutlinedInput
          classes={{ root: classes.root, adornedEnd: classes.end }}
          margin="dense"
          {...rest}
          inputComponent={TextMaskCustom as any}
        />
      ) : (
        <OutlinedInput classes={{ root: classes.root, adornedEnd: classes.end }} margin="dense" {...rest} />
      )}

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
      color: Colors.white_opacity['30'],
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&.MuiOutlinedInput-multiline.MuiOutlinedInput-marginDense': {
        padding: 0,
      },
    },
    '& .MuiInputBase-input.Mui-disabled': {
      padding: 0,
      paddingBottom: theme.spacing(1),
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  numberAlign: (props: { hasSecondary?: boolean; isBig?: boolean; isNumber?: boolean }) => ({
    textAlign: props.isNumber ? 'right' : 'left',
  }),
  labelMargin: (props: { hasSecondary?: boolean; isBig?: boolean; isNumber?: boolean }) => ({
    fontWeight: props.isBig ? 'bold' : 'normal',
    fontSize: props.isBig ? theme.typography.h3.fontSize : theme.typography.body1.fontSize,
  }),
  labelPrimaryContainer: (props: { hasSecondary?: boolean; isBig?: boolean; isNumber?: boolean }) => ({
    width: props.hasSecondary ? '50%' : '100%',
  }),
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
  end: {
    paddingRight: theme.spacing(1),
  },
  nowrapHelperText: {
    whiteSpace: 'nowrap',
  },
}))

export default ESInputStream

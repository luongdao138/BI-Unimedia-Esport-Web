import { FormControl, FormHelperText, Typography } from '@material-ui/core'
import RadioGroup, { RadioGroupProps } from '@material-ui/core/RadioGroup'
import { Colors } from '@theme/colors'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

type Props = {
  helperText?: string
  label?: string
  required?: boolean
  size?: 'big' | 'small'
}

const ESRadioVertical: React.FC<RadioGroupProps & Props> = ({ children, size = 'big', helperText, label, required = false, ...rest }) => {
  const classes = useStyles({ isBig: size === 'big' })
  const { t } = useTranslation(['common'])

  return (
    <FormControl className={classes.formPadding}>
      {label && (
        <label htmlFor={rest.id} className={classes.labelMargin}>
          {label}
          {required && (
            <Typography component="span" className={classes.required}>
              {t('common:common.required')}
            </Typography>
          )}
        </label>
      )}
      <RadioGroup {...rest}>{children}</RadioGroup>

      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: Colors.black,
  },
  formPadding: {
    paddingTop: theme.spacing(1),
  },
  labelMargin: (props: { isBig?: boolean }) => ({
    fontWeight: props.isBig ? 'bold' : 'normal',
    fontSize: props.isBig ? theme.typography.h3.fontSize : theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(1),
  }),
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

export default ESRadioVertical

import { Select, SelectProps, FormControl, FormHelperText, Box, Typography, withStyles, OutlinedInput } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
// import Icon from '@material-ui/core/Icon'

type Props = {
  helperText?: string
  label?: string
  required?: boolean
  size?: 'big' | 'small'
}

const ESSelect: React.FC<SelectProps & Props> = ({ size = 'big', helperText, label, required = false, ...rest }) => {
  const classes = useStyles({ isBig: size === 'big' })
  const { t } = useTranslation(['common'])

  return (
    <FormControl fullWidth={rest.fullWidth} className={classes.formPadding}>
      {label && (
        <Box display="flex" alignItems="center" pb={1}>
          <label htmlFor={rest.id} className={classes.labelMargin}>
            {label}
          </label>
          {required && (
            <Typography component="span" className={classes.required}>
              {t('common:common.required')}
            </Typography>
          )}
        </Box>
      )}
      <Select
        variant="outlined"
        margin="dense"
        native
        className={classes.root}
        input={<Input />}
        {...rest}
        // IconComponent={() => <Icon className="fas fa-chevron-down" />}
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
        borderColor: Colors.white,
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
  labelMargin: (props: { hasSecondary?: boolean; isBig?: boolean }) => ({
    fontWeight: props.isBig ? 'bold' : 'normal',
    fontSize: props.isBig ? theme.typography.h3.fontSize : theme.typography.body1.fontSize,
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
}))

export default ESSelect

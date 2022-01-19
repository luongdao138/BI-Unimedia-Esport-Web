import ESSwitchIOS from '@components/Switch'
import { OutlinedInputProps, FormControl, Box, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

export type InputProps = {
  nowrapHelperText?: boolean
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
  handleChangeSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void
  keySwitch?: string
  nameSwitch?: string
  valueSwitch?: boolean
}

const ESLabelWithSwitch: React.FC<OutlinedInputProps & InputProps> = ({
  size = 'big',
  labelPrimary,
  labelSecondary,
  required = false,
  nowrapHelperText = false,
  handleChangeSwitch,
  keySwitch,
  nameSwitch,
  valueSwitch,
  ...rest
}) => {
  const classes = useStyles({ hasSecondary: !!labelSecondary, isBig: size === 'big', isNumber: rest.type === 'number' })
  const { t } = useTranslation(['common'])

  return (
    <FormControl fullWidth={rest.fullWidth} className={nowrapHelperText ? classes.nowrapHelperText : ''}>
      {(labelPrimary || labelSecondary) && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
          <ESSwitchIOS key={keySwitch} handleChange={handleChangeSwitch} name={nameSwitch} checked={valueSwitch} />
          {typeof labelPrimary === 'object' && labelPrimary}
          {labelSecondary}
        </Box>
      )}
    </FormControl>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
  nowrapHelperText: {
    whiteSpace: 'nowrap',
  },
}))

export default ESLabelWithSwitch

import { CheckboxProps, Checkbox, FormControlLabel } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

type Props = {
  label?: string
}

const ESCheckbox: React.FC<CheckboxProps & Props> = ({ label, ...rest }) => {
  const classes = useStyles()

  return (
    <FormControlLabel
      className={classes.formControl}
      control={
        <Checkbox
          color="default"
          className={classes.root}
          disableRipple
          checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon}`} />}
          icon={<span className={classes.icon} />}
          {...rest}
        />
      }
      label={label}
      labelPlacement="end"
    />
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    marginLeft: 0,
    marginRight: 0,
  },
  root: {
    paddingTop: theme.spacing(0.625),
    paddingBottom: theme.spacing(0.625),
    paddingLeft: 0,
    paddingRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 4,
    border: `1px solid ${Colors.text[300]}`,
    width: 16,
    height: 16,
    backgroundColor: `${Colors.black}30`,
  },
  checkedIcon: {
    borderColor: 'transparent',
    backgroundColor: Colors.primary,
    '&:before': {
      display: 'block',
      width: 14,
      height: 14,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
}))

export default ESCheckbox

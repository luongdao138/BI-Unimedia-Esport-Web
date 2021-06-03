import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

export type ESLabelProps = {
  label: string
  required?: boolean
  size?: 'normal' | 'small'
}

const ESLabel: React.FC<ESLabelProps> = ({ label, required, size }) => {
  const classes = useStyles({ isNormal: size === 'normal' })
  const { t } = useTranslation()

  return (
    <Box className={classes.container}>
      <Typography component="span" className={classes.label}>
        {label}
      </Typography>
      {required && (
        <Typography component="span" className={classes.required}>
          {t('common:common.required')}
        </Typography>
      )}
    </Box>
  )
}

ESLabel.defaultProps = {
  required: false,
  size: 'normal',
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  label: (props: { isNormal?: boolean }) => ({
    fontWeight: props.isNormal ? 'bold' : 'normal',
    fontSize: props.isNormal ? theme.typography.h3.fontSize : theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
  }),
  required: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: theme.palette.common.white,
  },
}))

export default ESLabel

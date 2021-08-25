import { Box, Typography, Theme, makeStyles, Icon } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import React from 'react'

const ProgramInfo: React.FC = () => {
  // const { t } = useTranslation('common')
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Typography gutterBottom className={classes.label}>
        {'番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
          '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります…'}
      </Typography>
      <Box className={classes.seeMoreContainer}>
        <Typography className={classes.seeMoreTitle}>{'もっとみる'}</Typography>
        <Icon className={`fa fa-angle-down ${classes.angleDownIcon}`} fontSize="small" />
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginLeft: 9,
    marginRight: 14,
    marginTop: 8,
    fontSize: 14,
    color: Colors.grey['400'],
  },
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  seeMoreTitle: {
    color: Colors.grey['400'],
    fontSize: 14,
    marginRight: 6,
  },
  angleDownIcon: {
    color: Colors.grey['400'],
    fontSize: 12,
  },
}))
export default ProgramInfo

import React, { useState } from 'react'
import { Theme, Box, Typography, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { RecommendedUsers } from '@services/arena.service'
import CoOrganizer from './CoOrganizer'
import Icon from '@material-ui/core/Icon'
import _ from 'lodash'

interface Props {
  values: RecommendedUsers[]
  onChange: (values: RecommendedUsers[]) => void
}

const CoOrganizersDialog: React.FC<Props> = ({ values, onChange }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)

  const handleSubmit = (values) => {
    onChange(values)
    setOpen(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" pb={1}>
        <Typography className={classes.labelColor}>{t('common:tournament_create.co_organizer')}</Typography>
      </Box>
      <Box onClick={() => setOpen(true)} className={classes.inputContainer}>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(values) ? (
            <Typography className={classes.hintColor}>{t('common:common.not_selected')}</Typography>
          ) : (
            <Typography align="left" className={classes.textContainer}>
              {values.map((item, i) => (
                <Typography key={i} component="span" className={classes.names}>
                  {item.attributes.nickname}
                </Typography>
              ))}
            </Typography>
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </Box>

      {open && <CoOrganizer open={open} values={values} onSubmit={handleSubmit} hide={() => setOpen(false)} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  inputContainer: {
    width: '100%',
    position: 'relative',
    paddingRight: 50,
  },
  textContainer: {
    wordBreak: 'break-all',
  },
  names: {
    maxWidth: '100%',
    marginRight: theme.spacing(0.5),
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    display: 'inline-block',
  },
  icon: {
    color: Colors.white,
    position: 'absolute',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
  labelColor: {
    color: Colors.text[200],
  },
  hintColor: {
    color: Colors.text[300],
  },
}))

export default CoOrganizersDialog

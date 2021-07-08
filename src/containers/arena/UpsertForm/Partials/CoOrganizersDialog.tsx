import React, { useState } from 'react'
import { Theme, Box, Typography, makeStyles, ButtonBase } from '@material-ui/core'
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
      <ButtonBase onClick={() => setOpen(true)} className={classes.inputContainer}>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(values) ? (
            <Typography className={classes.hintColor}>{t('common:common.not_selected')}</Typography>
          ) : (
            values.map((item) => (
              <Box paddingRight={1} key={item.id}>
                <Typography>{item.attributes.nickname}</Typography>
              </Box>
            ))
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </ButtonBase>

      {open && <CoOrganizer open={open} values={values} onSubmit={handleSubmit} hide={() => setOpen(false)} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  icon: {
    color: Colors.white,
  },
  labelColor: {
    color: Colors.text[200],
  },
  hintColor: {
    color: Colors.text[300],
  },
}))

export default CoOrganizersDialog

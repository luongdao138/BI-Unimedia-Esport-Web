import React, { useState } from 'react'
import { Theme, Box, Typography, makeStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import Dialog from '@material-ui/core/Dialog'
import { useTranslation } from 'react-i18next'
import ButtonBase from '@material-ui/core/ButtonBase'
import BlankLayout from '@layouts/BlankLayout'
import _ from 'lodash'

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

const CoOrganizersDialog: React.FC<Props> = ({ value, onChange }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)

  return (
    <>
      <Box display="flex" alignItems="center" pb={1}>
        <Typography className={classes.labelColor}>{t('common:tournament_create.co_organizer')}</Typography>
      </Box>
      <ButtonBase onClick={() => setOpen(true)} className={classes.inputContainer}>
        <Box display="flex" flexDirection="row" flexWrap="wrap">
          {_.isEmpty(value) ? (
            <Typography className={classes.hintColor}>{t('common:common.not_selected')}</Typography>
          ) : (
            <Box paddingRight={1}>
              <Typography>{`#${value}`}</Typography>
            </Box>
          )}
        </Box>
        <Icon className={`fa fa-chevron-right ${classes.icon}`} fontSize="small" />
      </ButtonBase>

      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <Box className={classes.dialog}>
          <BlankLayout>
            <Box pt={7.5} pb={9} className={classes.topContainer}>
              <Box py={2} display="flex" flexDirection="row" alignItems="center">
                <IconButton className={classes.iconButtonBg} onClick={() => setOpen(false)}>
                  <Icon className="fa fa-arrow-left" fontSize="small" />
                </IconButton>
                <Box pl={2}>
                  <Typography variant="h2">{t('common:user_profile.tag_edit')}</Typography>
                </Box>
              </Box>

              <Box className={classes.blankSpace}></Box>
              {onChange}
            </Box>
          </BlankLayout>
        </Box>
      </Dialog>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    backgroundColor: Colors.grey[100],
    minHeight: '100vh',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  blankSpace: {
    height: 169,
  },
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
  icon: {
    color: Colors.white,
  },
  labelColor: {
    color: Colors.text[200],
  },
  hintColor: {
    color: Colors.text[300],
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
    inputContainer: {
      marginLeft: theme.spacing(3),
      paddingRight: theme.spacing(6),
    },
  },
}))

export default CoOrganizersDialog

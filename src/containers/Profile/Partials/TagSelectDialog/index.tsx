import React, { useState } from 'react'
import { Theme, Box, Container, Grid, Typography, makeStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import Dialog from '@material-ui/core/Dialog'
import { useTranslation } from 'react-i18next'
import TagSelect from '@components/TagSelect'
import ButtonBase from '@material-ui/core/ButtonBase'
import BlankLayout from '@layouts/BlankLayout'

import _ from 'lodash'

export type TagSelectDialogParams = {
  nickname: string
  nickname2: string
  bio: string
}

interface TagSelectDialogProps {
  selected: any
  features: any
  max?: number
  onFeatureSelect: (data: any) => void
}

const TagSelectDialog: React.FC<TagSelectDialogProps> = ({ selected, features, onFeatureSelect, max }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const [open, setOpen] = useState(false)

  return (
    <Container maxWidth="md" className={classes.container}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ButtonBase onClick={() => setOpen(true)} className={classes.inputContainer}>
              <Box display="flex" flexDirection="row" flexWrap="wrap">
                {_.isEmpty(selected) ? (
                  <Typography>{t('common:common.not_selected')}</Typography>
                ) : (
                  selected.map((item) => (
                    <Box paddingRight={1} key={item.id}>
                      <Typography>{`#${item.feature}`}</Typography>
                    </Box>
                  ))
                )}
              </Box>
              <Icon className="fa fa-chevron-right" fontSize="small" />
            </ButtonBase>

            <Dialog
              fullScreen
              open={open}
              onClose={() => setOpen(false)}
              BackdropProps={{
                onTouchMove: (e) => {
                  e.preventDefault()
                },
                onTouchStart: (e) => {
                  e.preventDefault()
                },
                onTouchEnd: (e) => {
                  e.preventDefault()
                },
              }}
            >
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
                    <Typography className={classes.tag_up_to}>{t('common:profile.tag_up_to')}</Typography>
                    <TagSelect
                      features={features}
                      selectedFeatures={selected}
                      onSelectChange={(data: any) => {
                        if ((max && selected.length < max) || max === undefined || data.length <= max) onFeatureSelect(data)
                      }}
                    />
                    <Box className={classes.blankSpace}></Box>
                  </Box>
                </BlankLayout>
              </Box>
            </Dialog>
          </Grid>
        </Grid>
      </form>
    </Container>
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
  tag_up_to: {
    padding: '20px 0',
    textAlign: 'center',
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

export default TagSelectDialog

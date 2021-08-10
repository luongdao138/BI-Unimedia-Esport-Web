import { makeStyles, Theme, Box, IconButton, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import Icon from '@material-ui/core/Icon'
import { useState } from 'react'
import CoverUploader from './Partials/CoverUploader'
import Confirm from './Confirm'
import ESStickyFooter from '@components/StickyFooter'
import ESFastInput from '@components/FastInput'
import ButtonPrimary from '@components/ButtonPrimary'
import i18n from '@locales/i18n'

const TopicCreate: React.FC = () => {
  const classes = useStyles()
  const [isConfirm, setIsConfirm] = useState(false)
  const isEdit = false

  const renderEditButton = () => {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" className={classes.editButtonContainer}>
        <ButtonPrimary onClick={handleSetConfirm} round className={`${classes.footerButton} ${classes.confirmButton}`} disabled={false}>
          {i18n.t('common:topic_create.title')}
        </ButtonPrimary>
      </Box>
    )
  }

  const handleUnsetConfirm = () => setIsConfirm(false)

  const handleSetConfirm = () => {
    setIsConfirm(true)
  }

  return (
    <ESStickyFooter
      disabled={false}
      noScroll
      noSpacing={true}
      content={
        <>
          {isConfirm ? (
            <Box className={classes.reviewButtonContainer}>
              <ButtonPrimary onClick={handleUnsetConfirm} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
                {i18n.t('common:common.cancel')}
              </ButtonPrimary>
              <ButtonPrimary type="submit" onClick={handleSetConfirm} round disabled={false} className={classes.footerButton}>
                {i18n.t('common:lobby_create.submit')}
              </ButtonPrimary>
            </Box>
          ) : isEdit ? (
            renderEditButton()
          ) : (
            <ButtonPrimary onClick={handleSetConfirm} round className={`${classes.footerButton} ${classes.confirmButton}`} disabled={false}>
              {i18n.t('common:lobby_create.submit')}
            </ButtonPrimary>
          )}
        </>
      }
    >
      <>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton
              className={classes.iconButtonBg}
              onClick={() => {
                return 0
              }}
            >
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">
                {isConfirm ? i18n.t('common:topic_create.confirm') : i18n.t('common:topic_create.title')}
              </Typography>
            </Box>
          </Box>
        </Box>
        <form>
          <Box>
            {isConfirm ? (
              <Confirm />
            ) : (
              <Box>
                <Box py={4} className={classes.formContainer}>
                  <Box pb={9}>
                    <Box pb={4}>
                      <ESFastInput
                        id="title"
                        name="stepOne.title"
                        labelPrimary={i18n.t('common:topic_create.name')}
                        fullWidth
                        size="small"
                        required
                        disabled={false}
                      />
                    </Box>
                    <Box pb={4}>
                      <ESFastInput
                        id="stepOne.overview"
                        name="stepOne.overview"
                        multiline
                        rows={5}
                        labelPrimary={i18n.t('common:topic_create.text')}
                        placeholder={i18n.t('common:topic_create.please_enter')}
                        fullWidth
                        size="small"
                        required
                        disabled={false}
                      />
                    </Box>
                    <Box pb={4}>
                      <CoverUploader src={''} disabled={false} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </form>
      </>
    </ESStickyFooter>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  footerButton: {
    width: 'fit-content',
    alignSelf: 'center',
    minWidth: `220px !important`,
    paddingLeft: `${theme.spacing(4)}px !important`,
    paddingRight: `${theme.spacing(4)}px !important`,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    '&$confirmButton': {
      minWidth: `280px !important`,
    },
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  editButtonContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topContainer: {
    paddingBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingTop: theme.spacing(4),
    },
    topContainer: {
      paddingTop: 0,
    },
    reviewButtonContainer: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
    cancelButton: {
      marginTop: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('md')]: {
    formContainer: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}))

export default TopicCreate

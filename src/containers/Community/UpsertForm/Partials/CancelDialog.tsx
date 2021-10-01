import { useState } from 'react'
import { Colors } from '@theme/colors'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'
import ESStickyFooter from '@components/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import ESLabel from '@components/Label'
import { Box, makeStyles, Typography, Theme, Icon, IconButton } from '@material-ui/core'
import LinkButton from '@components/LinkButton'
import useCancelDialog from './useCancelDialog'
import { useRouter } from 'next/router'

type CancelDialogProps = {
  communityName: string
}

const CancelDialog: React.FC<CancelDialogProps> = ({ communityName }) => {
  const [modal, setModal] = useState(false)
  const classes = useStyles()
  const { closeCommunity } = useCancelDialog()
  const { query } = useRouter()
  const { hash_key } = query
  const { t } = useTranslation(['common'])

  const handleClose = () => {
    setModal(false)
  }

  const handleSubmit = () => {
    closeCommunity(String(hash_key))
    setModal(false)
  }

  const renderBackButton = () => {
    return (
      <Box pt={7.5} pb={10.625} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={handleClose}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>
            <Typography variant="h2">{t('common:community_create.disband.title')}</Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  const renderFooterButtons = () => {
    return (
      <Box className={classes.reviewButtonContainer}>
        <ButtonPrimary onClick={handleClose} gradient={false} className={`${classes.footerButton} ${classes.cancelButton}`}>
          {t('common:common.cancel')}
        </ButtonPrimary>
        <ButtonPrimary type="submit" onClick={handleSubmit} round className={classes.footerButton}>
          {t('common:community_create.disband.submit')}
        </ButtonPrimary>
      </Box>
    )
  }

  const renderDetailContainer = () => {
    return (
      <Box py={4} className={classes.detailContainer}>
        <ESLabel label={t('common:community_create.disband.disband_community')} size="small" />
        <Box className={classes.userInfoContainer} mb={4}>
          <Box display="flex" alignItems="center" mr={2}>
            <Icon className={`fas fa-users ${classes.communityIcon}`} />
          </Box>
          <Typography variant="body1" className={classes.communityTitle}>
            {communityName}
          </Typography>
        </Box>
        <ESLabel label={t('common:community_create.disband.description')} size="small" />
      </Box>
    )
  }

  return (
    <>
      <Box mt={3}>
        {/* //TODO check if disbanded */}
        <LinkButton onClick={() => setModal(true)}>{t('common:community_create.edit.disband_button')}</LinkButton>
      </Box>
      <ESModal open={modal} handleClose={handleClose}>
        <BlankLayout>
          <ESStickyFooter disabled={false} noScroll content={renderFooterButtons()}>
            <>
              {renderBackButton()}
              {renderDetailContainer()}
            </>
          </ESStickyFooter>
        </BlankLayout>
      </ESModal>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  userInfoContainer: {
    backgroundColor: Colors.black,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    borderStyle: 'solid',
    borderColor: Colors.grey[400],
    borderRadius: 4,
    borderWidth: 0.5,
    display: 'flex',
    alignItems: 'center',
  },
  communityIcon: {
    fontSize: 16,
    color: Colors.white,
  },
  communityTitle: {
    color: Colors.white,
    wordBreak: 'break-all',
  },
  confirmButton: {},
  cancelButton: {},
  footerButton: {
    width: 'fit-content',
    alignSelf: 'center',
    minWidth: `220px !important`,
    paddingLeft: `${theme.spacing(4)}px !important`,
    paddingRight: `${theme.spacing(4)}px !important`,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
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
  reviewButtonContainer: {},
  editButtonContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  topContainer: {
    paddingBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
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
    detailContainer: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
  },
}))

export default CancelDialog

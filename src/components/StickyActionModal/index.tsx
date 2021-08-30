import { Colors } from '@theme/colors'
import { ReactNode } from 'react'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { Typography, IconButton, Box, makeStyles, Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ButtonPrimary from '@components/ButtonPrimary'

type StickyActionModalProps = {
  open: boolean
  children?: ReactNode
  actionButtonText: string
  actionButtonDisabled: boolean
  actionHintText?: string
  returnText: string
  onReturnClicked: () => void
  onActionButtonClicked: () => void
  hideFooter?: boolean
  hideFooterOnMobile?: boolean
}
const StickyActionModal: React.FC<StickyActionModalProps> = ({
  open,
  children,
  actionButtonText,
  actionButtonDisabled,
  actionHintText,
  returnText,
  onReturnClicked,
  onActionButtonClicked,
  hideFooter,
  hideFooterOnMobile,
}) => {
  const classes = useStyles()

  return (
    <ESModal open={open}>
      <BlankLayout>
        <Box pt={7.5} pb={9} className={classes.childrenContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButton} onClick={onReturnClicked}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{returnText}</Typography>
            </Box>
          </Box>

          {children}
        </Box>

        {hideFooter === true ? null : (
          <Box className={`${classes.stickyFooter} ${hideFooterOnMobile ? classes.hideFooterOnMobile : ''}`}>
            {actionHintText && (
              <Box className={classes.hintTextContainer}>
                <Typography variant="body2">{actionHintText}</Typography>
              </Box>
            )}
            <Box className={classes.actionButtonHolder}>
              <Box className={classes.buttonContainer}>
                <ButtonPrimary type="button" round fullWidth disabled={actionButtonDisabled} onClick={onActionButtonClicked}>
                  {actionButtonText}
                </ButtonPrimary>
              </Box>
            </Box>
          </Box>
        )}
      </BlankLayout>
    </ESModal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    zIndex: 100,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
    paddingTop: theme.spacing(2.5),
  },
  actionButtonHolder: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
  childrenContainer: {
    marginBottom: theme.spacing(20),
  },
  [theme.breakpoints.down('sm')]: {
    childrenContainer: {
      paddingTop: 0,
      marginBottom: theme.spacing(20),
    },
    hideFooterOnMobile: {
      display: 'none',
    },
  },
  hintTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2.5),
  },
}))

export default StickyActionModal

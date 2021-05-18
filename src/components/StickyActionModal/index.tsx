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
  returnText: string
  onReturnClicked: () => void
  onActionButtonClicked: () => void
}
const StickyActionModal: React.FC<StickyActionModalProps> = ({
  open,
  children,
  actionButtonText,
  actionButtonDisabled,
  returnText,
  onReturnClicked,
  onActionButtonClicked,
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

        <Box className={classes.stickyFooter}>
          <Box className={classes.actionButtonHolder}>
            <Box>
              <ButtonPrimary type="button" round fullWidth disabled={actionButtonDisabled} onClick={onActionButtonClicked}>
                {actionButtonText}
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
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
  },
  actionButtonHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  childrenContainer: {
    marginBottom: theme.spacing(20),
  },
  [theme.breakpoints.down('sm')]: {
    childrenContainer: {
      paddingTop: 0,
      marginBottom: theme.spacing(20),
    },
  },
}))

export default StickyActionModal

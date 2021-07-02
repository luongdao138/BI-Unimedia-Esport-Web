import { Typography, Box, makeStyles, Theme, withStyles } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESMenuItem from '@components/Menu/MenuItem'
import ESMenu from '@components/Menu'
import { useRouter } from 'next/router'
import i18n from '@locales/i18n'
import ButtonPrimary from '@components/ButtonPrimary'
import Dialog from '@material-ui/core/Dialog'
import React, { useEffect } from 'react'
import MuiDialogContent from '@material-ui/core/DialogContent'
import useUnblock from '@containers/Profile/useUnblock'
import ESLoader from '@components/Loader'
import { addToast } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'

interface Props {
  data: any
  actionHandler: (userCode: string) => void
}

const BlockedUserItem: React.FC<Props> = ({ data, actionHandler }) => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const user = data.attributes
  const router = useRouter()
  const classes = useStyles()
  const { unblockUser, unblockMeta } = useUnblock()
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

  const handleClickOpen = () => {
    setOpenConfirmDialog(true)
  }

  const handleClose = () => {
    setOpenConfirmDialog(false)
  }

  const handleSubmit = () => {
    unblockUser({ user_code: user.user_code })
    setOpenConfirmDialog(false)
  }

  useEffect(() => {
    if (unblockMeta.loaded && unblockMeta.error === false) {
      actionHandler(user.user_code)
      dispatch(addToast(i18n.t('common:block_settings.unblock_success')))
    }
  }, [unblockMeta])

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
      display: 'block',
      background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
      width: '100%',
      '&:first-child': {
        padding: theme.spacing(3),
      },
    },
  }))(MuiDialogContent)

  return (
    <div>
      <Box margin={2} display="flex" justifyContent="space-between">
        <Box display="flex" overflow="hidden" className={classes.wrap}>
          <ESAvatar
            alt={user.nickname}
            src={user.avatar}
            onClick={() => {
              router.push(`/profile/${user.user_code}`)
            }}
          />
          <Box overflow="hidden" textOverflow="ellipsis" ml={1} display="flex" flexDirection="column" justifyContent="center" width="100%">
            <Typography noWrap style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
              {user.nickname}
            </Typography>
            <Typography variant="caption" noWrap>
              {t('common:common.at')}
              {user.user_code}
            </Typography>
          </Box>
          <Box className={classes.menu}>
            <ESMenu>
              <ESMenuItem onClick={() => handleClickOpen()}>
                {t('common:profile.unblock')}
                {unblockMeta.pending ? <ESLoader /> : null}
              </ESMenuItem>
            </ESMenu>
          </Box>
        </Box>
      </Box>
      <Dialog
        disableBackdropClick
        maxWidth={'md'}
        fullWidth
        open={openConfirmDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box className={classes.containerDialog}>
            <Typography className={classes.dialogTitle}>{i18n.t('common:profile.block_confirm_title')}</Typography>
          </Box>
          <Box className={classes.actionBox}>
            <ButtonPrimary size="small" className={classes.actionBtn} gradient={false} onClick={handleClose}>
              {i18n.t('common:profile.block_confirm_no')}
            </ButtonPrimary>
            <ButtonPrimary size="small" className={classes.actionBtn} onClick={handleSubmit}>
              {i18n.t('common:profile.block_confirm_yes')}
            </ButtonPrimary>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    width: '100%',
    padding: theme.spacing(2),
    background: Colors.black_opacity[80],
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  menu: {
    alignSelf: 'center',
  },
  containerDialog: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 56,
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  actionBtn: {
    width: 200,
    margin: 16,
  },
}))

export default BlockedUserItem

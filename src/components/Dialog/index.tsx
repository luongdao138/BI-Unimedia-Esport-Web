import React from 'react'
import { makeStyles, Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { useTranslation } from 'react-i18next'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      left: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      left: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.6)',
  },
})

export interface ESDialogProps {
  open: boolean
  handleClose: () => void
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {onClose ? (
        <>
          <IconButton aria-label="close" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
              <g id="LV2_btn_back" data-name="LV2 / btn / back" transform="translate(0)">
                <rect
                  id="Rectangle_2705"
                  data-name="Rectangle 2705"
                  width="36"
                  height="36"
                  rx="18"
                  transform="translate(0)"
                  fill="rgba(77,77,77,0.8)"
                />
                <g id="Component_49_2" data-name="Component 49 – 2" transform="translate(12 12)">
                  <g id="Group_6190" data-name="Group 6190" transform="translate(-211.513)">
                    <path
                      id="Path_16686"
                      data-name="Path 16686"
                      d="M217.513,309l-6,6,6,6"
                      transform="translate(0 -309)"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                    <line
                      id="Line_439"
                      data-name="Line 439"
                      x2="12"
                      transform="translate(211.513 6)"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </IconButton>
          <span style={{ color: 'white' }}>{children}</span>
        </>
      ) : null}
    </MuiDialogTitle>
  )
})

const ESDialog: React.FC<ESDialogProps> = ({ open, handleClose, children, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <Dialog
      aria-labelledby="Followers"
      open={open}
      onClose={handleClose}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      {...rest}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t('common:followers.title')}
      </DialogTitle>

      {children}
    </Dialog>
  )
}
export default ESDialog

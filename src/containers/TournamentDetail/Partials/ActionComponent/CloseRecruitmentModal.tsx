import React from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import ESButton from '@components/Button'
import { Colors } from '@theme/colors'
// import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { WarningRounded } from '@material-ui/icons'

interface CloseRecruitmentModalProps {
  tournament: TournamentDetail
  handleClose: () => void
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = () => {
  // const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <Box className={classes.actionButton}>
        <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
          エントリーを締め切る
        </ButtonPrimary>
      </Box>
      <Box className={classes.description}>
        <Typography variant="body2">{'エントリー期間終了時、自動的にエントリーが締め切られます'}</Typography>
      </Box>

      <ESModal open={open}>
        <BlankLayout>
          <BlackBox>
            <Box className={classes.childrenContainer}>
              <Box color={Colors.white} alignItems="center">
                <Typography className={classes.title}>{'現在の人数でメンバーを確定しますか？'}</Typography>
                <Typography variant="h2" className={classes.description}>
                  {'エントリー人数と参加枠数の設定に差がある場合、自動的にトーナメントの枠数の最適化を行います'}
                </Typography>
              </Box>

              <Box className={classes.actionButtonContainer}>
                <Box className={classes.actionButton}>
                  <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(false)}>
                    キャンセル
                  </ESButton>
                </Box>
                <Box className={classes.actionButton}>
                  <ButtonPrimary round fullWidth onClick={() => setOpen(false)}>
                    締め切る
                  </ButtonPrimary>
                </Box>
              </Box>

              <Box display="flex" flexDirection="row" alignItems="center" color="#F7F560">
                <WarningRounded fontSize="small" />
                <Typography variant="body2">{'エントリー募集の再開はできません'}</Typography>
              </Box>
            </Box>
          </BlackBox>
        </BlankLayout>
      </ESModal>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    // width:
    // width: '100%',
    // margin: '0 auto',
  },
  container: {},
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
}))

export default CloseRecruitmentModal

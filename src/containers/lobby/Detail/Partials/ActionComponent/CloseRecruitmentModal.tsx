import React, { useEffect } from 'react'
import { LobbyDetail } from '@services/lobbydump.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, DialogContent } from '@material-ui/core'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
import ESDialog from '@components/Dialog'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList as List } from 'react-window'
import ParticipantRow from './ParticipantRow'
import ESLoader from '@components/Loader'
import ConfirmDialog from '@components/ConfirmDialog'

interface CloseRecruitmentModalProps {
  tournament: LobbyDetail
  isRecruiting: boolean
  handleClose: () => void
}

export type Meta = {
  pending: boolean
  loaded: boolean
  error: boolean | Record<string, any>
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({ isRecruiting }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [shuffleOpen, setShuffleOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [participants, setParticipants] = useState<{ id: number; user_code: string; avatar: string; nickname: string; status: boolean }[]>(
    []
  )
  const meta = {
    pending: false,
    loaded: true,
    error: false,
  }
  const hasNextPage = false
  const users = [
    {
      id: 86,
      user_code: 'cage21',
      nickname: 'cage',
      avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/86/1624946172-86.jpeg',
      status: false,
    },
    {
      id: 23,
      user_code: 'raiden23',
      nickname: 'raiden',
      avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/23/1596358566-23.jpg',
      status: false,
    },
  ]

  useEffect(() => {
    setParticipants(users)
  }, [])

  const ListRow = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const user = data[index]
    return (
      <div style={style} key={index}>
        <ParticipantRow
          user={user}
          checked={user.status}
          handleClose={() => setModalOpen(false)}
          handleChange={() => handleChange(index)}
        />
      </div>
    )
  }

  const itemCount = participants.length

  const loadMore = () => {
    if (hasNextPage) {
      // fetchParticipants({ page: page.current_page + 1, user_code: user_code })
    }
  }

  const handleChange = (index: number) => {
    setParticipants(
      participants.map((participant, i) => {
        if (i === index) return { ...participant, status: !participant.status }
        return participant
      })
    )
  }

  return (
    <Box>
      <Box className={classes.button}>
        <LoginRequired>
          <ButtonPrimaryOutlined disabled={!isRecruiting} onClick={() => setModalOpen(true)}>
            {t('common:recruitment.close_recruitment.button_text')}
          </ButtonPrimaryOutlined>
        </LoginRequired>
      </Box>

      <ESDialog
        title={t('common:confirm_member.title')}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        classes={{
          paperFullWidth: classes.dialogFullWidth,
          paper: classes.dialogPaper,
        }}
      >
        <Typography className={classes.subTitle}>{t('common:confirm_member.sub_title')}</Typography>
        <Box display="flex" className={classes.rowContainer} textAlign="center">
          <Typography className={classes.subTitle}>{t('common:confirm_member.total_participants')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.selectedNumber}>{participants.filter((p) => p.status).length}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.subTitle}>{t('common:confirm_member.from')}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.totals}>/</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.totals}>{participants.length}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.subTitle}>{t('common:confirm_member.from')}</Typography>
          </Box>
        </Box>

        <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
          <InfiniteLoader isItemLoaded={(index: number) => index < participants.length} itemCount={itemCount} loadMoreItems={loadMore}>
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
                height={innerHeight - 200}
                width={'100%'}
                itemCount={participants.length}
                itemData={participants}
                itemSize={66}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {ListRow}
              </List>
            )}
          </InfiniteLoader>
          {meta.pending ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
        </DialogContent>
        <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={18.5}>
          <Box className={classes.actionButton}>
            <LoginRequired>
              <ButtonPrimary
                round
                fullWidth
                size="large"
                disabled={!isRecruiting && participants.filter((p) => p.status).length == 0}
                onClick={() => setConfirmOpen(true)}
              >
                {t('common:confirm_member.confirm')}
              </ButtonPrimary>
            </LoginRequired>
          </Box>
          <Box className={classes.actionButton}>
            <LoginRequired>
              <ButtonPrimaryOutlined disabled={!isRecruiting} onClick={() => setShuffleOpen(true)}>
                {t('common:confirm_member.shuffle')}
              </ButtonPrimaryOutlined>
            </LoginRequired>
          </Box>
        </Box>
      </ESDialog>

      <ConfirmDialog
        open={confirmOpen}
        title={t('common:confirm_member.confirm_title')}
        cancelButtonTitle={t('common:confirm_member.confirm_cancel_title')}
        okButtonTitle={t('common:confirm_member.confirm_ok_title')}
        warningTitle={t('common:confirm_member.confirm_warning_title')}
        handleClose={() => {
          setConfirmOpen(false)
        }}
        handleSubmit={() => {
          setConfirmOpen(false)
        }}
      />

      <ConfirmDialog
        open={shuffleOpen}
        title={t('common:confirm_member.shuffle_title')}
        description={t('common:confirm_member.shuffle_description')}
        cancelButtonTitle={t('common:confirm_member.shuffle_cancel_title')}
        okButtonTitle={t('common:confirm_member.shuffle_ok_title')}
        warningTitle={t('common:confirm_member.shuffle_warning_title')}
        handleClose={() => {
          setShuffleOpen(false)
        }}
        handleSubmit={() => {
          setShuffleOpen(false)
        }}
      />
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
  rowContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedNumber: { fontSize: 24, fontWeight: 'bold' },
  totals: {
    fontSize: 22,
  },
  slash: { fontSize: 20 },
  countContainer: {
    marginLeft: 8,
    alignItems: 'center',
  },
  childrenContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  desc: {
    fontSize: 18,
    color: Colors.white,
  },
  button: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
      flexDirection: 'column-reverse',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
  },
}))

export default CloseRecruitmentModal

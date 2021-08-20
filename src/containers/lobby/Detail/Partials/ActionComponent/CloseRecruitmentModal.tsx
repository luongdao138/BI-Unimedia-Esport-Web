import React, { useEffect } from 'react'
import { ParticipantsItem } from '@services/lobby.service'
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
import ESFullLoader from '@components/FullScreenLoader'
import ConfirmDialog from '@components/ConfirmDialog'
import _ from 'lodash'

interface CloseRecruitmentModalProps {
  participants: Array<ParticipantsItem>
  recommended_participants: Array<ParticipantsItem>
  open: boolean
  isRecruiting: boolean
  max_participants: number
  participantsMeta: Meta
  recommendedParticipantsMeta: Meta
  onConfirm: () => void
  handleClose: () => void
  randomizeParticipants: () => void
  onConfirmParticipants: (participants_ids: Array<number>) => void
}

export type Meta = {
  pending: boolean
  loaded: boolean
  error: boolean | Record<string, any>
}

type ParticipantsFormItem = {
  id: number
  user_id: number
  status: number
  nickname: string
  user_code: string
  avatar_url: string
  checked: boolean
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({
  participants,
  open,
  isRecruiting,
  max_participants,
  recommended_participants,
  randomizeParticipants,
  participantsMeta,
  recommendedParticipantsMeta,
  onConfirmParticipants,
}) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [shuffleOpen, setShuffleOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(open)
  const [formParticipants, setFormParticipants] = useState<ParticipantsFormItem[]>([])
  const [reload, setReload] = useState(false)
  const [error, setError] = useState(true)

  useEffect(() => {
    setReload(false)
    const totalCheck = formParticipants.filter((p) => p.checked).length
    if (totalCheck == max_participants && max_participants > 0) setError(false)
    else setError(true)
  }, [reload])

  useEffect(() => {
    if (participants && participants.length > 0) {
      const arr = _.map(participants, function (participant) {
        return _.extend({}, participant.attributes, { checked: false })
      })
      setFormParticipants(arr)
      setReload(true)
    }
  }, [participants])

  useEffect(() => {
    if (recommended_participants && recommended_participants.length > 0) {
      const arr: Array<ParticipantsFormItem> = formParticipants
      for (let i = 0; i < arr.length; i++) {
        const index = _.result(
          _.find(recommended_participants, function (obj) {
            return parseInt(obj.id) === arr[i].id
          }),
          'id'
        )
        arr[i].checked = index ? true : false
      }
      setFormParticipants(arr)
      setReload(true)
    }
  }, [recommended_participants])

  const hasNextPage = false

  const ListRow = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const user = data[index]
    return user ? (
      <div style={style} key={index}>
        <ParticipantRow
          user={user}
          checked={user.checked}
          handleClose={() => setModalOpen(false)}
          handleChange={() => handleChange(index)}
        />
      </div>
    ) : (
      <></>
    )
  }

  const loadMore = () => {
    if (hasNextPage) {
      // fetchParticipants({ page: page.current_page + 1, user_code: user_code })
    }
  }

  const handleChange = (index: number) => {
    const arr = [...formParticipants]
    arr[index].checked = !arr[index].checked
    setFormParticipants(arr)
    setReload(true)
  }

  return (
    <Box>
      <ESDialog
        title={t('common:confirm_member.title')}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        classes={{
          paperFullWidth: classes.dialogFullWidth,
          paper: classes.dialogPaper,
        }}
        bkColor="rgba(0,0,0,0.8)"
      >
        <Typography className={classes.subTitle}>{t('common:confirm_member.sub_title')}</Typography>
        <Box display="flex" className={classes.rowContainer} textAlign="center">
          <Typography className={classes.subTitle}>{t('common:confirm_member.total_participants')}</Typography>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.selectedNumber}>{formParticipants.filter((p) => p.checked).length}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.subTitle}>{t('common:confirm_member.from')}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.totals}>/</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.totals}>{max_participants}</Typography>
          </Box>
          <Box display="flex" className={classes.countContainer}>
            <Typography className={classes.subTitle}>{t('common:confirm_member.from')}</Typography>
          </Box>
        </Box>
        <DialogContent style={{ paddingRight: 0, paddingLeft: 0 }}>
          <InfiniteLoader
            itemCount={formParticipants ? formParticipants.length : 0}
            loadMoreItems={loadMore}
            isItemLoaded={(index: number) => (index < formParticipants.length ? formParticipants.length : 0)}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className={classes.scroll}
                height={innerHeight - 200}
                width={'100%'}
                itemCount={formParticipants ? formParticipants.length : 0}
                itemData={formParticipants}
                itemSize={66}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {ListRow}
              </List>
            )}
          </InfiniteLoader>
          {participantsMeta.pending || recommendedParticipantsMeta.pending ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
        </DialogContent>
        <Box className={classes.actionButtonContainer} paddingX={3} paddingTop={3.5}>
          <Box className={classes.actionButton}>
            <LoginRequired>
              <ButtonPrimary round fullWidth size="large" disabled={error} onClick={() => setConfirmOpen(true)}>
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

      {recommendedParticipantsMeta.pending && <ESFullLoader open={recommendedParticipantsMeta.pending} />}

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
          const arr = _.filter(formParticipants, (p) => p.checked)
          const arr2 = arr.map((a) => a.user_id)
          onConfirmParticipants(arr2)
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
          randomizeParticipants()
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

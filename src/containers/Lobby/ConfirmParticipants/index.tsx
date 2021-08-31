import React, { useEffect } from 'react'
import { ConfirmParticipantItem } from '@services/lobby.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, DialogContent } from '@material-ui/core'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
import ESDialog from '@components/Dialog'
import ParticipantRow from './ParticipantRow'
import ESFullLoader from '@components/FullScreenLoader'
import _ from 'lodash'
import { LobbyDetail } from '@services/lobby.service'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLobbyActions from '../hooks/useLobbyActions'
import ESLoader from '@components/Loader'
import { LOBBY_STATUS, LOBBY_DIALOGS } from '@constants/lobby.constants'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import ESStickyFooter from '@components/StickyFooter'
import BlankLayout from '@layouts/BlankLayout'
import { useConfirm } from '@components/Confirm'

interface CloseRecruitmentModalProps {
  lobby: LobbyDetail
  open: boolean
  handleClose: () => void
}

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({ lobby, open, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [hasMore, setHasMore] = useState(true)
  const [selectedParticipants, setSelectedParticipants] = useState<ConfirmParticipantItem[]>([])
  const router = useRouter()
  const confirm = useConfirm()

  const {
    participants,
    participantsMeta,
    participantsPageMeta,
    getParticipants,
    resetMeta,
    resetParticipants,
    recommendedParticipants,
    recommendedParticipantsMeta,
    getRecommendedParticipants,
    confirmParticipants,
    confirmParticipantsMeta,
  } = useLobbyActions()
  const { status, max_participants, hash_key } = lobby.attributes

  const page = participantsPageMeta

  useEffect(() => {
    if (open) {
      getParticipants({ page: 1, hash_key: hash_key })
    } else {
      resetParticipants()
    }

    return () => {
      resetParticipants()
      resetMeta()
    }
  }, [open])

  useEffect(() => {
    if (confirmParticipantsMeta.loaded) handleClose()
  }, [confirmParticipantsMeta.loaded])

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getParticipants({ page: page.current_page + 1, hash_key: hash_key })
  }

  useEffect(() => {
    if (!_.isEmpty(participants)) {
      const _participants = _.map(participants, (participant) => _.extend({}, participant, { checked: false }))
      setSelectedParticipants(_participants)
    }
  }, [participants])

  useEffect(() => {
    if (!_.isEmpty(recommendedParticipants)) {
      const arr = selectedParticipants.map((a) => {
        const item = _.find(recommendedParticipants, (p) => p.id === a.id)
        return { ...a, checked: _.isObject(item) }
      })
      setSelectedParticipants(arr)
    }
  }, [recommendedParticipants])

  const handleChange = (index: number) => {
    const _selectedParticipants = [...selectedParticipants]
    if (_selectedParticipants.filter((a) => a.checked).length < max_participants || _selectedParticipants[index].checked) {
      _selectedParticipants[index].checked = !_selectedParticipants[index].checked
      setSelectedParticipants(_selectedParticipants)
    }
  }

  const handleToProfile = (userCode: string) => {
    handleClose()
    router.push(`${ESRoutes.PROFILE}/${userCode}`)
  }

  return (
    <Box>
      <ESDialog
        title={t('common:confirm_member.title')}
        open={open}
        handleClose={handleClose}
        classes={{
          paperFullWidth: classes.dialogFullWidth,
        }}
        bkColor="rgba(0,0,0,0.8)"
      >
        <BlankLayout>
          <ESStickyFooter
            classes={{ root: classes.stickyFooter }}
            disabled
            noSpacing
            content={
              <Box className={classes.actionButtonContainer}>
                <Box className={classes.actionButton}>
                  <LoginRequired>
                    <ButtonPrimary
                      round
                      fullWidth
                      size="large"
                      disabled={selectedParticipants.filter((p) => p.checked).length === 0}
                      onClick={() => {
                        confirm({ ...LOBBY_DIALOGS.CONFIRM_MEMBER.confirm })
                          .then(() => {
                            const _selectedParticipants = _.filter(selectedParticipants, (p) => p.checked).map((a) => a.attributes.user_id)
                            confirmParticipants(hash_key, _selectedParticipants)
                          })
                          .catch(() => {
                            /* ... */
                          })
                      }}
                    >
                      {t('common:confirm_member.confirm')}
                    </ButtonPrimary>
                  </LoginRequired>
                </Box>
                <Box className={classes.actionButton}>
                  <LoginRequired>
                    <ButtonPrimaryOutlined
                      onClick={() => {
                        confirm({ ...LOBBY_DIALOGS.CONFIRM_MEMBER.shuffle })
                          .then(() => {
                            if (status === LOBBY_STATUS.RECRUITING) {
                              getRecommendedParticipants(hash_key)
                            }
                          })
                          .catch(() => {
                            /* ... */
                          })
                      }}
                    >
                      {t('common:confirm_member.shuffle')}
                    </ButtonPrimaryOutlined>
                  </LoginRequired>
                </Box>
              </Box>
            }
          >
            <Typography className={classes.subTitle}>{t('common:confirm_member.sub_title')}</Typography>
            <Box display="flex" className={classes.rowContainer} textAlign="center">
              <Typography className={classes.subTitle}>{t('common:confirm_member.total_participants')}</Typography>
              <Box display="flex" className={classes.countContainer}>
                <Typography className={classes.selectedNumber}>{selectedParticipants.filter((p) => p.checked).length}</Typography>
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
              <div id="scrollableDiv" className={`${classes.scroll} ${classes.list}`}>
                {_.isArray(selectedParticipants) && !_.isEmpty(selectedParticipants) && open ? (
                  <InfiniteScroll
                    dataLength={selectedParticipants.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    scrollableTarget="scrollableDiv"
                    scrollThreshold={0.99}
                    style={{ overflow: 'hidden' }}
                    loader={
                      participantsMeta.pending && (
                        <div className={classes.loaderCenter}>
                          <ESLoader />
                        </div>
                      )
                    }
                  >
                    {selectedParticipants.map((user: ConfirmParticipantItem, i) => (
                      <ParticipantRow key={i} data={user} toProfile={handleToProfile} handleChange={() => handleChange(i)} />
                    ))}
                  </InfiniteScroll>
                ) : null}
              </div>
            </DialogContent>
          </ESStickyFooter>
        </BlankLayout>
      </ESDialog>

      {recommendedParticipantsMeta.pending && <ESFullLoader open={recommendedParticipantsMeta.pending} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  stickyFooter: {
    backdropFilter: 'blur(3px)',
    background: 'rgba(0, 0, 0, 0.8)',
  },
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
    padding: '50px 0',
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  dialogFullWidth: {
    maxHeight: '100%',
    margin: 0,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    actionButtonContainer: {
      flexDirection: 'column',
      padding: '10px 0',
    },
    title: {
      fontSize: 20,
    },
    desc: {
      fontSize: 14,
    },
    dialogFullWidth: {
      width: '100%',
      margin: 0,
    },
  },
}))

export default CloseRecruitmentModal

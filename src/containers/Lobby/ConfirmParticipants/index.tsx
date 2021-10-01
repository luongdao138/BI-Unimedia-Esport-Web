import React, { useEffect, createRef } from 'react'
import { ConfirmParticipantItem } from '@services/lobby.service'
import { useState } from 'react'
import { Typography, Box, makeStyles, Theme, IconButton, Icon, Container } from '@material-ui/core'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import LoginRequired from '@containers/LoginRequired'
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
import ESModal from '@components/Modal'
import { useConfirm } from '@components/Confirm'
import { use100vh } from 'react-div-100vh'
import { useRect } from '@utils/hooks/useRect'
import useGetProfile from '@utils/hooks/useGetProfile'

interface CloseRecruitmentModalProps {
  lobby: LobbyDetail
  open: boolean
  handleClose: () => void
}

const contentRef = createRef<HTMLDivElement>()

const CloseRecruitmentModal: React.FC<CloseRecruitmentModalProps> = ({ lobby, open, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [selected, setSelected] = useState<number[]>([])
  const [filtered, setFiltered] = useState<ConfirmParticipantItem[]>([])
  const router = useRouter()
  const confirm = useConfirm()
  const windowHeight = use100vh()
  const { height } = useRect(contentRef)
  const { userProfile } = useGetProfile()
  const {
    allParticipants,
    allParticipantsMeta,
    getAllParticipants,
    resetAllParticipants,
    resetMetaAll,
    recommendedParticipants,
    recommendedParticipantsMeta,
    confirmParticipants,
    fetchAndRandomize,
    confirmParticipantsMeta,
  } = useLobbyActions()
  const { status, max_participants, hash_key, is_owner, is_freezed } = lobby.attributes

  const [isInitialPageLoad, setInitialPageLoad] = useState(false)
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false)
  const isConfirmable = (status === LOBBY_STATUS.RECRUITING || status === LOBBY_STATUS.ENTRY_CLOSED) && is_owner && !is_freezed

  useEffect(() => {
    if (open) {
      setInitialPageLoad(true)
      setConfirmBtnActive(false)
      getAllParticipants({ hash_key: hash_key })
    }

    return () => {
      if (open) {
        resetAllParticipants()
        resetMetaAll()
        setInitialPageLoad(false)
        setSelected([])
        setConfirmBtnActive(false)
      }
    }
  }, [open])

  useEffect(() => {
    if (confirmParticipantsMeta.loaded) handleClose()
  }, [confirmParticipantsMeta.loaded])

  useEffect(() => {
    if (!_.isArray(allParticipants)) return

    setFiltered(
      allParticipants.map((user: ConfirmParticipantItem) => {
        const item = selected.includes(Number(user.id))
        return { ...user, checked: item }
      })
    )

    if (allParticipants.length >= max_participants) {
      setConfirmBtnActive(selected.length === max_participants)
    } else {
      setConfirmBtnActive(selected.length === allParticipants.length)
    }
  }, [selected, allParticipants])

  useEffect(() => {
    if (isInitialPageLoad && !allParticipantsMeta.pending) {
      setInitialPageLoad(false)
    }
  }, [isInitialPageLoad, allParticipantsMeta.pending])

  useEffect(() => {
    if (!_.isEmpty(recommendedParticipants)) {
      const arr = recommendedParticipants.map((a) => {
        return Number(a.id)
      })
      setSelected(arr)
    }
  }, [recommendedParticipants])

  const handleChange = (index: number) => {
    if (selected.length < max_participants && !selected.includes(index)) {
      setSelected(_.concat(selected, index))
    } else if (
      (selected.length < max_participants && selected.includes(index)) ||
      (selected.length === max_participants && selected.includes(index))
    ) {
      setSelected(_.filter(selected, (a) => a !== index))
    }
  }

  const handleToProfile = (userCode: string) => router.push(`${ESRoutes.PROFILE}/${userCode}`)

  return (
    <Box>
      <ESModal open={open}>
        <Container className={classes.container} maxWidth={'md'}>
          <div id="scrollableDiv" style={{ height: windowHeight }} className={`${classes.scroll} ${classes.list}`}>
            <Box className={classes.header} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={handleClose}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:confirm_member.title')}</Typography>
              </Box>
            </Box>
            <Typography className={classes.subTitle}>{t('common:confirm_member.sub_title')}</Typography>
            <Box display="flex" className={classes.rowContainer} textAlign="center">
              <Typography className={classes.subTitle}>{t('common:confirm_member.total_participants')}</Typography>
              <Box display="flex" className={classes.countContainer}>
                <Typography className={classes.selectedNumber}>{selected.length}</Typography>
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
            {isInitialPageLoad && allParticipantsMeta.pending && (
              <div className={classes.loaderCenter}>
                <ESLoader />
              </div>
            )}
            {_.isArray(allParticipants) && !_.isEmpty(allParticipants) && open ? (
              <InfiniteScroll
                dataLength={allParticipants.length}
                next={null}
                hasMore={false}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.99}
                style={{ overflow: 'hidden' }}
                loader={
                  allParticipantsMeta.pending && (
                    <div className={classes.loaderCenter}>
                      <ESLoader />
                    </div>
                  )
                }
              >
                {filtered.map((user: ConfirmParticipantItem, i) => {
                  return (
                    <ParticipantRow
                      key={i}
                      data={user}
                      toProfile={handleToProfile}
                      handleChange={() => handleChange(Number(user.id))}
                      isMe={Number(userProfile.id) === _.get(user, 'attributes.user_id', '')}
                    />
                  )
                })}
                <Box style={{ height: 40 }} />
              </InfiniteScroll>
            ) : null}
            <Box style={{ height: height }} />
          </div>
          <div ref={contentRef} className={classes.footer}>
            <Box className={classes.actionButtonContainer}>
              <Box className={classes.actionButton}>
                <LoginRequired>
                  <ButtonPrimary
                    round
                    fullWidth
                    size="large"
                    disabled={!isConfirmBtnActive}
                    onClick={() => {
                      confirm({ ...LOBBY_DIALOGS.CONFIRM_MEMBER.confirm })
                        .then(() => {
                          if (isConfirmable) {
                            const selectedParticipants = allParticipants
                              .filter((p) => selected.includes(p.attributes.id))
                              .map((a) => a.attributes.user_id)
                            confirmParticipants(hash_key, selectedParticipants)
                          }
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
                    disabled={isInitialPageLoad && allParticipantsMeta.pending}
                    onClick={() => {
                      confirm({ ...LOBBY_DIALOGS.CONFIRM_MEMBER.shuffle })
                        .then(() => {
                          if (isConfirmable) {
                            fetchAndRandomize({ hash_key: hash_key })
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
          </div>
        </Container>
      </ESModal>
      {recommendedParticipantsMeta.pending && <ESFullLoader open={recommendedParticipantsMeta.pending} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    backdropFilter: 'blur(3px)',
    background: 'rgba(0, 0, 0, 0.8)',
  },
  loaderCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
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
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
    willChange: 'transform',
  },
  [theme.breakpoints.down('md')]: {
    container: {
      padding: 0,
    },
    header: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
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

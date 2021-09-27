import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Icon, Typography } from '@material-ui/core'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { ROLE } from '@constants/tournament.constants'
import InterestedList from '@containers/arena/Detail/Partials/SelectParticipantModal/InterestedList'
import { useTranslation } from 'react-i18next'
import { useRandomizeDialog } from '../Partials/RandomizeDialog'
import { useFreezeDialog } from '../Partials/FreezeDialog'
import ESLoader from '@components/FullScreenLoader'
import useModeratorActions from '@containers/arena/hooks/useModeratorActions'
import HeaderWithButton from '@components/HeaderWithButton'
import ButtonPrimary from '@components/ButtonPrimary'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import { use100vh } from 'react-div-100vh'
import { Colors } from '@theme/colors'
import { ParticipantsResponse } from '@services/arena.service'
import Avatar from '@components/Avatar'
import BRList from '../Partials/BRList'
import BRScoreInput from '@containers/arena/battle_royale/Partials/BRScoreInput'

const participantDefault: ParticipantsResponse = {
  id: undefined,
  attributes: { avatar_url: null, name: '', position: null },
}

const getDefaultParticipants = (length: number) => Array.from({ length: length }, (_, i) => i).map((_) => participantDefault)

const getParticipantIds = (participants: ReturnType<typeof getDefaultParticipants>) => _.compact(participants.map((p) => Number(p.id)))

const ArenaBattlesEdit: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, brMeta: participantsMeta, getBattleRoyaleParticipants, resetMeta } = useParticipants()
  const { freeze, randomize, setParticipants, randomizeMeta, freezeMeta, setParticipantsMeta } = useModeratorActions()

  const [showParticipants, setShowParticipants] = useState<{ pid: number | undefined; open: boolean }>({ pid: undefined, open: false })
  const [selecteds, setSelecteds] = useState<ParticipantsResponse[]>([])
  const [clickIndex, setClickIndex] = useState<number>(0)
  const data = tournament ? TournamentHelper.getDetailData(tournament) : undefined
  const confirmFreeze = useFreezeDialog(data?.isTeam)
  const confirmRandomize = useRandomizeDialog(data?.isTeam)
  const height = use100vh()

  const handleFreeze = () => {
    confirmFreeze().then(() => {
      freeze({ hash_key: tournament.attributes.hash_key, matches: getParticipantIds(selecteds) })
    })
  }

  const handleRandomize = () => {
    confirmRandomize().then(() => {
      randomize(tournament.attributes.hash_key)
    })
  }

  const closeParticipantsDialog = () => {
    setShowParticipants((prev) => ({
      ...prev,
      pid: undefined,
      open: false,
    }))
  }

  useEffect(() => () => resetMeta(), [])

  useEffect(() => {
    if (participantsMeta.loaded) {
      setSelecteds(
        _.slice(
          [...participants, ...getDefaultParticipants(tournament.attributes.max_participants)],
          0,
          tournament.attributes.max_participants
        )
      )
    }
  }, [participantsMeta])

  useEffect(() => {
    if (router.query.hash_key && detailMeta.loaded) {
      getBattleRoyaleParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key, detailMeta.loaded])

  useEffect(() => {
    if (randomizeMeta.loaded) {
      getBattleRoyaleParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }
  }, [randomizeMeta.loaded])

  const selectedHandler = (participant: ParticipantsResponse) => {
    const newSelecteds = selecteds.map((v, i) => {
      if (i === clickIndex) {
        return {
          id: participant.id,
          attributes: {
            avatar_url: participant.attributes.avatar_url,
            name: participant.attributes.name,
            position: null,
          },
        }
      }
      return v
    })
    setParticipants({ hash_key: tournament.attributes.hash_key, pids: getParticipantIds(newSelecteds) }, () => {
      setSelecteds(newSelecteds)
      closeParticipantsDialog()
    })
  }

  const removeHandler = () => {
    const newSelecteds = selecteds.map((v, i) => {
      if (i === clickIndex) {
        return participantDefault
      }
      return v
    })
    setParticipants({ hash_key: tournament.attributes.hash_key, pids: getParticipantIds(newSelecteds) }, () => {
      setSelecteds(newSelecteds)
      setShowParticipants((prev) => ({
        ...prev,
        pid: undefined,
      }))
    })
  }

  const [freezable, setFreezable] = useState(false)
  useEffect(() => {
    const selectedLength = getParticipantIds(selecteds).length
    setFreezable(selectedLength === data?.maxCapacity)
  }, [selecteds])

  return (
    <>
      {detailMeta.loaded && participantsMeta.loaded && data && (
        <div style={{ height: `calc(${height}px - 60px)`, overflowY: 'auto', paddingBottom: 60 }} className={classes.scroll}>
          <HeaderWithButton title={tournament.attributes.title} />
          <Box pt={3} pb={3} textAlign="center">
            <Typography>順位を入力してください</Typography>
          </Box>
          <BRList rule={tournament.attributes.rule} className={classes.listContainer}>
            {selecteds.map((v, i) => (
              <BRListItem
                key={i}
                avatar={<Avatar alt={v.attributes.name || ''} src={v.attributes.avatar_url || ''} size={26} />}
                text={v.attributes.user?.user_code ? v.attributes.name : v.attributes.team?.data.attributes.name}
                textSecondary={v.attributes.user?.user_code || ''}
                onClick={() => {
                  if (data?.memberSelectable) {
                    setShowParticipants({ open: true, pid: Number(v.id) })
                    setClickIndex(i)
                  }
                }}
                highlight={v.highlight}
                /* eslint-disable-next-line react/no-children-prop */
                children={<BRScoreInput type={tournament.attributes.rule} />}
              />
            ))}
          </BRList>
          {tournament.attributes.is_freezed ? null : (
            <Box className={classes.actionButtonContainer}>
              <Box className={classes.actionButton}>
                <ButtonPrimaryOutlined onClick={handleRandomize} leadingIcon={<Icon className="fas fa-random" fontSize="small" />}>
                  {t('common:arena.randomize_button')}
                </ButtonPrimaryOutlined>
              </Box>
              <Box className={classes.actionButton}>
                <ButtonPrimary type="submit" round fullWidth disabled={!freezable} onClick={handleFreeze}>
                  {t('common:arena.freeze_br_button')}
                </ButtonPrimary>
              </Box>
            </Box>
          )}
          <InterestedList
            pid={showParticipants.pid}
            tournament={tournament}
            open={showParticipants.open}
            handleClose={closeParticipantsDialog}
            onSelect={(participant) => selectedHandler(participant)}
            handleUnset={removeHandler}
          />
        </div>
      )}
      <ESLoader
        open={detailMeta.pending || participantsMeta.pending || randomizeMeta.pending || freezeMeta.pending || setParticipantsMeta.pending}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  scroll: {
    scrollbarColor: '#000 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000',
      borderRadius: 6,
    },
  },
  listContainer: {
    paddingBottom: 80,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(10),
  },
  root: {
    backgroundColor: '#212121',
    paddingTop: 60,
    background: 'url("/images/pattern.png") center 60px repeat-x #212121 fixed',
  },
  appbar: {
    top: 60,
    backgroundColor: '#000000',
    borderBottom: '1px solid #FFFFFF30',
    borderTop: '1px solid #FFFFFF30',
  },
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.common.black,
    borderTop: `1px solid ${Colors.white_opacity['15']}`,
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  toolbar: {
    paddingLeft: 0,
  },
  content: {
    paddingTop: 24,
  },
  backButton: {
    backgroundColor: '#4D4D4D',
    padding: 7,
    marginRight: 16,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  buttonHolder: {
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    listContainer: {
      paddingBottom: 120,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}))

export default ArenaBattlesEdit

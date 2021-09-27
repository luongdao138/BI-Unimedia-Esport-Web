import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Icon, Typography } from '@material-ui/core'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
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
import { ParticipantsResponse } from '@services/arena.service'
import Avatar from '@components/Avatar'
import BRList from '../Partials/BRList'
import BRScoreInput from '@containers/arena/battle_royale/Partials/BRScoreInput'
import StickyFooter from '../Partials/StickyFooter'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

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
  const { freeze, randomize, setParticipants, randomizeMeta, freezeMeta, setParticipantsMeta, resetFreezeMeta } = useModeratorActions()

  const [showParticipants, setShowParticipants] = useState<{ pid: number | undefined; open: boolean }>({ pid: undefined, open: false })
  const [selecteds, setSelecteds] = useState<ParticipantsResponse[]>([])
  const [clickIndex, setClickIndex] = useState<number>(0)
  const { isTeam, isModerator, maxCapacity, isMemberSelectable } = useArenaHelper(tournament)
  const confirmFreeze = useFreezeDialog(isTeam)
  const confirmRandomize = useRandomizeDialog(isTeam)

  const handleFreeze = () => {
    confirmFreeze().then(() => {
      freeze({ hash_key: tournament.attributes.hash_key, matches: getParticipantIds(selecteds) })
    })
  }

  useEffect(() => {
    if (freezeMeta.loaded) {
      resetFreezeMeta()
    }
  }, [freezeMeta.loaded])

  useEffect(() => {
    if (tournament && (tournament.attributes.is_freezed || !isModerator)) {
      const redirectTo = router.asPath.replace('/edit', '')
      router.push(redirectTo)
    }
  }, [tournament, isModerator])

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
    setFreezable(selectedLength === maxCapacity)
  }, [selecteds])

  return (
    <>
      {detailMeta.loaded && participantsMeta.loaded && tournament && (
        <StickyFooter
          hideFooter={tournament.attributes.is_freezed}
          primaryButton={
            <ButtonPrimary type="submit" round fullWidth disabled={!freezable} onClick={handleFreeze}>
              {t('common:arena.freeze_br_button')}
            </ButtonPrimary>
          }
          secondaryButton={
            <ButtonPrimaryOutlined onClick={handleRandomize} leadingIcon={<Icon className="fas fa-random" fontSize="small" />}>
              {t('common:arena.randomize_button')}
            </ButtonPrimaryOutlined>
          }
        >
          <HeaderWithButton title={tournament.attributes.title} />
          <Box pt={3} pb={3} textAlign="center">
            {tournament.attributes.is_freezed ? null : <Typography>順位を入力してください</Typography>}
          </Box>
          <BRList rule={tournament.attributes.rule} className={classes.listContainer}>
            {selecteds.map((v, i) => (
              <BRListItem
                key={i}
                avatar={<Avatar alt={v.attributes.name || ''} src={v.attributes.avatar_url || ''} size={26} />}
                text={v.attributes.user?.user_code ? v.attributes.name : v.attributes.team?.data.attributes.name}
                textSecondary={v.attributes.user?.user_code || ''}
                onClick={() => {
                  if (isMemberSelectable) {
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
          <InterestedList
            pid={showParticipants.pid}
            tournament={tournament}
            open={showParticipants.open}
            handleClose={closeParticipantsDialog}
            onSelect={(participant) => selectedHandler(participant)}
            handleUnset={removeHandler}
          />
        </StickyFooter>
      )}
      <ESLoader
        open={detailMeta.pending || participantsMeta.pending || randomizeMeta.pending || freezeMeta.pending || setParticipantsMeta.pending}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
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

import _ from 'lodash'
import { Box, Icon, Typography } from '@material-ui/core'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useBRParticipants from '@containers/arena/hooks/useBRParticipants'
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
import StickyFooter from '../Partials/StickyFooter'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

const participantDefault: ParticipantsResponse = {
  id: undefined,
  attributes: { avatar_url: null, name: '', position: null, attack_score: null },
}

const getDefaultParticipants = (length: number) => Array.from({ length: length }, (_, i) => i).map((_) => participantDefault)

const getParticipantIds = (participants: ReturnType<typeof getDefaultParticipants>) => _.compact(participants.map((p) => Number(p.id)))

const ArenaBattlesEdit: React.FC = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, meta: participantsMeta, getBattleRoyaleParticipants, resetMeta } = useBRParticipants()
  const { freeze, randomize, setParticipants, randomizeMeta, freezeMeta, setParticipantsMeta, resetFreezeMeta } = useModeratorActions()

  const [showParticipants, setShowParticipants] = useState<{ pid: number | undefined; open: boolean }>({ pid: undefined, open: false })
  const [selecteds, setSelecteds] = useState<ParticipantsResponse[]>([])
  const [clickIndex, setClickIndex] = useState<number>(0)
  const { isTeam, maxCapacity, isMemberSelectable, isModerator, toDetail } = useArenaHelper(tournament)
  const confirmFreeze = useFreezeDialog(isTeam)
  const confirmRandomize = useRandomizeDialog(isTeam)

  useEffect(() => {
    if (detailMeta.loaded && tournament && !isModerator) {
      toDetail()
    }
  }, [isModerator, detailMeta.loaded, tournament])

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
        return participant
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
    if (selectedLength === 1) {
      setFreezable(false)
    } else {
      setFreezable(!!participants.length && selectedLength === maxCapacity)
    }
  }, [selecteds, participants])

  return (
    <>
      {detailMeta.loaded && participantsMeta.loaded && tournament && isModerator && (
        <StickyFooter
          hideFooter={tournament.attributes.is_freezed}
          primaryButton={
            <ButtonPrimary type="submit" round fullWidth disabled={!freezable} onClick={handleFreeze}>
              {t('common:arena.freeze_br_button')}
            </ButtonPrimary>
          }
          secondaryButton={
            <ButtonPrimaryOutlined
              disabled={!(tournament.attributes.interested_count || tournament.attributes.participant_count)}
              onClick={handleRandomize}
              leadingIcon={<Icon className="fas fa-random" fontSize="small" />}
            >
              {t('common:arena.randomize_button')}
            </ButtonPrimaryOutlined>
          }
        >
          <HeaderWithButton title={tournament.attributes.title} />
          <Box pt={3} pb={3} textAlign="center">
            {tournament.attributes.is_freezed ? null : (
              <>
                <Typography>{t('common:tournament.confirm_participants')}</Typography>
                <Typography>{t('common:arena.select_two_or_more')}</Typography>
              </>
            )}
          </Box>
          <BRList marginX={3} mb={7}>
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

export default ArenaBattlesEdit

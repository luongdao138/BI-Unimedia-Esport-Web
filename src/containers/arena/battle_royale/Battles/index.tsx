import React, { useEffect, useState, useMemo } from 'react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import HeaderWithButton from '@components/HeaderWithButton'
import Avatar from '@components/Avatar'
import ESLoader from '@components/FullScreenLoader'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import { ROLE } from '@constants/tournament.constants'
import { useRouter } from 'next/router'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import { makeStyles } from '@material-ui/core/styles'
import useBattleRoyaleScore from '@containers/arena/hooks/useBattleRoyaleScore'
import useAddToast from '@utils/hooks/useAddToast'
import { ParticipantsResponse } from '@services/arena.service'
import BRScoreInput from '../Partials/BRScoreInput'
import BRList from '../Partials/BRList'
import StickyFooter from '../Partials/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import RuleHeader from './RuleHeader'

const ArenaBattles: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { isModerator, isParticipant } = useArenaHelper(tournament)
  const [hideFooter, setHideFooter] = useState(true)

  const { participants, brMeta: participantsMeta, getBattleRoyaleParticipants, resetMeta } = useParticipants()
  const {
    setBattleRoyaleScores,
    setBattleRoyaleScoresMeta,
    resetBattleRoyaleScoresMeta,
    setBattleRoyaleOwnScore,
    setBattleRoyaleOwnScoreMeta,
    resetBattleRoyaleOwnScoreMeta,
  } = useBattleRoyaleScore()
  const [selecteds, setSelecteds] = useState<ParticipantsResponse[]>([])

  const { addToast } = useAddToast()

  useEffect(() => {
    if (router.query.hash_key && detailMeta.loaded) {
      getBattleRoyaleParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key, detailMeta.loaded])

  useEffect(() => {
    setSelecteds(participants)
  }, [participants])

  const setScores = (value: number | null, id: number) => {
    const newSelecteds = selecteds.map((v) => {
      if (v.id == id) {
        return {
          ...v,
          attributes: {
            ...v.attributes,
            position: value,
          },
        }
      }
      return v
    })
    setSelecteds(newSelecteds)
  }

  const handleSubmitScore = () => {
    if (isModerator) {
      setBattleRoyaleScores({ hash_key: tournament.attributes.hash_key, participants: selecteds })
    } else {
      setBattleRoyaleOwnScore({ hash_key: tournament.attributes.hash_key, participants: selecteds })
    }
  }
  useEffect(() => {
    if (setBattleRoyaleScoresMeta.loaded || setBattleRoyaleOwnScoreMeta.loaded) {
      resetBattleRoyaleScoresMeta()
      resetBattleRoyaleOwnScoreMeta()
      addToast(t('common:arena.br_set_score_success_toast'))
    }
  }, [setBattleRoyaleScoresMeta.loaded, setBattleRoyaleOwnScoreMeta.loaded])

  useEffect(() => {
    if (isModerator && (tournament?.attributes.status === 'in_progress' || tournament?.attributes.status === 'completed')) {
      setHideFooter(false)
    } else if (isParticipant && tournament?.attributes.status === 'in_progress') {
      setHideFooter(false)
    }
  }, [isModerator, isParticipant, tournament])

  const isScoreChanged = useMemo(() => !checkIsScoreChanged(selecteds, participants), [selecteds, participants])

  return (
    <StickyFooter
      hideFooter={hideFooter}
      primaryButton={
        <ButtonPrimary type="submit" round fullWidth onClick={handleSubmitScore} disabled={!isScoreChanged}>
          {t('common:arena.br_set_score_btn')}
        </ButtonPrimary>
      }
    >
      {detailMeta.loaded && <HeaderWithButton title={tournament.attributes.title} />}

      <RuleHeader textAlign="center" pt={3} pb={3} rule={'time_attack'} />

      <BRList className={classes.listContainer} rule={tournament?.attributes.rule}>
        {selecteds.map((v) => (
          <BRListItem
            key={v.id}
            avatar={<Avatar alt={v.attributes.name || ''} src={v.attributes.avatar_url || ''} size={26} />}
            text={v.attributes.user?.user_code ? v.attributes.name : v.attributes.team?.data.attributes.name}
            textSecondary={v.attributes.user?.user_code || ''}
            highlight={v.highlight}
          >
            <BRScoreInput
              value={v.attributes.position || ''}
              onChange={({ target: { value } }) => setScores(value === '' ? null : Number(value), v.id)}
              type={'time_attack'}
              disabled={(v.attributes.is_fixed_score || !v.highlight) && !isModerator}
            />
          </BRListItem>
        ))}
      </BRList>
      <ESLoader open={detailMeta.pending || participantsMeta.pending} />
    </StickyFooter>
  )
}

const useStyles = makeStyles((theme) => ({
  listContainer: {
    paddingBottom: 80,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(10),
  },
  [theme.breakpoints.down('sm')]: {
    listContainer: {
      paddingBottom: 120,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
}))

export default ArenaBattles

const checkIsScoreChanged = (p1: ParticipantsResponse[], p2: ParticipantsResponse[]): boolean => {
  if (!p1.length || !p2.length) return false
  return _.isEqual(p1, p2)
}

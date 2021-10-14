import React, { useEffect, useState, useMemo } from 'react'
import _ from 'lodash'
import { Box, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import i18n from '@locales/i18n'
import { useTranslation } from 'react-i18next'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import HeaderWithButton from '@components/HeaderWithButton'
import Avatar from '@components/Avatar'
import ESLoader from '@components/FullScreenLoader'
import { useRouter } from 'next/router'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import { makeStyles } from '@material-ui/core/styles'
import useBattleRoyaleScore from '@containers/arena/hooks/useBattleRoyaleScore'
import useAddToast from '@utils/hooks/useAddToast'
import { ParticipantsResponse } from '@services/arena.service'
import BRScore from '../Partials/BRScore'
import BRList from '../Partials/BRList'
import StickyFooter from '../Partials/StickyFooter'
import ButtonPrimary from '@components/ButtonPrimary'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import RuleHeader from './RuleHeader'
import useBRParticipants from '@containers/arena/hooks/useBRParticipants'
import { ErrorType } from '../Partials/BRInput'

const ArenaBattles: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { isModerator, isParticipant, isTeamLeader, isTeam } = useArenaHelper(tournament)
  const [hideFooter, setHideFooter] = useState(true)
  const [errors, setErrors] = useState<Record<string, ErrorType>>({})

  const {
    setBattleRoyaleScores,
    setBattleRoyaleScoresMeta,
    resetBattleRoyaleScoresMeta,
    setBattleRoyaleOwnScore,
    setBattleRoyaleOwnScoreMeta,
    resetBattleRoyaleOwnScoreMeta,
  } = useBattleRoyaleScore()

  const {
    participants,
    getBattleRoyaleParticipantsSorted,
    resetMeta,
    resetParticipants,
    metaSorted: participantsMeta,
  } = useBRParticipants()
  const [selecteds, setSelecteds] = useState<ParticipantsResponse[]>([])

  const { addToast } = useAddToast()

  useEffect(() => {
    if (router.query.hash_key && detailMeta.loaded) {
      getBattleRoyaleParticipantsSorted(router.query.hash_key)
    }
    return () => {
      resetMeta()
      resetParticipants()
    }
  }, [router.query.hash_key, detailMeta.loaded])

  useEffect(() => {
    setSelecteds(participants)
  }, [participants])

  const setScores = (value: number | '', id: number) => {
    setSelecteds(
      selecteds.map((v) => {
        if (v.id == id) {
          return {
            ...v,
            attributes: {
              ...v.attributes,
              attack_score: _.isNumber(value) ? value : null,
            },
          }
        }
        return v
      })
    )
  }

  const handleSubmitScore = () => {
    if (isModerator) {
      setBattleRoyaleScores({ hash_key: tournament.attributes.hash_key, participants: selecteds })
    } else {
      setBattleRoyaleOwnScore({
        hash_key: tournament.attributes.hash_key,
        participants: selecteds.filter((p) => p.highlight),
      })
    }
  }
  useEffect(() => {
    if (setBattleRoyaleScoresMeta.loaded || setBattleRoyaleOwnScoreMeta.loaded) {
      resetBattleRoyaleScoresMeta()
      resetBattleRoyaleOwnScoreMeta()
      addToast(t('common:arena.br_set_score_success_toast'))
    }
  }, [setBattleRoyaleScoresMeta.loaded, setBattleRoyaleOwnScoreMeta.loaded])

  const isFixedMyScore = useMemo(() => getIsFixedMyScore(selecteds), [selecteds])

  useEffect(() => {
    if (tournament?.attributes.status === 'in_progress' || tournament?.attributes.status === 'completed') {
      if (isModerator) {
        setHideFooter(false)
      } else if (isParticipant && isTeamLeader && !isFixedMyScore) {
        setHideFooter(false)
      }
    }
  }, [isModerator, isParticipant, tournament, isFixedMyScore])

  const isScoreChanged = useMemo(() => !checkIsScoreChanged(selecteds, participants), [selecteds, participants])

  const handleError = (value: ErrorType, idx: number) => {
    if (value) {
      setErrors({ ...errors, [idx]: value })
    } else {
      setErrors(_.omit(errors, [String(idx)]))
    }
  }

  const errorObject = mergeErrors(errors)
  const hasError = !_.isEmpty(errorObject)

  return (
    <StickyFooter
      hideFooter={hideFooter}
      primaryButton={
        <ButtonPrimary type="submit" round fullWidth onClick={handleSubmitScore} disabled={!isScoreChanged || hasError}>
          {t('common:arena.br_set_score_btn')}
        </ButtonPrimary>
      }
    >
      {detailMeta.loaded && <HeaderWithButton title={tournament.attributes.title} />}

      <RuleHeader textAlign="center" pt={3} rule={tournament?.attributes.rule} showCaution={isParticipant && isTeamLeader}>
        <Box textAlign="center" pb={3}>
          {errorObject.time_attack_format_invalid ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.time_attack_errors.format_invalid')}
            </Typography>
          ) : null}
          {errorObject.time_attack_max_exceeds ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.time_attack_errors.time_attack_max_exceeds')}
            </Typography>
          ) : null}
          {errorObject.score_attack_format_invalid ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.score_attack_errors.format_invalid')}
            </Typography>
          ) : null}
          {errorObject.score_attack_max_exceeds ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.score_attack_errors.score_attack_max_exceeds')}
            </Typography>
          ) : null}
          {errorObject.only_digit ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.battle_royale_error')}
            </Typography>
          ) : null}
          {errorObject.placement_min_max_range_invalid ? (
            <Typography style={{ color: Colors.secondary, paddingTop: 4 }}>
              {i18n.t('common:arena.rules_title.battle_royale_errors.min_max_range_invalid', { min: 1, max: participants.length })}
            </Typography>
          ) : null}
        </Box>
      </RuleHeader>

      <BRList className={classes.listContainer} rule={tournament?.attributes.rule}>
        {selecteds.map((v) => (
          <BRListItem
            key={v.id}
            avatar={
              <Avatar
                alt={isTeam ? v.attributes.team.data.attributes.name : v.attributes.name || ''}
                src={isTeam ? v.attributes.team.data.attributes.team_avatar : v.attributes.avatar_url || ''}
                size={26}
              />
            }
            text={v.attributes.user?.user_code ? v.attributes.name : v.attributes.team?.data.attributes.name}
            textSecondary={v.attributes.user?.user_code || ''}
            highlight={v.highlight}
          >
            <BRScore
              value={v.attributes.attack_score || ''}
              participantCount={participants.length}
              onChange={({ target: { value } }) => setScores(value === '' ? '' : Number(value), v.id)}
              onAttackError={(val) => handleError(val, v.id)}
              type={tournament?.attributes.rule}
              disabled={(v.attributes.is_fixed_score || !v.highlight) && !isModerator}
              participants={participants}
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
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    listContainer: {
      paddingBottom: 120,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  [theme.breakpoints.down('xs')]: {
    listContainer: {
      paddingBottom: 120,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}))

export default ArenaBattles

const checkIsScoreChanged = (p1: ParticipantsResponse[], p2: ParticipantsResponse[]): boolean => {
  if (!p1.length || !p2.length) return false
  return _.isEqual(p1, p2)
}

const mergeErrors = (errors: Record<string, ErrorType>): ErrorType => {
  const errorArray = Object.values(errors)
  if (errorArray.length) return errorArray.reduce((prev, curr) => ({ ...prev, ...curr }))
  return {}
}

const getIsFixedMyScore = (participants: ParticipantsResponse[]): boolean => {
  const myTeam = participants.filter((p) => p.highlight)
  if (myTeam.length) return myTeam[0].attributes.is_fixed_score
  return true
}

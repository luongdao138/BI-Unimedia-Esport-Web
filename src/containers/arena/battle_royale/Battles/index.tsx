import React, { useEffect, useState } from 'react'
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
import { Typography, Box } from '@material-ui/core'

const ArenaBattles: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()

  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, brMeta: participantsMeta, getBattleRoyaleParticipants, resetMeta } = useParticipants()
  const { setBattleRoyaleScores, setBattleRoyaleScoresMeta, resetBattleRoyaleScoresMeta } = useBattleRoyaleScore()
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

  const setScores = (value: number, id: number) => {
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
  useEffect(() => {
    if (setBattleRoyaleScoresMeta.loaded) {
      resetBattleRoyaleScoresMeta()
      addToast('結果を反映しました')
    }
  }, [setBattleRoyaleScoresMeta.loaded])

  const handleSubmitScore = () => setBattleRoyaleScores({ hash_key: tournament.attributes.hash_key, participants: selecteds })

  return (
    <>
      {detailMeta.loaded && <HeaderWithButton title={tournament.attributes.title} />}
      <Box pt={3} pb={3} textAlign="center">
        <Typography>スコアを入力してください</Typography>
      </Box>
      <BRList className={classes.listContainer}>
        {selecteds.map((v, i) => (
          <BRListItem
            key={i}
            avatar={<Avatar alt={v.attributes.name || ''} src={v.attributes.avatar_url || ''} size={26} />}
            text={v.attributes.user?.user_code ? v.attributes.name : v.attributes.team?.data.attributes.name}
            textSecondary={v.attributes.user?.user_code || ''}
            highlight={v.highlight}
          >
            <BRScoreInput
              value={v.attributes.position || ''}
              onChange={({ target: { value } }) => setScores(Number(value), v.id)}
              type={tournament.attributes.rule}
            />
          </BRListItem>
        ))}
      </BRList>
      <button onClick={handleSubmitScore}>Submit Score</button>
      <ESLoader open={detailMeta.pending || participantsMeta.pending} />
    </>
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

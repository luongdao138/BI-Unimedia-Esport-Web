import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import HeaderWithButton from '@components/HeaderWithButton'
import Avatar from '@components/Avatar'
import ESLoader from '@components/FullScreenLoader'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import { ROLE } from '@constants/tournament.constants'
import { useRouter } from 'next/router'
import BRListItem from '@containers/arena/battle_royale/Partials/BRListItem'
import { makeStyles } from '@material-ui/core/styles'

const ArenaBattles: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()

  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, brMeta: participantsMeta, getBattleRoyaleParticipants, resetMeta } = useParticipants()

  useEffect(() => {
    if (router.query.hash_key && detailMeta.loaded) {
      getBattleRoyaleParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key, detailMeta.loaded])

  return (
    <>
      {detailMeta.loaded && <HeaderWithButton title={tournament.attributes.title} />}
      <Container maxWidth="lg" className={classes.listContainer}>
        {participants.map((v, i) => (
          <BRListItem
            key={i}
            avatar={<Avatar alt={v.attributes.name || ''} src={v.attributes.avatar_url || ''} size={26} />}
            text={v.attributes.name}
            textSecondary={v.attributes.user?.user_code || ''}
          ></BRListItem>
        ))}
      </Container>
      <ESLoader open={detailMeta.pending || participantsMeta.pending} />
    </>
  )
}

const useStyles = makeStyles(() => ({
  listContainer: {
    paddingBottom: 80,
  },
}))

export default ArenaBattles

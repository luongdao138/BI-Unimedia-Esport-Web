import { useState } from 'react'
import useTournamentMatches from './useTournamentMatches'
import Bracket from '@components/Bracket'
import SelectParticipantModal from '@containers/TournamentDetail/Partials/SelectParticipantModal'
import useTournamentDetail from '../useTournamentDetail'
import ESLoader from '@components/FullScreenLoader'

const Matches: React.FC = () => {
  const { matches, setParticipant, fetchMatches } = useTournamentMatches()
  const { tournament, meta } = useTournamentDetail()
  const [selectedMatch, setSelectedMatch] = useState()

  const onMatchClick = (match) => {
    if (match && match.round_no == 0) setSelectedMatch(match)
  }

  return (
    <div>
      {meta.pending && '...loading'}
      {meta.loaded && tournament && (
        <Bracket.Container activeRound={0}>
          {matches.map((round, rid) => (
            <Bracket.Round key={rid} roundNo={rid}>
              {round.map((match, mid) => (
                <Bracket.Match
                  onClick={() => onMatchClick(match)}
                  key={mid}
                  headerText={`${rid + 1}-${mid + 1}`}
                  editable
                  winner={match.winner}
                  participant1={
                    match.home_user ? { avatar: match.home_avatar, label: match.home_user.name, score: match.score_home } : null
                  }
                  participant2={
                    match.guest_user ? { avatar: match.guest_avatar, label: match.guest_user.name, score: match.score_guest } : null
                  }
                />
              ))}
            </Bracket.Round>
          ))}
        </Bracket.Container>
      )}
      <SelectParticipantModal
        tournament={tournament}
        selectedMatch={selectedMatch}
        handleSetParticipant={(params) => setParticipant({ ...params, hash_key: tournament.attributes.hash_key })}
        handleClose={(refresh) => {
          if (refresh) fetchMatches()
          setSelectedMatch(undefined)
        }}
      />
      {meta.pending && <ESLoader open={meta.pending} />}
    </div>
  )
}

export default Matches

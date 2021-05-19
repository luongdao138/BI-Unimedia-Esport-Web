import useTournamentMatches from './useTournamentMatches'
import Bracket from '@components/Bracket'

const Matches: React.FC = () => {
  const { matches } = useTournamentMatches()
  return (
    <Bracket.Container activeRound={8}>
      {matches.map((round, rid) => (
        <Bracket.Round key={rid} roundNo={rid}>
          {round.map((match, mid) => (
            <Bracket.Match
              key={mid}
              headerText={`${rid + 1}-${mid + 1}`}
              editable
              winner={match.winner}
              participant1={match.guest_user ? { avatar: match.home_avatar, label: match.guest_user.name, score: match.score_home } : null}
              participant2={match.home_user ? { avatar: match.guest_avatar, label: match.home_user.name, score: match.score_guest } : null}
            />
          ))}
        </Bracket.Round>
      ))}
    </Bracket.Container>
  )
}

export default Matches

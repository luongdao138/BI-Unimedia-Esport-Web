import useTournamentMatches from './useTournamentMatches'
import { Box } from '@material-ui/core'
import Bracket from '@components/Bracket'

const Matches: React.FC = () => {
  const { matches } = useTournamentMatches()
  return (
    <Bracket.Container>
      {matches.map((round, rid) => (
        <Bracket.Round key={rid}>
          {round.map((_match, mid) => (
            <Bracket.Match key={mid} headerText={`${rid + 1}-${mid + 1}`}>
              <Box pl={1.5} py={1} borderBottom="1px solid #FFFFFF30">
                Team 1
              </Box>
              <Box pl={1.5} py={1}>
                Team 2
              </Box>
            </Bracket.Match>
          ))}
        </Bracket.Round>
      ))}
    </Bracket.Container>
  )
}

export default Matches

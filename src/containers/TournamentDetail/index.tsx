import useTournamentDetail from './useTournamentDetail'

const TournamentDetail: React.FC = () => {
  const { tournament, meta } = useTournamentDetail()
  return <div>{meta.pending ? '...loading' : <pre>{JSON.stringify(tournament, null, 2)}</pre>}</div>
}

export default TournamentDetail

import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'

const TournamentDetail: React.FC = () => {
  const { tournament, meta } = useTournamentDetail()
  return (
    <div>
      {meta.pending && !tournament ? (
        '...loading'
      ) : (
        <>
          <TournamentDetailHeader status={tournament?.attributes?.status || 'ready'}>
            <pre>{JSON.stringify(tournament, null, 2)}</pre>
          </TournamentDetailHeader>
          {/* <pre>{JSON.stringify(tournament, null, 2)}</pre> */}
        </>
      )}
    </div>
  )
}

export default TournamentDetail

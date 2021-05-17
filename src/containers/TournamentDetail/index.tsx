import useTournamentDetail from './useTournamentDetail'

import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { useRouter } from 'next/router'

const TournamentDetail: React.FC = () => {
  const router = useRouter()
  const { tournament, meta } = useTournamentDetail()

  const handleBack = () => router.back()
  return (
    <div>
      {meta.pending && !tournament ? (
        '...loading'
      ) : (
        <>
          <TournamentDetailHeader
            status={tournament?.attributes?.status || 'ready'}
            cover={tournament?.attributes?.cover_image}
            onHandleBack={handleBack}
          >
            <pre>{JSON.stringify(tournament, null, 2)}</pre>
          </TournamentDetailHeader>
          {/* <pre>{JSON.stringify(tournament, null, 2)}</pre> */}
        </>
      )}
    </div>
  )
}

export default TournamentDetail

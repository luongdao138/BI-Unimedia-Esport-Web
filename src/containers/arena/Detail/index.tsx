import { ReactNode } from 'react'
import useTournamentDetail from '../hooks/useTournamentDetail'
import TournamentDetailHeader from '@components/TournamentDetailHeader'
import { TournamentStatus } from '@services/arena.service'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import RecruitmentClosed from './Partials/RecruitmentClosed'
import Recruiting from './Partials/Recruiting'
import InProgress from './Partials/InProgress'
import Completed from './Partials/Completed'
import ESLoader from '@components/FullScreenLoader'
import useArenaHelper from '../hooks/useArenaHelper'
import BlankLayout from '@layouts/BlankLayout'
import ESModal from '@components/Modal'
import { UpsertForm } from '..'
import { useRouter } from 'next/router'
// import { Box, Typography } from '@material-ui/core'

const TournamentDetail: React.FC = () => {
  const { tournament, meta, entryMeta, userProfile, handleBack } = useTournamentDetail()
  const { toEdit } = useArenaHelper(tournament)
  const router = useRouter()

  const actionComponent: Record<TournamentStatus, ReactNode> = {
    in_progress: <InProgress tournament={tournament} userProfile={userProfile} />, //headset
    cancelled: <></>,
    completed: <Completed tournament={tournament} userProfile={userProfile} />, //trophy
    ready: <></>,
    ready_to_start: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
    recruiting: <Recruiting tournament={tournament} userProfile={userProfile} />,
    recruitment_closed: <RecruitmentClosed tournament={tournament} userProfile={userProfile} />, //hourglass
  }

  return (
    <div>
      <ESLoader open={meta.pending} />
      {meta.loaded && entryMeta.loaded && tournament && (
        <>
          <TournamentDetailHeader
            status={tournament?.attributes?.status || 'ready'}
            cover={tournament?.attributes?.cover_image}
            onHandleBack={handleBack}
          >
            {actionComponent[tournament.attributes.status]}
          </TournamentDetailHeader>
          <DetailInfo toEdit={toEdit} detail={tournament} extended />
        </>
      )}
      {/* {meta.error && !tournament ? (
        <Box mt={4} style={{ textAlign: 'center' }}>
          <Typography style={{ color: '#ffffff9c' }}>このページは無効化されました。</Typography>
        </Box>
      ) : null} */}
      <ESModal open={router.asPath.endsWith('/edit')}>
        <BlankLayout>
          <UpsertForm />
        </BlankLayout>
      </ESModal>
    </div>
  )
}

export default TournamentDetail

/* eslint-disable no-console */
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'

import { RankingsParams } from '@services/liveStreamDetail.service'
import liveStreamDetail from '@store/liveStreamDetail'

const { selectors, actions } = liveStreamDetail

const getRankingListMeta = createMetaSelector(actions.getRankingList)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRankingVideo = () => {
  const dispatch = useAppDispatch()

  const fetchRakingVideo = (params: RankingsParams) => dispatch(actions.getRankingList(params))

  const rankingsGiver = useAppSelector(selectors.getRankingGiver)
  const rankingsReceive = useAppSelector(selectors.getRankingReceive)

  const rankingListMeta = useAppSelector(getRankingListMeta)

  return {
    fetchRakingVideo,
    rankingsGiver,
    rankingsReceive,
    rankingListMeta,
  }
}

export default useRankingVideo

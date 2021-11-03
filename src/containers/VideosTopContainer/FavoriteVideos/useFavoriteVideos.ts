import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideo = createMetaSelector(actions.getListVideoFavorite)
const useFavoriteVideos = (): {
  listFavoriteVideo: any
  meta: Meta
  listLiveVideo: (limit: number) => void
} => {
  const dispatch = useAppDispatch()
  const listFavoriteVideo = useAppSelector(selectors.getAllVideoFavorite)
  const meta = useAppSelector(_getListVideo)
  const getListVideoFavorite = (limit) => dispatch(actions.getListVideoFavorite({ limit }))
  const listLiveVideo = (limit) => {
    getListVideoFavorite(limit)
  }
  return {
    listFavoriteVideo,
    meta,
    listLiveVideo,
  }
}

export default useFavoriteVideos

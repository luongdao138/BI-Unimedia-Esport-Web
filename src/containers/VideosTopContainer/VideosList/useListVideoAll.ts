import { BannerItem, CategoryPopularData, ListVideoTopParams, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideoAll = createMetaSelector(actions.getListVideoAll)
const useListVideoAll = (): {
  meta: Meta
  getListVideoTop: (params: ListVideoTopParams) => void
  videoTop: any
  listLiveVideo: () => void
  videoPopular: () => void
  videoCategoryPopular: CategoryPopularData[]
  listBanner: BannerItem[]
  bannerTop: () => void
} => {
  const dispatch = useAppDispatch()
  const videoTop = useAppSelector(selectors.getAllVideo)
  const videoCategoryPopular = useAppSelector(selectors.getVideoPopular)
  const listBanner = useAppSelector(selectors.getBannerTop)
  // const page = useAppSelector(selectors.getListVideoTop)
  const meta = useAppSelector(_getListVideoAll)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getListVideoAll(params))
  const getListVideoPopular = () => dispatch(actions.getCategoryPopularVideo())
  const bannerTop = () => dispatch(actions.getBannerTop())

  //TODO: add limit (if you need)
  const listLiveVideo = () => {
    getListVideoTop({ type: TYPE_VIDEO_TOP.ALL })
  }

  const videoPopular = () => {
    getListVideoPopular()
  }

  return {
    videoTop,
    meta,
    getListVideoTop,
    listLiveVideo,
    videoPopular,
    videoCategoryPopular,
    listBanner,
    bannerTop,
  }
}

export default useListVideoAll

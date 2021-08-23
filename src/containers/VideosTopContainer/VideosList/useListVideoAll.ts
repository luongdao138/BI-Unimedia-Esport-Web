import { ListVideoTopParams, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import { createMetaSelector } from '@store/metadata/selectors'
import videoTop from '@store/videoTop'

const { selectors, actions } = videoTop
const _getListVideoAll = createMetaSelector(actions.getListVideoAll)
const useListVideoAll = (): {
  meta: Meta
  getListVideoTop: (params: ListVideoTopParams) => void
  videoTop: TypeVideo[]
  listLiveVideo: () => void
} => {
  const dispatch = useAppDispatch()
  const videoTop = useAppSelector(selectors.getVideoLive)
  // const page = useAppSelector(selectors.getListVideoTop)
  const meta = useAppSelector(_getListVideoAll)
  const getListVideoTop = (params: ListVideoTopParams) => dispatch(actions.getListVideoAll(params))
  const listLiveVideo = () => {
    getListVideoTop({ type: TYPE_VIDEO_TOP.ALL })
  }
  return {
    videoTop,
    meta,
    getListVideoTop,
    listLiveVideo,
  }
}

export default useListVideoAll

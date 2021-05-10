import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { GetPrefecturesParams } from '@services/common.service'
import commonStore from '@store/common'

const { selectors, actions } = commonStore
const _getPrefecturesMeta = createMetaSelector(actions.getPrefectures)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGetPrefectures = () => {
  const dispatch = useAppDispatch()
  const prefectures = useAppSelector(selectors.getPrefectures)
  const getPrefecturesMeta = useAppSelector(_getPrefecturesMeta)
  const getPrefectures = (param: GetPrefecturesParams) => dispatch(actions.getPrefectures(param))
  const resetGetPrefecturesMeta = () => dispatch(clearMetaData(actions.getPrefectures.typePrefix))
  return { prefectures, getPrefectures, resetGetPrefecturesMeta, getPrefecturesMeta }
}

export default useGetPrefectures

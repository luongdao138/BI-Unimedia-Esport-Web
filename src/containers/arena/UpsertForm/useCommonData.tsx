import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import commonStore from '@store/common'
import authStore from '@store/auth'
import useGetPrefectures from '@containers/UserSettings/useGetPrefectures'

const { actions, selectors } = commonStore
const {
  selectors: { getAuth },
} = authStore
const getHardwaresMeta = createMetaSelector(actions.getHardwares)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCommonData = () => {
  const { getPrefectures, resetGetPrefecturesMeta, getPrefecturesMeta } = useGetPrefectures()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getHardwaresMeta)
  const user = useAppSelector(getAuth)
  const hardwares = useAppSelector(selectors.getHardwares)
  const prefectures = useAppSelector(selectors.getPrefectures)
  const resetMeta = () => dispatch(clearMetaData(actions.getHardwares.typePrefix))

  useEffect(() => {
    dispatch(actions.getHardwares())
    getPrefectures()
  }, [])

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
    }
  }, [meta.loaded])

  useEffect(() => {
    if (getPrefecturesMeta.loaded) {
      resetGetPrefecturesMeta()
    }
  }, [getPrefecturesMeta.loaded])

  return { hardwares, prefectures, user }
}

export default useCommonData

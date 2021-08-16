import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import commonStore from '@store/common'
import useGetPrefectures from '@containers/UserSettings/useGetPrefectures'

const { actions, selectors } = commonStore

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCommonData = () => {
  const { getPrefectures, resetGetPrefecturesMeta, getPrefecturesMeta } = useGetPrefectures()
  const dispatch = useAppDispatch()
  const prefectures = useAppSelector(selectors.getPrefectures)

  useEffect(() => {
    dispatch(actions.getHardwares())
    getPrefectures(false)
  }, [])

  useEffect(() => {
    if (getPrefecturesMeta.loaded) {
      resetGetPrefecturesMeta()
    }
  }, [getPrefecturesMeta.loaded])

  return { prefectures }
}

export default useCommonData

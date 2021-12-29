import { useEffect } from 'react'
import { useAppDispatch } from '@store/hooks'
import { StoreType } from '@store/store'
import ngWords from '@store/ngWords'

const { actions } = ngWords

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useVideoNgWords = (store: StoreType) => {
  const { ngWords } = store.getState()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (ngWords.videoWords === undefined) {
      dispatch(actions.getVideoNgWords())
    }
  }, [])
}

export default useVideoNgWords

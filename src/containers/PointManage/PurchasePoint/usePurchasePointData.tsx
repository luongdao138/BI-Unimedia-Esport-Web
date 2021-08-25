import { useAppDispatch, useAppSelector } from '@store/hooks'
import purchasePoint from '@store/purchasePoint'
import { createMetaSelector } from '@store/metadata/selectors'

const { actions } = purchasePoint
const getUpdateHomeSettingsMeta = createMetaSelector(actions.getSavedCards)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserData = () => {
  const dispatch = useAppDispatch()

  const metaHomeSettings = useAppSelector(getUpdateHomeSettingsMeta)
  // const getPurchasePoint = useAppSelector(selectors.getPurchasePoint)

  const getSavedCards = () => dispatch(actions.getSavedCards())
  // const getUserRecommendations = () => dispatch(actions.getRecommendations())

  return { metaHomeSettings, getSavedCards }
}

export default useUserData

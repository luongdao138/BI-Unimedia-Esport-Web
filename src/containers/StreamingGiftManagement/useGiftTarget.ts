import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import giftManage from '@store/giftManage'

const { selectors, actions } = giftManage
const _addGiftTargetData = createMetaSelector(actions.addTargetPerson)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGiftManage = () => {
  const dispatch = useAppDispatch()
  const giftTargetData = useAppSelector(selectors.getListGiftTargetPerson)

  const meta_gift_target = useAppSelector(_addGiftTargetData)

  const addTargetPerson = (params: any) => dispatch(actions.addTargetPerson(params))

  const resetTargetPersonData = () => dispatch(actions.resetGiftTargetPerson())

  return {
    giftTargetData,
    meta_gift_target,
    addTargetPerson,
    resetTargetPersonData,
  }
}

export default useGiftManage

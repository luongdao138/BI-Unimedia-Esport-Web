import { useAppDispatch } from '@store/hooks'
import * as actions from '@store/common/actions'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useAddToast = () => {
  const dispatch = useAppDispatch()
  return { addToast: (param: string) => dispatch(actions.addToast(param)) }
}

export default useAddToast

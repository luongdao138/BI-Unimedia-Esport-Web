import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'

const useToast = (): { addToast: (v: string) => void } => {
  const dispatch = useAppDispatch()
  const addToast = (value: string) => dispatch(commonActions.addToast(value))
  return { addToast }
}

export default useToast

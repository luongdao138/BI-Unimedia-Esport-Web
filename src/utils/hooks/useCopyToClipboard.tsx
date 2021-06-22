import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'

interface returnType {
  copy: (text: string) => void
}

const useCopyToClipboard = (showToast = true, toastMsg = null): returnType => {
  const dispatch = useAppDispatch()
  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        if (showToast === true && toastMsg) dispatch(commonActions.addToast(toastMsg))
      },
      () => null // do something on fail
    )
  }

  return { copy }
}

export default useCopyToClipboard

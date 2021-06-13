import Toast from '@components/Toast'
import * as selectors from '@store/common/selectors'
import * as actions from '@store/common/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'

const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectors.getToasts)
  const removeToast = (uuid: string) => dispatch(actions.removeToast(uuid))
  return (
    <>
      {toasts.map((t, idx) => (
        <Toast key={idx} open={true} message={t.message} onClose={() => removeToast(t.uuid)} />
      ))}
    </>
  )
}

export default ToastContainer

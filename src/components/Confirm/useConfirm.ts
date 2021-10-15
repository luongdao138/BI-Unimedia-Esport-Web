import { useContext } from 'react'
import ConfirmContext from './ConfirmContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useConfirm = () => {
  const confirm = useContext(ConfirmContext)
  if (!confirm) throw new Error('within ConfirmProvider')
  return confirm
}

export default useConfirm

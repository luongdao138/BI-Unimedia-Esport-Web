import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as actions from '@store/arena/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'

const getMeta = createMetaSelector(actions.cancelTournament)

const useCancelDialog = (): {
  meta: Meta
  cancelTournament: (hashKey: string) => void
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)

  const cancelTournament = (hashKey: string) => {
    dispatch(actions.cancelTournament(hashKey))
  }

  return {
    meta,
    cancelTournament,
  }
}

export default useCancelDialog

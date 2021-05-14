import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { GameEditParams } from '@services/user.service'

const { actions } = userProfile
const gameEditMeta = createMetaSelector(actions.gameEdit)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGameEdit = () => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(gameEditMeta)
  const gameEdit = (param: GameEditParams) => dispatch(actions.gameEdit(param))
  const resetMeta = () => dispatch(clearMetaData(actions.gameEdit.typePrefix))
  return { gameEdit, resetMeta, meta }
}

export default useGameEdit

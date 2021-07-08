import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { ProfileEditParams } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'

const { actions } = userProfile
// const { selectors, actions } = userProfile
// const getNicknamesMeta = createMetaSelector(actions.getNicknames)
const profileEditMeta = createMetaSelector(actions.profileEdit)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProfileEdit = (): {
  getNicknames: () => void
  profileEdit: (param: ProfileEditParams) => void
  resetMeta: () => void
  meta: Meta
} => {
  const dispatch = useAppDispatch()
  // const nicknames2 = useAppSelector(selectors.getNicknames2)
  // const page = useAppSelector(selectors.getTourHistoriesMeta)
  const meta = useAppSelector(profileEditMeta)
  const getNicknames = () => dispatch(actions.getNicknames())
  const profileEdit = (param: ProfileEditParams) => dispatch(actions.profileEdit(param))
  const resetMeta = () => dispatch(clearMetaData(actions.profileEdit.typePrefix))
  return { getNicknames, profileEdit, resetMeta, meta }
}

export default useProfileEdit

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import userProfile from '@store/userProfile'
import { ProfileEditParams } from '@services/user.service'
import { Meta } from '@store/metadata/actions/types'

const { actions } = userProfile
const profileEditMeta = createMetaSelector(actions.profileEdit)

const useProfileEdit = (): {
  getNicknames: () => void
  profileEdit: (param: ProfileEditParams) => void
  resetMeta: () => void
  meta: Meta
} => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(profileEditMeta)
  const getNicknames = () => dispatch(actions.getNicknames())
  const profileEdit = (param: ProfileEditParams) => dispatch(actions.profileEdit(param))
  const resetMeta = () => dispatch(clearMetaData(actions.profileEdit.typePrefix))
  return { getNicknames, profileEdit, resetMeta, meta }
}

export default useProfileEdit

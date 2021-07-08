import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import settingsStore from '@store/settings'
import { InquiryParams } from '@services/settings.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'
import authStore from '@store/auth'

const { actions } = settingsStore
const auth = authStore
const getMeta = createMetaSelector(actions.createInquiry)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useInquiry = (): { meta: Meta; createInquiry: (params: InquiryParams) => void; currentUserEmail: string } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const createInquiry = (param: InquiryParams) => dispatch(actions.createInquiry(param))
  const currentUserEmail = useAppSelector(auth.selectors.getEmail)

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.createInquiry.typePrefix))
    }
  }, [])
  return {
    meta,
    createInquiry,
    currentUserEmail,
  }
}

export default useInquiry

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import settingsStore from '@store/settings'
import { InquiryParams } from '@services/settings.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions } = settingsStore
const getMeta = createMetaSelector(actions.createInquiry)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useInquiry = (): { meta: Meta; createInquiry: (params: InquiryParams) => void } => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(getMeta)
  const createInquiry = (param: InquiryParams) => dispatch(actions.createInquiry(param))

  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.createInquiry.typePrefix))
    }
  }, [])
  return {
    meta,
    createInquiry,
  }
}

export default useInquiry

import { useEffect, useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

// TODO change when data is ready
export type EditableTypes = {
  title: boolean
  overview: boolean
  cover_image: boolean
}

const useTopicCreate = (): {
  isEdit: boolean
  editables: EditableTypes
  submit(): void
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    cover_image: true,
    title: true,
    overview: true,
  })
  const isEditable = true

  const submit = async () => {
    router.push(`${ESRoutes.COMMUNITY}/1/topic/1`)

    dispatch(commonActions.addToast(t('common:topic_create.create_success')))
  }

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      setIsEdit(true)
    }
  }, [router])

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      if (!isEditable) {
        router.push(ESRoutes.LOBBY_DETAIL.replace(/:id/gi, String(router.query.hash_key)))
        return
      }

      let _editables = { ...editables }
      // always not editabl
      _editables = _.mapValues(_editables, () => false)

      // always editable (default for status COMPLETED)
      _editables.cover_image = true
      _editables.title = true
      _editables.overview = true
      setEditables(_editables)
    }
  }, [router])

  return { submit, isEdit, editables }
}

export default useTopicCreate

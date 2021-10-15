import { useEffect } from 'react'
import communityStore from '@store/community'
import { TopicParams } from '@services/community.service'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useTranslation } from 'react-i18next'
import { createMetaSelector } from '@store/metadata/selectors'

const { actions, selectors } = communityStore
const createTopicMeta = createMetaSelector(actions.createTopic)

export type EditableTypes = {
  title: boolean
  overview: boolean
  cover_image: boolean
}

const useTopicCreate = (): {
  submit(params: TopicParams): void
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()

  const resetMeta = () => dispatch(clearMetaData(actions.createTopic.typePrefix))

  const meta = useAppSelector(createTopicMeta)
  const topicDetail = useAppSelector(selectors.getTopicDetail)

  const submit = (params: TopicParams) => dispatch(actions.createTopic(params))

  useEffect(() => {
    if (meta.loaded) {
      resetMeta()
      router.push(`${ESRoutes.COMMUNITY}/${router.query.hash_key}/topic/${topicDetail.attributes.hash_key}`)
      dispatch(commonActions.addToast(t('common:topic_create.create_success')))
    }
  }, [meta])

  useEffect(() => {
    return () => {
      resetMeta()
    }
  }, [])

  return { submit }
}

export default useTopicCreate

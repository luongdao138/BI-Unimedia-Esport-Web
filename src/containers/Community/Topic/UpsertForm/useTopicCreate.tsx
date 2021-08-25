import { useAppDispatch } from '@store/hooks'
import communityStore from '@store/community'
import { TopicParams } from '@services/community.service'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'

const { actions } = communityStore
// TODO change when data is ready
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

  const submit = async (params: TopicParams) => {
    const resultAction = await dispatch(actions.createTopic(params))
    if (actions.createTopic.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.COMMUNITY}/${router.query.hash_key}/topic/${resultAction.payload.data.attributes.hash_key}`)
      dispatch(commonActions.addToast(t('common:topic_create.create_success')))
    }
  }

  return { submit }
}

export default useTopicCreate

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { CommunityDetail, CommunityFeature, CommunityFormParams, UpdateParams } from '@services/community.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'

const { actions, selectors } = community
const _getCommunityFeaturesMeta = createMetaSelector(actions.getCommunityFeatures)
// TODO change when data is ready
export type EditableTypes = {
  name: boolean
  description: boolean
  area_id: boolean
  address: boolean
  join_condition: boolean
  open_range: boolean
  game_titles: boolean
  features: boolean
  cover_image_url: boolean
}

const useCommunityCreate = (): {
  isEdit: boolean
  community: CommunityDetail
  communityFeatures: Array<CommunityFeature>
  editables: EditableTypes
  submit(params: CommunityFormParams): void
  update(params: UpdateParams): void
  getCommunityFeaturesMeta: Meta
  getCommunityFeatures: () => void
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const community = useAppSelector(selectors.getCommunityDetail)
  const communityFeatures = useAppSelector(selectors.getCommunityFeatures)
  const getCommunityFeatures = () => dispatch(actions.getCommunityFeatures())
  const getCommunityFeaturesMeta = useAppSelector(_getCommunityFeaturesMeta)
  const [isEdit, setIsEdit] = useState(false)
  const [editables, setEditables] = useState<EditableTypes>({
    // always editable
    name: true,
    description: true,
    features: true,
    game_titles: true,
    join_condition: true,
    area_id: true,
    open_range: true,
    address: true,
    cover_image_url: true,
  })
  const isEditable = true

  const submit = (params: CommunityFormParams) => {
    // router.push(`${ESRoutes.COMMUNITY}/123`)
    dispatch(actions.createCommunity(params))
    dispatch(commonActions.addToast(t('common:community_create.community_created_toast')))
  }

  const update = async (params: UpdateParams) => {
    const resultAction = await dispatch(actions.updateCommunity(params))
    if (actions.updateCommunity.fulfilled.match(resultAction)) {
      router.push(`${ESRoutes.COMMUNITY}/${resultAction.meta.arg.hash_key}`)
      dispatch(actions.getCommunityDetail(String(resultAction.meta.arg.hash_key)))
      dispatch(commonActions.addToast(t('common:community_create.community_created_toast')))
    }
  }

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.community_id) {
      // TODO dispatch get Community detail
      setIsEdit(true)
    }
  }, [router])

  useEffect(() => {
    if (community && router.asPath.endsWith('/edit') && router.query.community_id) {
      if (!isEditable) {
        router.push(ESRoutes.COMMUNITY_DETAIL.replace(/:id/gi, String(router.query.community_id)))
        return
      }

      let _editables = { ...editables }
      // always not editable
      _editables = _.mapValues(_editables, () => false)
      _editables.game_titles = true
      _editables.cover_image_url = true
      _editables.name = true
      _editables.description = true
      _editables.open_range = true
      _editables.join_condition = true
      _editables.area_id = true
      _editables.address = true
      _editables.features = true
      setEditables(_editables)
    }
  }, [community, router])

  return { isEdit, update, community, communityFeatures, editables, submit, getCommunityFeaturesMeta, getCommunityFeatures }
}

export default useCommunityCreate

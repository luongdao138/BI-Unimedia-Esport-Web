import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { CommunityDetail, CommunityFeature, CommunityFormParams } from '@services/community.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions, selectors } = community
const _getCommunityFeaturesMeta = createMetaSelector(actions.getCommunityFeatures)
// TODO change when data is ready
export type EditableTypes = {
  name: boolean
  overview: boolean
  area_id: boolean
  address: boolean
  join_condition: boolean
  open_range: boolean
  game_title: boolean
  features: boolean
  cover_image_url: boolean
}

const useCommunityCreate = (): {
  isEdit: boolean
  community: CommunityDetail
  communityFeatures: Array<CommunityFeature>
  editables: EditableTypes
  submit(params: CommunityFormParams): void
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
    cover_image_url: true,
    name: true,
    overview: true,
    join_condition: true,
    open_range: true,
    area_id: true,
    address: true,
    game_title: true,
    features: true,
  })
  const isEditable = true

  const resetMeta = () => dispatch(clearMetaData(actions.createCommunity.typePrefix))
  const submit = async (params: CommunityFormParams) => {
    const resultAction = await dispatch(actions.createCommunity(params))
    if (actions.createCommunity.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.COMMUNITY}/${resultAction.payload.id}`)
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
      _editables.game_title = false
      _editables = _.mapValues(_editables, () => false)
      _editables.cover_image_url = true
      _editables.name = true
      _editables.overview = true
      _editables.open_range = true
      _editables.join_condition = true
      _editables.area_id = true
      _editables.address = true
      _editables.features = true
      setEditables(_editables)
    }
  }, [community, router])

  return { isEdit, community, communityFeatures, editables, submit, getCommunityFeaturesMeta, getCommunityFeatures }
}

export default useCommunityCreate

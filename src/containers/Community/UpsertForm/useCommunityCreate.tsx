import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import community from '@store/community'
import { CommunityDetail, CommunityFeature, CommunityFormParams, UpdateParams } from '@services/community.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { createMetaSelector } from '@store/metadata/selectors'
import { Meta } from '@store/metadata/actions/types'
import { clearMetaData } from '@store/metadata/actions'

const { actions, selectors } = community
const _getCommunityFeaturesMeta = createMetaSelector(actions.getCommunityFeatures)
const createCommunityMeta = createMetaSelector(actions.createCommunity)
const updateCommunityMeta = createMetaSelector(actions.updateCommunity)

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
  communityFeatures: CommunityFeature[]
  editables: EditableTypes
  submit(params: CommunityFormParams): void
  update(params: UpdateParams): void
  getCommunityFeaturesMeta: Meta
  getCreateCommunityMeta: Meta
  getUpdateCommunityMeta: Meta
  getCommunityFeatures: () => void
  resetCreateUpdateMeta: () => void
} => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const dispatch = useAppDispatch()
  const community = useAppSelector(selectors.getCommunityDetail)
  const communityFeatures = useAppSelector(selectors.getCommunityFeatures)
  const getCommunityFeatures = () => dispatch(actions.getCommunityFeatures())
  const getCommunityFeaturesMeta = useAppSelector(_getCommunityFeaturesMeta)
  const getCreateCommunityMeta = useAppSelector(createCommunityMeta)
  const getUpdateCommunityMeta = useAppSelector(updateCommunityMeta)
  const [isEdit, setIsEdit] = useState(false)

  const editables: EditableTypes = {
    name: true,
    description: true,
    features: true,
    game_titles: true,
    join_condition: true,
    area_id: true,
    open_range: true,
    address: true,
    cover_image_url: true,
  }

  const resetCreateUpdateMeta = () => {
    dispatch(clearMetaData(actions.createCommunity.typePrefix))
    dispatch(clearMetaData(actions.updateCommunity.typePrefix))
  }

  const resetMeta = () => dispatch(clearMetaData(actions.createCommunity.typePrefix))
  const submit = async (params: CommunityFormParams) => {
    const resultAction = await dispatch(actions.createCommunity(params))
    if (actions.createCommunity.fulfilled.match(resultAction)) {
      resetMeta()
      router.push(`${ESRoutes.COMMUNITY}/${resultAction.payload.hash_key}`)
      dispatch(commonActions.addToast(t('common:community_create.community_created_toast')))
    }
  }

  const update = async (params: UpdateParams) => {
    const resultAction = await dispatch(actions.updateCommunity(params))
    if (actions.updateCommunity.fulfilled.match(resultAction)) {
      router.push(`${ESRoutes.COMMUNITY}/${resultAction.meta.arg.hash_key}`)
      dispatch(actions.getCommunityDetail(String(resultAction.meta.arg.hash_key)))
      dispatch(commonActions.addToast(t('common:community_create.community_updated_toast')))
    }
  }

  useEffect(() => {
    if (router.asPath.endsWith('/edit') && router.query.hash_key) {
      setIsEdit(true)
      dispatch(actions.getCommunityDetail(String(router.query.hash_key)))
    }
  }, [router])

  return {
    isEdit,
    update,
    community,
    communityFeatures,
    editables,
    submit,
    getCommunityFeaturesMeta,
    getCommunityFeatures,
    getCreateCommunityMeta,
    getUpdateCommunityMeta,
    resetCreateUpdateMeta,
  }
}

export default useCommunityCreate

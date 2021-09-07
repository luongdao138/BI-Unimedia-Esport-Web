import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import * as actions from '@store/community/actions'

const useCancelDialog = (): {
  closeCommunity: (params: string) => void
} => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common'])

  const closeCommunity = async (params) => {
    const resultAction = await dispatch(actions.closeCommunity(params))
    if (actions.closeCommunity.fulfilled.match(resultAction)) {
      router.push(ESRoutes.COMMUNITY)
      dispatch(commonActions.addToast(t('common:community_create.disband.disbanded_toast')))
    }
  }

  return {
    closeCommunity,
  }
}

export default useCancelDialog

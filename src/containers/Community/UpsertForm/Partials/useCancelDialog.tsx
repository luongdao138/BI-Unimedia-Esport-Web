import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const useCancelDialog = (): {
  cancelTournament: () => void
} => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { t } = useTranslation(['common'])

  const cancelTournament = () => {
    router.push(ESRoutes.COMMUNITY)
    dispatch(commonActions.addToast(t('common:community_create.disband.disbanded_toast')))
  }

  return {
    cancelTournament,
  }
}

export default useCancelDialog

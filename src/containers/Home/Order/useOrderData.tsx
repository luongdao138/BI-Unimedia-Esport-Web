import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import useReturnHref from '@utils/hooks/useReturnHref'
import { arrayMove } from '@dnd-kit/sortable'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { HomeSettingsParams } from '@services/user.service'

const { selectors, actions } = userProfile

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useOrderData = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const userProfile = useAppSelector(selectors.getUserProfile)
  const homeSettings = userProfile ? userProfile.attributes.home_settings : []

  const updateHomeSettings = (param: HomeSettingsParams) => dispatch(actions.updateHomeSettings(param))

  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(homeSettings)
  }, [userProfile])

  const { handleReturn } = useReturnHref()

  const handleCancel = () => handleReturn()

  const handleDone = () => {
    updateHomeSettings({ home_settings: items })
    router.push(ESRoutes.HOME)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return {
    handleDragEnd,
    items,
    handleCancel,
    handleDone,
  }
}

export default useOrderData

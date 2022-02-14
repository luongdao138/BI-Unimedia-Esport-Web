import React, { useEffect, useState } from 'react'
import IndividualGiftListContainer from '@containers/StreamingSettingContainer/IndividualGiftList'
import GiftMemberListContainer from '@containers/StreamingSettingContainer/GiftMemberListContainer'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'

type Props = {
  onChangeTab?: (tab: TabState) => void
}

export enum TabState {
  LIST = 0,
  CREATE_NEW = 1,
}

const GiftManageTab: React.FC<Props> = ({ onChangeTab }) => {
  const [tabState, setTabState] = useState(TabState.LIST)
  const { resetNewGroupMasterList } = useGiftTarget()

  useEffect(() => {
    onChangeTab(tabState)
  }, [tabState])

  const handleGoToCreateNewListState = () => {
    setTabState(TabState.CREATE_NEW)
    resetNewGroupMasterList()
  }

  const handleBackToListState = () => {
    setTabState(TabState.LIST)
  }

  if (tabState === TabState.LIST) {
    return <IndividualGiftListContainer handleGoToCreateNewListState={handleGoToCreateNewListState} />
  }

  return <GiftMemberListContainer handleBackToListState={handleBackToListState} />
}

export default GiftManageTab

import React, { useEffect, useState } from 'react'
import IndividualGiftListContainer from '@containers/StreamingSettingContainer/IndividualGiftList'
import GiftMemberListContainer from '@containers/StreamingSettingContainer/GiftMemberListContainer'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'
import { GiftGroupType } from '@services/gift.service'

type Props = {
  onChangeTab?: (tab: TabState) => void
  tabState?: TabState
}

export enum TabState {
  LIST = 0,
  CREATE_NEW = 1,
}

export enum CreateMode {
  CREATE,
  EDIT,
}

const GiftManageTab: React.FC<Props> = ({ onChangeTab, tabState }) => {
  const [createMode, setCreateMode] = useState(CreateMode.CREATE)

  const { resetNewGroupMasterList, getGiftGroupDetail } = useGiftTarget()

  useEffect(() => {
    onChangeTab(tabState)
  }, [tabState])

  const handleGoToCreateNewListState = () => {
    setCreateMode(CreateMode.CREATE)
    onChangeTab(TabState.CREATE_NEW)
    resetNewGroupMasterList()
  }

  const handleGoToEditGiftGroupState = ({ group_uuid }: GiftGroupType) => () => {
    setCreateMode(CreateMode.EDIT)
    onChangeTab(TabState.CREATE_NEW)
    resetNewGroupMasterList()
    getGiftGroupDetail(group_uuid)
  }

  const handleBackToListState = () => {
    onChangeTab(TabState.LIST)
  }

  if (tabState === TabState.LIST) {
    return (
      <IndividualGiftListContainer
        handleGoToEditGiftGroupState={handleGoToEditGiftGroupState}
        handleGoToCreateNewListState={handleGoToCreateNewListState}
      />
    )
  }

  return <GiftMemberListContainer createMode={createMode} handleBackToListState={handleBackToListState} />
}

export default GiftManageTab

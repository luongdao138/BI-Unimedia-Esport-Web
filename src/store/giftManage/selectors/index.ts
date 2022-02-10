import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.giftManage

export const getListGiftTargetPerson = createSelector(getRoot, (state) => state.gift_target_data)
export const getSnsUrlValidCheckStatus = createSelector(getRoot, (state) => state.check_sns_url)
export const getListGiftMaster = createSelector(getRoot, (state) => state.gift_master_list)
export const getNewGroupGiftMasterList = createSelector(getRoot, (state) => state.new_group_gift_master_list)
export const getListGiftGroup = createSelector(getRoot, (state) => state.gift_group_list)

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.giftManage

export const getListGiftTargetPerson = createSelector(getRoot, (state) => state.gift_target_data)

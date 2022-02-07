import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import * as authActions from '@store/auth/actions'
import { GiftMasterType } from '@services/gift.service'

export type GiftTargetItemType = {
  target_value: string
  target_name: string
  sns_url: string
}

export enum SnsUrlValidType {
  INIT,
  VALID,
  INVALID,
}

type StateType = {
  gift_target_data: Array<GiftTargetItemType>
  check_sns_url: SnsUrlValidType
  gift_master_list: Array<GiftMasterType>
}

const initialState: StateType = {
  gift_target_data: [],
  check_sns_url: SnsUrlValidType.INIT,
  gift_master_list: [],
}

export default createReducer(initialState, (builder) => {
  // add gift target person
  builder
    .addCase(actions.addTargetPerson.fulfilled, (state, action) => {
      const isExist = state.gift_target_data?.some((item) => item.sns_url === action.payload.sns_url)
      if (!isExist) {
        state.gift_target_data = state.gift_target_data?.concat(action.payload)
      }
    })

    // logout clear data gift target person
    .addCase(authActions.logout.fulfilled, (state) => {
      state.gift_target_data = []
    })

    .addCase(actions.checkSnsUrl.fulfilled, (state, action) => {
      if (action.payload.code !== 200) {
        state.check_sns_url = SnsUrlValidType.INVALID
      } else {
        const isExist = state.gift_target_data?.some((item) => item.sns_url === action.payload.sns_url)
        state.check_sns_url = isExist ? SnsUrlValidType.INVALID : SnsUrlValidType.VALID
      }
    })

    .addCase(actions.resetSnsStateCheck, (state) => {
      state.check_sns_url = SnsUrlValidType.INIT
    })

    .addCase(actions.getAllGiftMaster.fulfilled, (state, action) => {
      state.gift_master_list = action.payload.data
    })
})

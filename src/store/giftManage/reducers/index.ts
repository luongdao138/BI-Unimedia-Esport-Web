import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import * as authActions from '@store/auth/actions'
import { GiftGroupType, GiftMasterType } from '@services/gift.service'
import _ from 'lodash'

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
  new_group_gift_master_list: Array<GiftMasterType>
  gift_group_list: Array<GiftGroupType>
  gift_group_total: number
}

const initialState: StateType = {
  gift_target_data: [],
  check_sns_url: SnsUrlValidType.INIT,
  gift_master_list: [],
  new_group_gift_master_list: [],
  gift_group_list: [],
  gift_group_total: 0,
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

    .addCase(actions.addGiftMasterToNewGroup, (state, action) => {
      const { data } = action.payload
      const { new_group_gift_master_list: list } = state
      const included = _.find(list, ({ id }) => id === data.id)
      if (included) return
      state.new_group_gift_master_list = [...list, data]
    })

    .addCase(actions.removeGiftMasterFromNewGroup, (state, action) => {
      const { data } = action.payload
      const { new_group_gift_master_list: list } = state
      state.new_group_gift_master_list = list.filter(({ id }) => id !== data.id)
    })

    .addCase(actions.getGiftGroupList.fulfilled, (state, action) => {
      const { data } = action.payload
      const { groups, total } = data
      state.gift_group_list = groups
      state.gift_group_total = total
    })
})

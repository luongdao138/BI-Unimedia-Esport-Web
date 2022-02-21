import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { GiftGroupDetail, GiftGroupType, GiftMasterType } from '@services/gift.service'
import _ from 'lodash'

export type GiftTargetItemType = {
  id: string
  target_value: string
  target_name: string
  sns_url: string
}

type StateType = {
  gift_target_data: Array<GiftTargetItemType>
  gift_master_list: Array<GiftMasterType>
  new_group_gift_master_list: Array<GiftMasterType>
  gift_group_list: Array<GiftGroupType>
  gift_group_total: number
  gift_group_edit_detail: GiftGroupDetail
}

const initialState: StateType = {
  gift_target_data: [],
  gift_master_list: [],
  new_group_gift_master_list: [],
  gift_group_list: [],
  gift_group_total: 0,
  gift_group_edit_detail: null,
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
    .addCase(actions.updateTargetPerson.fulfilled, (state, action) => {
      const newGiftTargetData = state.gift_target_data.map((gift) => {
        if (gift.id === action.payload.id) {
          return {
            ...gift,
            target_value: action.payload.target_value,
            target_name: action.payload.target_name,
            sns_url: action.payload.sns_url,
          }
        }
        return gift
      })
      state.gift_target_data = newGiftTargetData
    })
    .addCase(actions.deleteTargetPerson.fulfilled, (state, action) => {
      state.gift_target_data = state.gift_target_data.filter((gift) => gift.id !== action.payload)
    })
    .addCase(actions.resetGiftTargetPerson, (state) => {
      state.gift_target_data = []
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

    .addCase(actions.resetGiftGroupMasterList, (state) => {
      state.new_group_gift_master_list = []
    })

    .addCase(actions.deleteGiftMasterFromLocalList, (state, action) => {
      const { data } = action.payload
      const { gift_target_data } = state
      state.gift_target_data = gift_target_data.filter((item) => item.sns_url !== data.sns_url)
    })

    .addCase(actions.getGiftGroupDetail.fulfilled, (state, action) => {
      const { data } = action.payload
      state.gift_group_edit_detail = data
      state.new_group_gift_master_list = data.group_item
    })
})

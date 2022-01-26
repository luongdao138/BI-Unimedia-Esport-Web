import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import * as authActions from '@store/auth/actions'

export type GiftTargetItemType = {
  target_value: string
  target_name: string
  sns_url: string
}
type StateType = {
  gift_target_data: Array<GiftTargetItemType>
}
const initialState: StateType = {
  gift_target_data: [],
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
})

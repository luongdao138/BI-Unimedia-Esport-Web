import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
import { SavedCards } from '@services/purchasePoints.service'
import { GMO_ERROR_CODE } from '@constants/common.constants'

type StateType = {
  saved_cards: Array<SavedCards>
  GMO_SHOP_ID: string
  purchase_success: boolean
  purchased_point: number
  mess_error_purchase_point: string
}

const initialState: StateType = {
  saved_cards: [],
  GMO_SHOP_ID: '',
  purchase_success: false,
  purchased_point: 0,
  mess_error_purchase_point: '',
}

const splitCardInfo = (str) => {
  return str.split('|')
}

export default createReducer(initialState, (builder) => {
  builder.addCase(actions.getSavedCards.fulfilled, (state, action) => {
    state.GMO_SHOP_ID = action.payload.data.GMO_SHOP_ID
    const res_saved_cards = action.payload.data.attributes
    if (res_saved_cards && Object.keys(res_saved_cards).length !== 0 && res_saved_cards.CardNo) {
      const card_numbers = splitCardInfo(res_saved_cards.CardNo)
      const card_seqs = splitCardInfo(res_saved_cards.CardSeq)
      let saved_cards = []
      for (let index = 0; index < card_numbers.length; index++) {
        saved_cards = [
          ...saved_cards,
          {
            card_number: card_numbers[index],
            card_seq: card_seqs[index],
          },
        ]
      }
      state.saved_cards = saved_cards
    } else {
      state.saved_cards = []
    }
  })
  builder.addCase(actions.purchasePointUseOldCard.pending, (state, action) => {
    state.purchased_point = Number(action.meta.arg.point)
    state.purchase_success = false
    state.mess_error_purchase_point = ''
  })
  builder.addCase(actions.purchasePointUseOldCard.fulfilled, (state) => {
    state.purchase_success = true
  })
  builder.addCase(actions.purchasePointUseOldCard.rejected, (state, action: any) => {
    const errorCode = action?.payload?.error?.ErrInfo
    if (errorCode && GMO_ERROR_CODE[errorCode]) {
      state.mess_error_purchase_point = GMO_ERROR_CODE[errorCode]
    }
  })
  builder.addCase(actions.purchasePointUseNewCard.pending, (state, action) => {
    state.purchased_point = Number(action.meta.arg.point)
    state.purchase_success = false
    state.mess_error_purchase_point = ''
  })
  builder.addCase(actions.purchasePointUseNewCard.fulfilled, (state) => {
    state.purchase_success = true
  })
  builder.addCase(actions.purchasePointUseNewCard.rejected, (state, action: any) => {
    const errorCode = action?.payload?.error?.ErrInfo
    if (errorCode && GMO_ERROR_CODE[errorCode]) {
      state.mess_error_purchase_point = GMO_ERROR_CODE[errorCode]
    }
  })
  builder.addCase(actions.resetErrorMess, (state) => {
    state.mess_error_purchase_point = ''
  })
})

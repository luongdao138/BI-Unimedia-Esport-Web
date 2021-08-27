import { createReducer } from '@reduxjs/toolkit'
import * as actions from '../actions'
// import { TournamentListItem } from '@services/arena.service'
import { SavedCards } from '@services/purchasePoints.service'
// import { registerProfile, logout } from '@store/auth/actions'
// import { blockUser, unblockUser } from '@store/block/actions'
// import { UPLOADER_TYPE } from '@constants/image.constants'
// import { FOLLOW_STATES } from '@constants/common.constants'

type StateType = {
  saved_cards: Array<SavedCards>
  GMO_SHOP_ID: string
}

const initialState: StateType = {
  saved_cards: [],
  GMO_SHOP_ID: '',
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
          }
        ]
      }
      state.saved_cards = saved_cards
    } else {
      state.saved_cards = []
    }
  })
})

import { RootState } from '@store/reducers'
import { createSelector } from 'reselect'

export const msgList = (state: RootState) => state.chatHistory.list

export const historySelectors = createSelector(msgList, (items) => items)

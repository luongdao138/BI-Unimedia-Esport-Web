import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.chat

export const friendList = createSelector(getRoot, (state) => state.friendList)

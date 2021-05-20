import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.socket

export const getRoomList = createSelector(getRoot, (state) => state.roomList)
export const messages = createSelector(getRoot, (state) => state.messages)

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.socket

export const getRoomList = createSelector(getRoot, (state) => state.roomList)
export const messages = createSelector(getRoot, (state) => state.messages)
export const getRoomMembers = createSelector(getRoot, (state) => state.chatMembers)
export const socketReady = createSelector(getRoot, (state) => state.socketReady)
export const members = createSelector(getRoot, (state) => state.members)
export const lastKey = createSelector(getRoot, (state) => state.lastKey)
export const paginating = createSelector(getRoot, (state) => state.paginating)

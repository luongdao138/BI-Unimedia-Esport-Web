import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.chat

export const friendList = createSelector(getRoot, (state) => state.friendList)
export const redirectDm = createSelector(getRoot, (state) => state.redirectDm)
export const singleUser = createSelector(getRoot, (state) => state.singleUser)
export const tournamentDetail = createSelector(getRoot, (state) => state.tournamentDetail)

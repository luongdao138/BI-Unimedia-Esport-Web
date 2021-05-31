import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.search

export const getSearchUsers = createSelector(getRoot, (state) => state.searchUsers)
export const getSearchUsersMeta = createSelector(getRoot, (state) => state.searchUsersMeta)
export const getSearchType = createSelector(getRoot, (state) => state.type)
export const getSearchKeyword = createSelector(getRoot, (state) => state.keyword)

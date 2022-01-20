import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.ngWords

export const getNgWords = createSelector(getRoot, (state) => state.words)
export const getVideoNgWords = createSelector(getRoot, (state) => state.videoWords)

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.common

export const getPrefectures = createSelector(getRoot, (state) => state.prefectures)

export const getHardwares = createSelector(getRoot, (state) => state.hardwares)

export const getToasts = createSelector(getRoot, (state) => state.toasts)

export const getDialog = createSelector(getRoot, (state) => state.dialog)

export const getNotFound = createSelector(getRoot, (state) => state.notFound)

export const getAction = createSelector(getRoot, (state) => state.action)

export const getErrorModal = createSelector(getRoot, (state) => state.errorModal)

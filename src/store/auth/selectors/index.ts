import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.auth

export const getAuth = createSelector(getRoot, (state) => state.user)

export const currentUserId = createSelector(getRoot, (state) => state.user?.id)

export const getUserCode = createSelector(getRoot, (state) => state.user?.user_code)

export const getIsRegistered = createSelector(getRoot, (state) => state.user && !!state.user.nickname && !!state.user.user_code)

export const getIsAuthenticated = createSelector(getRoot, (state) => !!state.user?.accessToken)

export const getHasEmail = createSelector(getRoot, (state) => !!state.user?.email)

export const getIsConfirmed = createSelector(getRoot, (state) => state.user && state.user.updateStep === 3)

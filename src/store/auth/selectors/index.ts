import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'

const getRoot = (state: RootState) => state.auth

export const getAuth = createSelector(getRoot, (state) => state.user)

export const getIsRegistered = createSelector(getRoot, (state) => state.user && !!state.user.nickname && !!state.user.user_code)

export const getIsAuthenticated = createSelector(getRoot, (state) => !!state.user?.accessToken)

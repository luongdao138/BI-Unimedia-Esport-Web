import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/reducers'

const getRoot = (state: RootState) => state.metadata

const defaultMeta = {
  pending: false,
  loaded: false,
  error: false,
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createMetaSelector = ({ typePrefix }: { typePrefix: string }) => {
  return createSelector(getRoot, (state) => {
    return state[typePrefix] || defaultMeta
  })
}

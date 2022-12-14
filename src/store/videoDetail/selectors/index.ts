import { RootState } from '@store/reducers'
import { createSelector } from 'reselect'

export const detail = (state: RootState) => state.videoDetail

export const detailSelectors = createSelector(detail, (items) => items.detail)
export const prDetailSelectors = createSelector(detail, (items) => items.pr_detail)
export const getMeta = createSelector(detail, (state) => state.meta)

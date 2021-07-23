import { RootState } from '@store/reducers'
import { createSelector } from 'reselect'

export const detail = (state: RootState) => state.videoDetail.detail

export const detailSelectors = createSelector(detail, (items) => items)

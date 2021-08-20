import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.liveSetting
const getUserId = (state: RootState) => state.auth?.user?.id

export const getLiveStreamSetting = createSelector(getRoot, getUserId, (state) => state.liveSettingInfo)
export const getScheduleSetting = createSelector(getRoot, (state) => state.scheduleInfo)
export const getStreamUrlAndKey = createSelector(getRoot, (state) => state.getStreamUrlAndKeyInfo)
export const getCategorySelector = createSelector(getRoot, (state) => state.getCategory)
export const getChannelSelector = createSelector(getRoot, (state) => state.getChannel)

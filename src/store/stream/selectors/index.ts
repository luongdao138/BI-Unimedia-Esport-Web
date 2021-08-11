import { RootState } from '@store/store'
import { createSelector } from 'reselect'

const getRoot = (state: RootState) => state.liveSetting
const getUserId = (state: RootState) => state.auth?.user?.id

export const getLiveStreamSetting = createSelector(getRoot, getUserId, (state) => state.liveSettingInfo)

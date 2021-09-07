import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
import { DateHelper } from '@utils/helpers/DateHelper'

const getRoot = (state: RootState) => state.lobby

export const recommendedParticipantsSelector = createSelector(getRoot, (state) => state.recommendedParticipants)
export const participantSelector = createSelector(getRoot, (state) => state.participants)
export const participantsMeta = createSelector(getRoot, (state) => state.participantsMeta)
export const getLobbyCategories = createSelector(getRoot, (state) => state.lobbyCategories)
export const getLobbyDetail = createSelector(getRoot, (state) => state.lobbyDetail)
export const getSearchLobbiesMeta = createSelector(getRoot, (state) => state.searchLobbiesMeta)
export const getSearchLobbies = createSelector(getRoot, (state) => {
  return state.searchLobbies.map((item) => {
    return {
      ...item,
      participantsLimited: item.attributes.participants ? item.attributes.participants.slice(0, 3) : [],
      startDate: DateHelper.formatDate(item.attributes.start_datetime),
      entryEndDate: DateHelper.formatDate(item.attributes.entry_end_datetime),
    }
  })
})

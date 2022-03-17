import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'

export const useCheckDisplayChat = (): {
  isEnabledGift: boolean
  isEnabledRanking: boolean
  isEnabledMessFilter: boolean
  isDisplayedRankingTab: boolean
  isEnabledRankFilter: boolean
  hasListReceiverGift: boolean
  isDisplayedRankingReceipt: boolean
} => {
  const { detailVideoResult } = useDetailVideo()

  const isEnabledGift = !!detailVideoResult?.use_gift
  const isEnabledRanking = !!detailVideoResult?.ranking_flag
  const hasListReceiverGift = !!detailVideoResult?.group_items

  const isEnabledMessFilter = isEnabledGift
  const isEnabledRankFilter = isEnabledGift && isEnabledRanking && hasListReceiverGift
  const isDisplayedRankingTab = isEnabledGift && isEnabledRanking
  // this condition is equal isEnabledRankFilter due to has isEnabledRankFilter => has isDisplayedRankingReceipt
  const isDisplayedRankingReceipt = isEnabledGift && isEnabledRanking && hasListReceiverGift

  return {
    isEnabledGift,
    isEnabledRanking,
    isEnabledMessFilter,
    isDisplayedRankingTab,
    isEnabledRankFilter,
    hasListReceiverGift,
    isDisplayedRankingReceipt,
  }
}

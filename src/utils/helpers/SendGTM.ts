/* eslint-disable no-console */
declare global {
  interface Window {
    dataLayer: any
  }
}

const SCREEN_NAME_ADS = {
  HOME: 'Home',
  NOTIFICATION: 'Notification',
  PROFILE: 'Profile',
  ARENA: 'Arena',
  ARENA_DETAIL: 'ArenaDetail',
  LOBBY: 'Lobby',
  LOBBY_DETAIL: 'LobbyDetail',
  COMMUNITY: 'Community',
  COMMUNITY_DETAIL: 'CommunityDetail',
  SEARCH: 'Search',
  MESSAGE: 'Message',
  VIDEO_DETAIL: 'VideoDetail',
}

function getAdSlot() {
  sendEvent('gtm.dom', {
    'gtm.adSlot': 'GTM_AD_SLOT_VBK',
  })
}

const getDataSlot = (dataLayers, screen) => {
  const data = dataLayers.find((i) => i.get_display_status_ads)
  console.log('getDataSlot data layer===>>', dataLayers, '-----30----getDataSlot: ', JSON.stringify(data))
  if (data && data?.get_display_status_ads) {
    const objectStatusAds = data?.get_display_status_ads
    console.log('filter DATA SLOT==>', data, objectStatusAds)
    const objKeys = Object.keys(objectStatusAds)
    const findData = objKeys.find((i) => i === screen)
    const dataSlot = objectStatusAds[findData]?.googleAds?.data_ad_slot
    console.log('====getDataSlot====', dataSlot)
    return dataSlot
  }
}

export function sendEvent(event, arg) {
  window.dataLayer.push({ event, ...arg })
}

export const GTMHelper = {
  getAdSlot,
  getDataSlot,
  SCREEN_NAME_ADS,
}

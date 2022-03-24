/* eslint-disable no-console */
import { useState } from 'react'
import useLiveStreamDetail from './useLiveStreamDetail'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePictureInPicture = () => {
  const { getMiniPlayerState, changeMiniPlayerState } = useLiveStreamDetail()
  const [isLoadedMetaData, setIsLoadedMetaData] = useState(false)

  function isCheckEnablePIP(videoElement) {
    if (document.pictureInPictureEnabled && !videoElement.disablePictureInPicture) {
      return true
    }
    return false
  }
  function isCheckShowingPIP() {
    if (document.pictureInPictureElement) {
      return true
    }
    return false
  }

  async function requestPIP(videoElement) {
    try {
      if (isCheckEnablePIP(videoElement) && getMiniPlayerState) {
        await videoElement.requestPictureInPicture()
        videoElement.play()
      }
    } catch (error) {
      console.log('error pictureInPicture-----------', error)
    }
  }
  function exitPIP(videoElement) {
    // is showing PIP
    if (isCheckEnablePIP(videoElement)) {
      document.exitPictureInPicture()
    }
  }
  function listenEnteredPIP(videoElement) {
    videoElement?.addEventListener('enterpictureinpicture', () => {
      // Video entered Picture-in-Picture mode.
      console.log('> Video ENTERED Picture-in-Picture')
      changeMiniPlayerState(true)
    })
  }
  function listenLeavedPIP(videoElement) {
    videoElement?.addEventListener('leavepictureinpicture', () => {
      // Video entered Picture-in-Picture mode.
      console.log('> Video LEAVED Picture-in-Picture')
      changeMiniPlayerState(false)
    })
  }
  function listenLoadMetaDataPIP(videoElement) {
    videoElement?.addEventListener('loadedmetadata', () => {
      setIsLoadedMetaData(true)
    })
  }

  return {
    requestPIP,
    exitPIP,
    isCheckShowingPIP,
    listenEnteredPIP,
    listenLeavedPIP,
    listenLoadMetaDataPIP,
    isLoadedMetaData,
  }
}

export default usePictureInPicture

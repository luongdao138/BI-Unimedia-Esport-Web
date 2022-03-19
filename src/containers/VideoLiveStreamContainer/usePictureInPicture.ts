/* eslint-disable no-console */
import useLiveStreamDetail from './useLiveStreamDetail'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const usePictureInPicture = () => {
  const { getMiniPlayerState, changeMiniPlayerState } = useLiveStreamDetail()

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

  function requestPIP(videoElement) {
    if (isCheckEnablePIP(videoElement) && getMiniPlayerState) {
      videoElement.requestPictureInPicture()
      videoElement.play()
    }
  }
  function exitPIP(videoElement) {
    // is showing PIP
    if (isCheckEnablePIP(videoElement)) {
      document.exitPictureInPicture()
      videoElement.play()
    }
  }
  function listenEnteredPIP(videoElement) {
    videoElement.addEventListener('enterpictureinpicture', () => {
      // Video entered Picture-in-Picture mode.
      console.log('> Video ENTERED Picture-in-Picture')
      changeMiniPlayerState(true)
    })
  }
  function listenLeavedPIP(videoElement) {
    videoElement.addEventListener('leavepictureinpicture', () => {
      // Video entered Picture-in-Picture mode.
      console.log('> Video LEAVED Picture-in-Picture')
      changeMiniPlayerState(false)
    })
  }

  return {
    requestPIP,
    exitPIP,
    isCheckShowingPIP,
    listenEnteredPIP,
    listenLeavedPIP,
  }
}

export default usePictureInPicture

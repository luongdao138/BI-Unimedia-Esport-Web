import { liveEventsServices } from '@services/liveEvents.service'
import { socketActions } from '@store/live_socket/actions'
import { VIDEO_DETAIL_ACTION_TYPE } from './types'
// import { getCookie } from '@store/auth/actions'
import { AppDispatch } from '@store/store'

export const videoDetailActions = {
  detail: () => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (dispatch: AppDispatch) => {
      dispatch(videoDetailCreators.detailRequest())
      liveEventsServices.getTop().then(
        (data) => {
          dispatch(getCookie())
          dispatch(videoDetailCreators.detailSuccess(data.data))
        },
        (error) => {
          if (error && error.data && error.data.error) {
            dispatch(videoDetailCreators.detailFailure(error.data.error))
          }
        }
      )
    }
  },
  getArchiveData: (url: string, onSuccess?: (d: any) => void) => {
    return (dispatch: AppDispatch) => {
      liveEventsServices.getChatJson(url).then((data) => {
        onSuccess && onSuccess(data.messages)
        dispatch(socketActions.setCount(data.roomInfo))
      })
    }
  },
  archivePlay: (id: number) => {
    return (dispatch: AppDispatch) => {
      dispatch(videoDetailCreators.request())
      liveEventsServices.archivePlay(id).then((_) => {
        dispatch(videoDetailCreators.requestSuccess())
      }),
        (_) => {
          dispatch(videoDetailCreators.requestFailure())
        }
    }
  },
  GetPrTop: () => {
    return (dispatch: AppDispatch) => {
      dispatch(videoDetailCreators.GetPrRequest())
      liveEventsServices.getPrTop().then(
        (data) => {
          dispatch(videoDetailCreators.GetPrSuccess(data.data))
        },
        (_) => {
          dispatch(videoDetailCreators.GetPrFail())
        }
      )
    }
  },
}

export const getCookie = () => {
  return (dispatch: AppDispatch) => {
    dispatch(videoDetailCreators.getCookieRequest())
    liveEventsServices.getCookie().then(
      () => {
        dispatch(videoDetailCreators.getCookieSuccess())
      },
      () => {
        dispatch(videoDetailCreators.getCookieFailure())
      }
    )
  }
}

export const videoDetailCreators = {
  detailRequest: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_REQUEST,
  }),
  detailSuccess: (data: any) => ({
    type: VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_SUCCESS,
    data: data.data,
  }),
  detailFailure: (error) => ({
    type: VIDEO_DETAIL_ACTION_TYPE.VIDEO_DETAIL_FAILURE,
    error,
  }),
  request: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.LIVE_EVENTS_REQUEST,
  }),
  requestSuccess: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.LIVE_EVENTS_REQUEST_SUCCESS,
  }),
  requestFailure: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.LIVE_EVENTS_REQUEST_FAILURE,
  }),
  GetPrRequest: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_REQUEST,
  }),
  GetPrSuccess: (data: any) => ({
    type: VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_SUCCESS,
    data: data.data,
  }),
  GetPrFail: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.PR_DETAIL_GET_FAIL,
  }),
  getCookieRequest: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.GET_COOKIE_REQUEST,
  }),
  getCookieSuccess: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.GET_COOKIE_SUCCESS,
  }),
  getCookieFailure: () => ({
    type: VIDEO_DETAIL_ACTION_TYPE.GET_COOKIE_FAILURE,
  }),
}

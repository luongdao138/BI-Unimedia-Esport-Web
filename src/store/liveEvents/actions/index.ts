import { liveEventsServices } from '@services/liveEvents.service'
import { LIVE_EVENTS_ACTION_TYPE } from './types'
import { getCookie } from '@store/videoDetail/actions'
import { AppDispatch } from '@store/store'

export const liveEventsActions = {
  GetTop: () => {
    return (dispatch: AppDispatch) => {
      dispatch(liveEventsCreators.GetTopRequest())
      liveEventsServices.getTop().then(
        (data) => {
          dispatch(getCookie())
          dispatch(liveEventsCreators.GetTopSuccess(data.data))
        },
        () => {
          dispatch(liveEventsCreators.GetTopFail())
          // console.log(error)
        }
      )
    }
  },
  ChangeLoader: (state: boolean) => {
    return (dispatch: AppDispatch) => {
      dispatch(liveEventsCreators.ChangeLoader(state))
    }
  },
}

export const liveEventsCreators = {
  GetTopRequest: () => ({
    type: LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_REQUEST,
  }),
  GetTopSuccess: (data: any) => ({
    type: LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_SUCCESS,
    data: data.data,
  }),
  GetTopFail: () => ({
    type: LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_TOP_GET_FAIL,
  }),
  ChangeLoader: (state: boolean) => ({
    type: LIVE_EVENTS_ACTION_TYPE.LIVE_EVENTS_CHANGE_LOADER,
    data: state,
  }),
}

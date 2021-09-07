/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { prServices } from '@services/pr.services'
import { AppDispatch } from '@store/store'
import { PR_ACTION_TYPE } from './types'

export const prActions = {
  GetTop: () => {
    return (dispatch: AppDispatch) => {
      dispatch(prCreators.GetPrRequest())
      prServices.getTop().then(
        (data) => {
          dispatch(prCreators.GetPrSuccess(data.data))
        },
        () => {
          dispatch(prCreators.GetPrFail())
          // console.log(error)
        }
      )
    }
  },
}

export const prCreators = {
  GetPrRequest: () => ({
    type: PR_ACTION_TYPE.PR_DETAIL_GET_REQUEST,
  }),
  GetPrSuccess: (data: any) => ({
    type: PR_ACTION_TYPE.PR_DETAIL_GET_SUCCESS,
    data: data.data,
  }),
  GetPrFail: () => ({
    type: PR_ACTION_TYPE.PR_DETAIL_GET_FAIL,
  }),
}

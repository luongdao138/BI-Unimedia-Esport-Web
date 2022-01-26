import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
// import * as services from '@services/points.service'
import { GIFT_MANAGE_ACTION_TYPE } from './types'

export type TargetPersonType = {
  target_value: string
  target_name: string
  sns_url: string
}

export const resetGiftTargetPerson = createAction(GIFT_MANAGE_ACTION_TYPE.RESET_TARGET_PERSON_GIFT)

export const addTargetPerson = createAsyncThunk<TargetPersonType, TargetPersonType>(
  GIFT_MANAGE_ACTION_TYPE.ADD_TARGET_PERSON_GIFT,
  async (addParams) => {
    return addParams
    // try {
    // const res = await services.ListMyPoints( addParams )
    // if (res?.code === 200) {
    //   return res
    // } else {
    //   // throw res.message
    //   return rejectWithValue(JSON.stringify(res.message))
    // }
    // } catch (error) {
    // if (!error.response) {
    //   throw error
    // }
    // return rejectWithValue(error.response.data)
    // }
  }
)

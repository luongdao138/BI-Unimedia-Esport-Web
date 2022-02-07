import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as services from '@services/gift.service'
import { GIFT_MANAGE_ACTION_TYPE } from './types'
import {
  VerifySnsUrlParams,
  VerifySnsUrlResponse,
  AddNewGiftMasterResponse,
  AddNewGiftMasterRequestParams,
  GetAllGiftMasterResponse,
  GetAllGiftMasterRequestParams,
} from '@services/gift.service'

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
  }
)

export const checkSnsUrl = createAsyncThunk<VerifySnsUrlResponse, VerifySnsUrlParams>(
  GIFT_MANAGE_ACTION_TYPE.CHECK_SNS_URL,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.verifySnsUrl(requestParams)
      if (res?.code === 200) {
        return { ...res, sns_url: requestParams?.sns_url }
      } else {
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const resetSnsStateCheck = createAction(GIFT_MANAGE_ACTION_TYPE.RESET_CHECK_SNS_URL)

export const addNewGiftMaster = createAsyncThunk<AddNewGiftMasterResponse, AddNewGiftMasterRequestParams>(
  GIFT_MANAGE_ACTION_TYPE.ADD_NEW_GIFT_MASTER,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.addNewGiftMaster(requestParams)
      if (res?.code === 200) {
        return res
      } else {
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllGiftMaster = createAsyncThunk<GetAllGiftMasterResponse, GetAllGiftMasterRequestParams>(
  GIFT_MANAGE_ACTION_TYPE.GET_ALL_GIFT_MASTER,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.getAllGiftMaster(requestParams)
      if (res?.code === 200) {
        return res
      } else {
        return rejectWithValue(JSON.stringify(res.message))
      }
    } catch (error) {
      if (!error.response) {
        throw error
      }
      return rejectWithValue(error.response.data)
    }
  }
)

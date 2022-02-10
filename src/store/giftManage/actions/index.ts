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
  GiftMasterType,
  CreateNewGiftGroupResponse,
  CreateNewGiftGroupRequestBody,
  GetAllGiftGroupResponse,
  GetAllGiftGroupRequest,
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

export const addGiftMasterToNewGroup = createAction<{ data: GiftMasterType }>(GIFT_MANAGE_ACTION_TYPE.NEW_GROUP_ADD_GIFT_MASTER)
export const removeGiftMasterFromNewGroup = createAction<{ data: GiftMasterType }>(GIFT_MANAGE_ACTION_TYPE.NEW_GROUP_REMOVE_GIFT_MASTER)

export const createNewGiftGroup = createAsyncThunk<CreateNewGiftGroupResponse, CreateNewGiftGroupRequestBody>(
  GIFT_MANAGE_ACTION_TYPE.CREATE_NEW_GIFT_GROUP,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.createNewGiftGroup(requestParams)
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

export const getGiftGroupList = createAsyncThunk<GetAllGiftGroupResponse, GetAllGiftGroupRequest>(
  GIFT_MANAGE_ACTION_TYPE.GET_GIFT_GROUP,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.getAllGiftGroup(requestParams)
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

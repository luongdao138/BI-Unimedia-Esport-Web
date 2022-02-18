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
  GetGiftGroupDetailRequestParams,
  GetGiftGroupDetailResponse,
  DeleteGiftGroupRequestParams,
} from '@services/gift.service'

export type TargetPersonType = {
  id: string
  target_value: string
  target_name: string
  sns_url: string
}

export type AddGiftMasterRequestType = {
  index?: number
  item?: TargetPersonType
}

export const resetGiftTargetPerson = createAction(GIFT_MANAGE_ACTION_TYPE.RESET_TARGET_PERSON_GIFT)

export const addTargetPerson = createAsyncThunk<TargetPersonType, TargetPersonType>(
  GIFT_MANAGE_ACTION_TYPE.ADD_TARGET_PERSON_GIFT,
  async (addParams) => {
    return addParams
  }
)
export const updateTargetPerson = createAsyncThunk<TargetPersonType, TargetPersonType>(
  GIFT_MANAGE_ACTION_TYPE.UPDATE_TARGET_PERSON_GIFT,
  async (updateParams) => {
    return updateParams
  }
)
export const deleteTargetPerson = createAsyncThunk<string, string>(GIFT_MANAGE_ACTION_TYPE.DELETE_TARGET_PERSON_GIFT, async (id) => {
  return id
})

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

export const addNewGiftMaster = createAsyncThunk<AddNewGiftMasterResponse, AddNewGiftMasterRequestParams>(
  GIFT_MANAGE_ACTION_TYPE.ADD_NEW_GIFT_MASTER,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.addNewGiftMaster(requestParams)
      if (res?.code === 200) {
        return res
      } else {
        return rejectWithValue(res.data.url)
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

export const resetGiftGroupMasterList = createAction(GIFT_MANAGE_ACTION_TYPE.RESET_GROUP_MASTER_LIST)

export const deleteGiftMasterFromLocalList = createAction<{ data: TargetPersonType }>(
  GIFT_MANAGE_ACTION_TYPE.DELETE_GIFT_MASTER_FROM_LOCAL_LIST
)

export const getGiftGroupDetail = createAsyncThunk<GetGiftGroupDetailResponse, GetGiftGroupDetailRequestParams>(
  GIFT_MANAGE_ACTION_TYPE.GET_GIFT_GROUP_DETAIL,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.getGiftGroupDetail(requestParams)
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

export const deleteGiftGroup = createAsyncThunk<CreateNewGiftGroupResponse, DeleteGiftGroupRequestParams>(
  GIFT_MANAGE_ACTION_TYPE.DELETE_GIFT_GROUP,
  async (requestParams, { rejectWithValue }) => {
    try {
      const res = await services.deleteGiftGroup(requestParams)
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

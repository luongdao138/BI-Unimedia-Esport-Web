import { Meta } from '../actions/types'
import { AnyAction } from '@reduxjs/toolkit'
import _ from 'lodash'

export default function metadataReducer(state: Record<string, Meta> = {}, action: AnyAction): Record<string, Meta> {
  let updated = {}
  const actionType = action.type.split('/').slice(-1)[0]
  const actionName = action.type.replace(`/${actionType}`, '')
  switch (actionType) {
    case 'pending':
      updated = {
        pending: true,
        loaded: false,
        error: false,
      }
      break
    case 'fulfilled':
      updated = {
        pending: false,
        loaded: true,
        error: false,
      }
      break
    case 'rejected':
      updated = {
        pending: false,
        loaded: false,
        error: action.payload?.error,
      }
      break
    case 'clear':
      if (action.payload) {
        return _.omit(state, action.payload)
      }
      return {}
    default:
      return state
  }

  return {
    ...state,
    [actionName]: updated,
  }
}

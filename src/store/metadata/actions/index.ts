import { createAction } from '@reduxjs/toolkit'
import { METADATA_ACTION_TYPE } from './types'

export const clearMetaData = createAction<string | undefined>(METADATA_ACTION_TYPE.CLEAR_METADATA)

/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null
  uuid: string
  avatar?: string | null
  user_name: string
  delete_flag?: boolean | null
}

export type ModelUserConditionInput = {
  uuid?: ModelStringInput | null
  avatar?: ModelStringInput | null
  user_name?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  and?: Array<ModelUserConditionInput | null> | null
  or?: Array<ModelUserConditionInput | null> | null
  not?: ModelUserConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type ModelBooleanInput = {
  ne?: boolean | null
  eq?: boolean | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type User = {
  __typename: 'User'
  id?: string
  uuid?: string
  avatar?: string | null
  user_name?: string
  delete_flag?: boolean | null
  messages?: ModelMessageConnection
  createdAt?: string
  updatedAt?: string
}

export type ModelMessageConnection = {
  __typename: 'ModelMessageConnection'
  items?: Array<Message | null>
  nextToken?: string | null
}

export type Message = {
  __typename: 'Message'
  id?: string
  owner?: string
  text?: string | null
  uuid?: string | null
  video_id?: string
  delete_flag?: boolean | null
  video_time?: number
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  is_premium_number?: number | null
  userId?: string
  giftMasterId?: string | null
  local_id?: string | null
  created_time?: string | null
  parent?: User
  receiver?: GiftMaster
  createdAt?: string
  updatedAt?: string
}

export type GiftMaster = {
  __typename: 'GiftMaster'
  id?: string
  name?: string
  image?: string | null
  master_id?: string
  master_uuid?: string
  delete_flag?: boolean | null
  messages?: ModelMessageConnection
  createdAt?: string
  updatedAt?: string
}

export type UpdateUserInput = {
  id: string
  uuid?: string | null
  avatar?: string | null
  user_name?: string | null
  delete_flag?: boolean | null
}

export type DeleteUserInput = {
  id: string
}

export type CreateGiftMasterInput = {
  id?: string | null
  name: string
  image?: string | null
  master_id: string
  master_uuid: string
  delete_flag?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelGiftMasterConditionInput = {
  name?: ModelStringInput | null
  image?: ModelStringInput | null
  master_id?: ModelStringInput | null
  master_uuid?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelGiftMasterConditionInput | null> | null
  or?: Array<ModelGiftMasterConditionInput | null> | null
  not?: ModelGiftMasterConditionInput | null
}

export type UpdateGiftMasterInput = {
  id: string
  name?: string | null
  image?: string | null
  master_id?: string | null
  master_uuid?: string | null
  delete_flag?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DeleteGiftMasterInput = {
  id: string
}

export type CreateMessageInput = {
  id?: string | null
  owner: string
  text?: string | null
  uuid?: string | null
  video_id: string
  delete_flag?: boolean | null
  video_time: number
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  is_premium_number?: number | null
  userId: string
  giftMasterId?: string | null
  local_id?: string | null
  created_time?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelMessageConditionInput = {
  owner?: ModelStringInput | null
  text?: ModelStringInput | null
  uuid?: ModelStringInput | null
  video_id?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  video_time?: ModelIntInput | null
  display_avatar_time?: ModelStringInput | null
  point?: ModelStringInput | null
  use_point_id?: ModelStringInput | null
  is_premium?: ModelBooleanInput | null
  is_premium_number?: ModelIntInput | null
  userId?: ModelIDInput | null
  giftMasterId?: ModelIDInput | null
  local_id?: ModelStringInput | null
  created_time?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelMessageConditionInput | null> | null
  or?: Array<ModelMessageConditionInput | null> | null
  not?: ModelMessageConditionInput | null
}

export type ModelIntInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type UpdateMessageInput = {
  id: string
  owner?: string | null
  text?: string | null
  uuid?: string | null
  video_id?: string | null
  delete_flag?: boolean | null
  video_time?: number | null
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  is_premium_number?: number | null
  userId?: string | null
  giftMasterId?: string | null
  local_id?: string | null
  created_time?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DeleteMessageInput = {
  id: string
}

export type CreateVideoInput = {
  id?: string | null
  uuid: string
  arn: string
  process_status?: string | null
  video_status?: string | null
  live_start_time?: string | null
}

export type ModelVideoConditionInput = {
  uuid?: ModelStringInput | null
  arn?: ModelStringInput | null
  process_status?: ModelStringInput | null
  video_status?: ModelStringInput | null
  live_start_time?: ModelStringInput | null
  and?: Array<ModelVideoConditionInput | null> | null
  or?: Array<ModelVideoConditionInput | null> | null
  not?: ModelVideoConditionInput | null
}

export type Video = {
  __typename: 'Video'
  id?: string
  uuid?: string
  arn?: string
  process_status?: string | null
  video_status?: string | null
  live_start_time?: string | null
  createdAt?: string
  updatedAt?: string
}

export type UpdateVideoInput = {
  id: string
  uuid?: string | null
  arn?: string | null
  process_status?: string | null
  video_status?: string | null
  live_start_time?: string | null
}

export type DeleteVideoInput = {
  id: string
}

export type CreateChannelInput = {
  id?: string | null
  arn: string
  state?: string | null
  alarm_state?: string | null
}

export type ModelChannelConditionInput = {
  arn?: ModelStringInput | null
  state?: ModelStringInput | null
  alarm_state?: ModelStringInput | null
  and?: Array<ModelChannelConditionInput | null> | null
  or?: Array<ModelChannelConditionInput | null> | null
  not?: ModelChannelConditionInput | null
}

export type Channel = {
  __typename: 'Channel'
  id?: string
  arn?: string
  state?: string | null
  alarm_state?: string | null
  createdAt?: string
  updatedAt?: string
}

export type UpdateChannelInput = {
  id: string
  arn?: string | null
  state?: string | null
  alarm_state?: string | null
}

export type DeleteChannelInput = {
  id: string
}

export type CreateCowellRealtimeStatusConnectionsInput = {
  id?: string | null
  connectionId: string
}

export type ModelCowellRealtimeStatusConnectionsConditionInput = {
  connectionId?: ModelStringInput | null
  and?: Array<ModelCowellRealtimeStatusConnectionsConditionInput | null> | null
  or?: Array<ModelCowellRealtimeStatusConnectionsConditionInput | null> | null
  not?: ModelCowellRealtimeStatusConnectionsConditionInput | null
}

export type CowellRealtimeStatusConnections = {
  __typename: 'CowellRealtimeStatusConnections'
  id?: string
  connectionId?: string
  createdAt?: string
  updatedAt?: string
}

export type UpdateCowellRealtimeStatusConnectionsInput = {
  id: string
  connectionId?: string | null
}

export type DeleteCowellRealtimeStatusConnectionsInput = {
  id: string
}

export type ModelUserFilterInput = {
  id?: ModelIDInput | null
  uuid?: ModelStringInput | null
  avatar?: ModelStringInput | null
  user_name?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  and?: Array<ModelUserFilterInput | null> | null
  or?: Array<ModelUserFilterInput | null> | null
  not?: ModelUserFilterInput | null
}

export type ModelUserConnection = {
  __typename: 'ModelUserConnection'
  items?: Array<User | null>
  nextToken?: string | null
}

export type ModelGiftMasterFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  image?: ModelStringInput | null
  master_id?: ModelStringInput | null
  master_uuid?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelGiftMasterFilterInput | null> | null
  or?: Array<ModelGiftMasterFilterInput | null> | null
  not?: ModelGiftMasterFilterInput | null
}

export type ModelGiftMasterConnection = {
  __typename: 'ModelGiftMasterConnection'
  items?: Array<GiftMaster | null>
  nextToken?: string | null
}

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null
  owner?: ModelStringInput | null
  text?: ModelStringInput | null
  uuid?: ModelStringInput | null
  video_id?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  video_time?: ModelIntInput | null
  display_avatar_time?: ModelStringInput | null
  point?: ModelStringInput | null
  use_point_id?: ModelStringInput | null
  is_premium?: ModelBooleanInput | null
  is_premium_number?: ModelIntInput | null
  userId?: ModelIDInput | null
  giftMasterId?: ModelIDInput | null
  local_id?: ModelStringInput | null
  created_time?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelMessageFilterInput | null> | null
  or?: Array<ModelMessageFilterInput | null> | null
  not?: ModelMessageFilterInput | null
}

export type ModelVideoFilterInput = {
  id?: ModelIDInput | null
  uuid?: ModelStringInput | null
  arn?: ModelStringInput | null
  process_status?: ModelStringInput | null
  video_status?: ModelStringInput | null
  live_start_time?: ModelStringInput | null
  and?: Array<ModelVideoFilterInput | null> | null
  or?: Array<ModelVideoFilterInput | null> | null
  not?: ModelVideoFilterInput | null
}

export type ModelVideoConnection = {
  __typename: 'ModelVideoConnection'
  items?: Array<Video | null>
  nextToken?: string | null
}

export type ModelChannelFilterInput = {
  id?: ModelIDInput | null
  arn?: ModelStringInput | null
  state?: ModelStringInput | null
  alarm_state?: ModelStringInput | null
  and?: Array<ModelChannelFilterInput | null> | null
  or?: Array<ModelChannelFilterInput | null> | null
  not?: ModelChannelFilterInput | null
}

export type ModelChannelConnection = {
  __typename: 'ModelChannelConnection'
  items?: Array<Channel | null>
  nextToken?: string | null
}

export type ModelCowellRealtimeStatusConnectionsFilterInput = {
  id?: ModelIDInput | null
  connectionId?: ModelStringInput | null
  and?: Array<ModelCowellRealtimeStatusConnectionsFilterInput | null> | null
  or?: Array<ModelCowellRealtimeStatusConnectionsFilterInput | null> | null
  not?: ModelCowellRealtimeStatusConnectionsFilterInput | null
}

export type ModelCowellRealtimeStatusConnectionsConnection = {
  __typename: 'ModelCowellRealtimeStatusConnectionsConnection'
  items?: Array<CowellRealtimeStatusConnections | null>
  nextToken?: string | null
}

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelStringKeyConditionInput = {
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
}

export type ModelIntKeyConditionInput = {
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type CreateUserMutationVariables = {
  input?: CreateUserInput
  condition?: ModelUserConditionInput | null
}

export type CreateUserMutation = {
  createUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateUserMutationVariables = {
  input?: UpdateUserInput
  condition?: ModelUserConditionInput | null
}

export type UpdateUserMutation = {
  updateUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteUserMutationVariables = {
  input?: DeleteUserInput
  condition?: ModelUserConditionInput | null
}

export type DeleteUserMutation = {
  deleteUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateGiftMasterMutationVariables = {
  input?: CreateGiftMasterInput
  condition?: ModelGiftMasterConditionInput | null
}

export type CreateGiftMasterMutation = {
  createGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateGiftMasterMutationVariables = {
  input?: UpdateGiftMasterInput
  condition?: ModelGiftMasterConditionInput | null
}

export type UpdateGiftMasterMutation = {
  updateGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteGiftMasterMutationVariables = {
  input?: DeleteGiftMasterInput
  condition?: ModelGiftMasterConditionInput | null
}

export type DeleteGiftMasterMutation = {
  deleteGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateMessageMutationVariables = {
  input?: CreateMessageInput
  condition?: ModelMessageConditionInput | null
}

export type CreateMessageMutation = {
  createMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateMessageMutationVariables = {
  input?: UpdateMessageInput
  condition?: ModelMessageConditionInput | null
}

export type UpdateMessageMutation = {
  updateMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteMessageMutationVariables = {
  input?: DeleteMessageInput
  condition?: ModelMessageConditionInput | null
}

export type DeleteMessageMutation = {
  deleteMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateVideoMutationVariables = {
  input?: CreateVideoInput
  condition?: ModelVideoConditionInput | null
}

export type CreateVideoMutation = {
  createVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateVideoMutationVariables = {
  input?: UpdateVideoInput
  condition?: ModelVideoConditionInput | null
}

export type UpdateVideoMutation = {
  updateVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteVideoMutationVariables = {
  input?: DeleteVideoInput
  condition?: ModelVideoConditionInput | null
}

export type DeleteVideoMutation = {
  deleteVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateChannelMutationVariables = {
  input?: CreateChannelInput
  condition?: ModelChannelConditionInput | null
}

export type CreateChannelMutation = {
  createChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateChannelMutationVariables = {
  input?: UpdateChannelInput
  condition?: ModelChannelConditionInput | null
}

export type UpdateChannelMutation = {
  updateChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteChannelMutationVariables = {
  input?: DeleteChannelInput
  condition?: ModelChannelConditionInput | null
}

export type DeleteChannelMutation = {
  deleteChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type CreateCowellRealtimeStatusConnectionsMutationVariables = {
  input?: CreateCowellRealtimeStatusConnectionsInput
  condition?: ModelCowellRealtimeStatusConnectionsConditionInput | null
}

export type CreateCowellRealtimeStatusConnectionsMutation = {
  createCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type UpdateCowellRealtimeStatusConnectionsMutationVariables = {
  input?: UpdateCowellRealtimeStatusConnectionsInput
  condition?: ModelCowellRealtimeStatusConnectionsConditionInput | null
}

export type UpdateCowellRealtimeStatusConnectionsMutation = {
  updateCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type DeleteCowellRealtimeStatusConnectionsMutationVariables = {
  input?: DeleteCowellRealtimeStatusConnectionsInput
  condition?: ModelCowellRealtimeStatusConnectionsConditionInput | null
}

export type DeleteCowellRealtimeStatusConnectionsMutation = {
  deleteCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type GetUserQueryVariables = {
  id?: string
}

export type GetUserQuery = {
  getUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListUsersQuery = {
  listUsers?: {
    __typename: 'ModelUserConnection'
    items: Array<{
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetGiftMasterQueryVariables = {
  id?: string
}

export type GetGiftMasterQuery = {
  getGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListGiftMastersQueryVariables = {
  filter?: ModelGiftMasterFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListGiftMastersQuery = {
  listGiftMasters?: {
    __typename: 'ModelGiftMasterConnection'
    items: Array<{
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMessageQueryVariables = {
  id?: string
}

export type GetMessageQuery = {
  getMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListMessagesQuery = {
  listMessages?: {
    __typename: 'ModelMessageConnection'
    items: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text?: string | null
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: number
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      is_premium_number?: number | null
      userId: string
      giftMasterId?: string | null
      local_id?: string | null
      created_time?: string | null
      parent?: {
        __typename: 'User'
        id: string
        uuid: string
        avatar?: string | null
        user_name: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      receiver?: {
        __typename: 'GiftMaster'
        id: string
        name: string
        image?: string | null
        master_id: string
        master_uuid: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVideoQueryVariables = {
  id?: string
}

export type GetVideoQuery = {
  getVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListVideosQueryVariables = {
  filter?: ModelVideoFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListVideosQuery = {
  listVideos?: {
    __typename: 'ModelVideoConnection'
    items: Array<{
      __typename: 'Video'
      id: string
      uuid: string
      arn: string
      process_status?: string | null
      video_status?: string | null
      live_start_time?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetChannelQueryVariables = {
  id?: string
}

export type GetChannelQuery = {
  getChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type ListChannelsQueryVariables = {
  filter?: ModelChannelFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListChannelsQuery = {
  listChannels?: {
    __typename: 'ModelChannelConnection'
    items: Array<{
      __typename: 'Channel'
      id: string
      arn: string
      state?: string | null
      alarm_state?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetCowellRealtimeStatusConnectionsQueryVariables = {
  id?: string
}

export type GetCowellRealtimeStatusConnectionsQuery = {
  getCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type ListCowellRealtimeStatusConnectionssQueryVariables = {
  filter?: ModelCowellRealtimeStatusConnectionsFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListCowellRealtimeStatusConnectionssQuery = {
  listCowellRealtimeStatusConnectionss?: {
    __typename: 'ModelCowellRealtimeStatusConnectionsConnection'
    items: Array<{
      __typename: 'CowellRealtimeStatusConnections'
      id: string
      connectionId: string
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetUsersByUuidQueryVariables = {
  uuid?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetUsersByUuidQuery = {
  getUsersByUuid?: {
    __typename: 'ModelUserConnection'
    items: Array<{
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetReceiverByUuidQueryVariables = {
  master_uuid?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelGiftMasterFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetReceiverByUuidQuery = {
  getReceiverByUuid?: {
    __typename: 'ModelGiftMasterConnection'
    items: Array<{
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMessagesByVideoIdQueryVariables = {
  video_id?: string | null
  created_time?: ModelStringKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetMessagesByVideoIdQuery = {
  getMessagesByVideoId?: {
    __typename: 'ModelMessageConnection'
    items: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text?: string | null
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: number
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      is_premium_number?: number | null
      userId: string
      giftMasterId?: string | null
      local_id?: string | null
      created_time?: string | null
      parent?: {
        __typename: 'User'
        id: string
        uuid: string
        avatar?: string | null
        user_name: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      receiver?: {
        __typename: 'GiftMaster'
        id: string
        name: string
        image?: string | null
        master_id: string
        master_uuid: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMessagesByVideoIdWithSortQueryVariables = {
  video_id?: string | null
  video_time?: ModelIntKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetMessagesByVideoIdWithSortQuery = {
  getMessagesByVideoIdWithSort?: {
    __typename: 'ModelMessageConnection'
    items: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text?: string | null
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: number
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      is_premium_number?: number | null
      userId: string
      giftMasterId?: string | null
      local_id?: string | null
      created_time?: string | null
      parent?: {
        __typename: 'User'
        id: string
        uuid: string
        avatar?: string | null
        user_name: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      receiver?: {
        __typename: 'GiftMaster'
        id: string
        name: string
        image?: string | null
        master_id: string
        master_uuid: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetMessagesByVideoByPremiumQueryVariables = {
  video_id?: string | null
  is_premium_number?: ModelIntKeyConditionInput | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetMessagesByVideoByPremiumQuery = {
  getMessagesByVideoByPremium?: {
    __typename: 'ModelMessageConnection'
    items: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text?: string | null
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: number
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      is_premium_number?: number | null
      userId: string
      giftMasterId?: string | null
      local_id?: string | null
      created_time?: string | null
      parent?: {
        __typename: 'User'
        id: string
        uuid: string
        avatar?: string | null
        user_name: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      receiver?: {
        __typename: 'GiftMaster'
        id: string
        name: string
        image?: string | null
        master_id: string
        master_uuid: string
        delete_flag?: boolean | null
        createdAt: string
        updatedAt: string
      } | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVideosByUuidQueryVariables = {
  uuid?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelVideoFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetVideosByUuidQuery = {
  getVideosByUuid?: {
    __typename: 'ModelVideoConnection'
    items: Array<{
      __typename: 'Video'
      id: string
      uuid: string
      arn: string
      process_status?: string | null
      video_status?: string | null
      live_start_time?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetVideoByUuidQueryVariables = {
  uuid?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelVideoFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetVideoByUuidQuery = {
  getVideoByUuid?: {
    __typename: 'ModelVideoConnection'
    items: Array<{
      __typename: 'Video'
      id: string
      uuid: string
      arn: string
      process_status?: string | null
      video_status?: string | null
      live_start_time?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type GetChannelByArnQueryVariables = {
  arn?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelChannelFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetChannelByArnQuery = {
  getChannelByArn?: {
    __typename: 'ModelChannelConnection'
    items: Array<{
      __typename: 'Channel'
      id: string
      arn: string
      state?: string | null
      alarm_state?: string | null
      createdAt: string
      updatedAt: string
    } | null>
    nextToken?: string | null
  } | null
}

export type OnCreateUserSubscription = {
  onCreateUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateUserSubscription = {
  onUpdateUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteUserSubscription = {
  onDeleteUser?: {
    __typename: 'User'
    id: string
    uuid: string
    avatar?: string | null
    user_name: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateGiftMasterSubscription = {
  onCreateGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateGiftMasterSubscription = {
  onUpdateGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteGiftMasterSubscription = {
  onDeleteGiftMaster?: {
    __typename: 'GiftMaster'
    id: string
    name: string
    image?: string | null
    master_id: string
    master_uuid: string
    delete_flag?: boolean | null
    messages?: {
      __typename: 'ModelMessageConnection'
      items: Array<{
        __typename: 'Message'
        id: string
        owner: string
        text?: string | null
        uuid?: string | null
        video_id: string
        delete_flag?: boolean | null
        video_time: number
        display_avatar_time?: string | null
        point?: string | null
        use_point_id?: string | null
        is_premium?: boolean | null
        is_premium_number?: number | null
        userId: string
        giftMasterId?: string | null
        local_id?: string | null
        created_time?: string | null
        createdAt: string
        updatedAt: string
      } | null>
      nextToken?: string | null
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateMessageSubscription = {
  onCreateMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateMessageSubscription = {
  onUpdateMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteMessageSubscription = {
  onDeleteMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text?: string | null
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: number
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    is_premium_number?: number | null
    userId: string
    giftMasterId?: string | null
    local_id?: string | null
    created_time?: string | null
    parent?: {
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    receiver?: {
      __typename: 'GiftMaster'
      id: string
      name: string
      image?: string | null
      master_id: string
      master_uuid: string
      delete_flag?: boolean | null
      messages?: {
        __typename: 'ModelMessageConnection'
        nextToken?: string | null
      } | null
      createdAt: string
      updatedAt: string
    } | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateVideoSubscription = {
  onCreateVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateVideoSubscription = {
  onUpdateVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteVideoSubscription = {
  onDeleteVideo?: {
    __typename: 'Video'
    id: string
    uuid: string
    arn: string
    process_status?: string | null
    video_status?: string | null
    live_start_time?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateChannelSubscription = {
  onCreateChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateChannelSubscription = {
  onUpdateChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteChannelSubscription = {
  onDeleteChannel?: {
    __typename: 'Channel'
    id: string
    arn: string
    state?: string | null
    alarm_state?: string | null
    createdAt: string
    updatedAt: string
  } | null
}

export type OnCreateCowellRealtimeStatusConnectionsSubscription = {
  onCreateCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateCowellRealtimeStatusConnectionsSubscription = {
  onUpdateCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteCowellRealtimeStatusConnectionsSubscription = {
  onDeleteCowellRealtimeStatusConnections?: {
    __typename: 'CowellRealtimeStatusConnections'
    id: string
    connectionId: string
    createdAt: string
    updatedAt: string
  } | null
}

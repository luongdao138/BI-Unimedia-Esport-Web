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
  items?: Array<Message | null> | null
  nextToken?: string | null
}

export type Message = {
  __typename: 'Message'
  id?: string
  owner?: string
  text?: string
  uuid?: string | null
  video_id?: string
  delete_flag?: boolean | null
  video_time?: string
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  userId?: string
  parent?: User
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

export type CreateMessageInput = {
  id?: string | null
  owner: string
  text: string
  uuid?: string | null
  video_id: string
  delete_flag?: boolean | null
  video_time: string
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  userId: string
}

export type ModelMessageConditionInput = {
  owner?: ModelStringInput | null
  text?: ModelStringInput | null
  uuid?: ModelStringInput | null
  video_id?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  video_time?: ModelStringInput | null
  display_avatar_time?: ModelStringInput | null
  point?: ModelStringInput | null
  use_point_id?: ModelStringInput | null
  is_premium?: ModelBooleanInput | null
  userId?: ModelIDInput | null
  and?: Array<ModelMessageConditionInput | null> | null
  or?: Array<ModelMessageConditionInput | null> | null
  not?: ModelMessageConditionInput | null
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
  video_time?: string | null
  display_avatar_time?: string | null
  point?: string | null
  use_point_id?: string | null
  is_premium?: boolean | null
  userId?: string | null
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
  items?: Array<User | null> | null
  nextToken?: string | null
}

export type ModelMessageFilterInput = {
  id?: ModelIDInput | null
  owner?: ModelStringInput | null
  text?: ModelStringInput | null
  uuid?: ModelStringInput | null
  video_id?: ModelStringInput | null
  delete_flag?: ModelBooleanInput | null
  video_time?: ModelStringInput | null
  display_avatar_time?: ModelStringInput | null
  point?: ModelStringInput | null
  use_point_id?: ModelStringInput | null
  is_premium?: ModelBooleanInput | null
  userId?: ModelIDInput | null
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
  items?: Array<Video | null> | null
  nextToken?: string | null
}

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
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
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    items?: Array<{
      __typename: 'User'
      id: string
      uuid: string
      avatar?: string | null
      user_name: string
      delete_flag?: boolean | null
      createdAt: string
      updatedAt: string
    } | null> | null
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
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    items?: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text: string
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: string
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      userId: string
      createdAt: string
      updatedAt: string
    } | null> | null
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
    items?: Array<{
      __typename: 'Video'
      id: string
      uuid: string
      arn: string
      process_status?: string | null
      video_status?: string | null
      live_start_time?: string | null
      createdAt: string
      updatedAt: string
    } | null> | null
    nextToken?: string | null
  } | null
}

export type GetMessagesByVideoIdQueryVariables = {
  video_id?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelMessageFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type GetMessagesByVideoIdQuery = {
  getMessagesByVideoId?: {
    __typename: 'ModelMessageConnection'
    items?: Array<{
      __typename: 'Message'
      id: string
      owner: string
      text: string
      uuid?: string | null
      video_id: string
      delete_flag?: boolean | null
      video_time: string
      display_avatar_time?: string | null
      point?: string | null
      use_point_id?: string | null
      is_premium?: boolean | null
      userId: string
      createdAt: string
      updatedAt: string
    } | null> | null
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
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    createdAt: string
    updatedAt: string
  } | null
}

export type OnUpdateMessageSubscription = {
  onUpdateMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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
    createdAt: string
    updatedAt: string
  } | null
}

export type OnDeleteMessageSubscription = {
  onDeleteMessage?: {
    __typename: 'Message'
    id: string
    owner: string
    text: string
    uuid?: string | null
    video_id: string
    delete_flag?: boolean | null
    video_time: string
    display_avatar_time?: string | null
    point?: string | null
    use_point_id?: string | null
    is_premium?: boolean | null
    userId: string
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

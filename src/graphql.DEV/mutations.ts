/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      uuid
      avatar
      user_name
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      uuid
      avatar
      user_name
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
      id
      uuid
      avatar
      user_name
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createGiftMaster = /* GraphQL */ `
  mutation CreateGiftMaster($input: CreateGiftMasterInput!, $condition: ModelGiftMasterConditionInput) {
    createGiftMaster(input: $input, condition: $condition) {
      id
      name
      image
      master_id
      master_uuid
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          giftMasterId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateGiftMaster = /* GraphQL */ `
  mutation UpdateGiftMaster($input: UpdateGiftMasterInput!, $condition: ModelGiftMasterConditionInput) {
    updateGiftMaster(input: $input, condition: $condition) {
      id
      name
      image
      master_id
      master_uuid
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          giftMasterId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteGiftMaster = /* GraphQL */ `
  mutation DeleteGiftMaster($input: DeleteGiftMasterInput!, $condition: ModelGiftMasterConditionInput) {
    deleteGiftMaster(input: $input, condition: $condition) {
      id
      name
      image
      master_id
      master_uuid
      delete_flag
      messages {
        items {
          id
          owner
          text
          uuid
          video_id
          delete_flag
          video_time
          display_avatar_time
          point
          use_point_id
          is_premium
          userId
          giftMasterId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
    createMessage(input: $input, condition: $condition) {
      id
      owner
      text
      uuid
      video_id
      delete_flag
      video_time
      display_avatar_time
      point
      use_point_id
      is_premium
      is_premium_number
      userId
      giftMasterId
      local_id
      created_time
      parent {
        id
        uuid
        avatar
        user_name
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiver {
        id
        name
        image
        master_id
        master_uuid
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
    updateMessage(input: $input, condition: $condition) {
      id
      owner
      text
      uuid
      video_id
      delete_flag
      video_time
      display_avatar_time
      point
      use_point_id
      is_premium
      is_premium_number
      userId
      giftMasterId
      local_id
      created_time
      parent {
        id
        uuid
        avatar
        user_name
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiver {
        id
        name
        image
        master_id
        master_uuid
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
    deleteMessage(input: $input, condition: $condition) {
      id
      owner
      text
      uuid
      video_id
      delete_flag
      video_time
      display_avatar_time
      point
      use_point_id
      is_premium
      is_premium_number
      userId
      giftMasterId
      local_id
      created_time
      parent {
        id
        uuid
        avatar
        user_name
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiver {
        id
        name
        image
        master_id
        master_uuid
        delete_flag
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createVideo = /* GraphQL */ `
  mutation CreateVideo($input: CreateVideoInput!, $condition: ModelVideoConditionInput) {
    createVideo(input: $input, condition: $condition) {
      id
      uuid
      arn
      process_status
      video_status
      live_start_time
      createdAt
      updatedAt
    }
  }
`
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo($input: UpdateVideoInput!, $condition: ModelVideoConditionInput) {
    updateVideo(input: $input, condition: $condition) {
      id
      uuid
      arn
      process_status
      video_status
      live_start_time
      createdAt
      updatedAt
    }
  }
`
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo($input: DeleteVideoInput!, $condition: ModelVideoConditionInput) {
    deleteVideo(input: $input, condition: $condition) {
      id
      uuid
      arn
      process_status
      video_status
      live_start_time
      createdAt
      updatedAt
    }
  }
`
export const createChannel = /* GraphQL */ `
  mutation CreateChannel($input: CreateChannelInput!, $condition: ModelChannelConditionInput) {
    createChannel(input: $input, condition: $condition) {
      id
      arn
      state
      alarm_state
      createdAt
      updatedAt
    }
  }
`
export const updateChannel = /* GraphQL */ `
  mutation UpdateChannel($input: UpdateChannelInput!, $condition: ModelChannelConditionInput) {
    updateChannel(input: $input, condition: $condition) {
      id
      arn
      state
      alarm_state
      createdAt
      updatedAt
    }
  }
`
export const deleteChannel = /* GraphQL */ `
  mutation DeleteChannel($input: DeleteChannelInput!, $condition: ModelChannelConditionInput) {
    deleteChannel(input: $input, condition: $condition) {
      id
      arn
      state
      alarm_state
      createdAt
      updatedAt
    }
  }
`
export const createCowellRealtimeStatusConnections = /* GraphQL */ `
  mutation CreateCowellRealtimeStatusConnections(
    $input: CreateCowellRealtimeStatusConnectionsInput!
    $condition: ModelCowellRealtimeStatusConnectionsConditionInput
  ) {
    createCowellRealtimeStatusConnections(input: $input, condition: $condition) {
      id
      connectionId
      createdAt
      updatedAt
    }
  }
`
export const updateCowellRealtimeStatusConnections = /* GraphQL */ `
  mutation UpdateCowellRealtimeStatusConnections(
    $input: UpdateCowellRealtimeStatusConnectionsInput!
    $condition: ModelCowellRealtimeStatusConnectionsConditionInput
  ) {
    updateCowellRealtimeStatusConnections(input: $input, condition: $condition) {
      id
      connectionId
      createdAt
      updatedAt
    }
  }
`
export const deleteCowellRealtimeStatusConnections = /* GraphQL */ `
  mutation DeleteCowellRealtimeStatusConnections(
    $input: DeleteCowellRealtimeStatusConnectionsInput!
    $condition: ModelCowellRealtimeStatusConnectionsConditionInput
  ) {
    deleteCowellRealtimeStatusConnections(input: $input, condition: $condition) {
      id
      connectionId
      createdAt
      updatedAt
    }
  }
`

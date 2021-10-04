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
      userId
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
      userId
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
      userId
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

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
  }
`
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
  }
`
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
  }
`
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo {
    onCreateVideo {
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
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo {
    onUpdateVideo {
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
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo {
    onDeleteVideo {
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

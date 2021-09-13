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

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        uuid
        avatar
        user_name
        delete_flag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      owner
      uuid_user
      message
      video_id
      delete_flag
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
        uuid_user
        message
        video_id
        delete_flag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      uiid
      avatar
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
        uiid
        avatar
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`

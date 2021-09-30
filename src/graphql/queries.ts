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
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
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
export const listVideos = /* GraphQL */ `
  query ListVideos($filter: ModelVideoFilterInput, $limit: Int, $nextToken: String) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        uuid
        arn
        process_status
        video_status
        live_start_time
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getMessagesByVideoId = /* GraphQL */ `
  query GetMessagesByVideoId(
    $video_id: String
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMessagesByVideoId(video_id: $video_id, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`

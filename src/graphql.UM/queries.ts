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
          is_premium_number
          userId
          giftMasterId
          local_id
          created_time
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
export const getGiftMaster = /* GraphQL */ `
  query GetGiftMaster($id: ID!) {
    getGiftMaster(id: $id) {
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
          is_premium_number
          userId
          giftMasterId
          local_id
          created_time
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
export const listGiftMasters = /* GraphQL */ `
  query ListGiftMasters($filter: ModelGiftMasterFilterInput, $limit: Int, $nextToken: String) {
    listGiftMasters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
export const getChannel = /* GraphQL */ `
  query GetChannel($id: ID!) {
    getChannel(id: $id) {
      id
      arn
      state
      alarm_state
      createdAt
      updatedAt
    }
  }
`
export const listChannels = /* GraphQL */ `
  query ListChannels($filter: ModelChannelFilterInput, $limit: Int, $nextToken: String) {
    listChannels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        arn
        state
        alarm_state
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCowellRealtimeStatusConnections = /* GraphQL */ `
  query GetCowellRealtimeStatusConnections($id: ID!) {
    getCowellRealtimeStatusConnections(id: $id) {
      id
      connectionId
      createdAt
      updatedAt
    }
  }
`
export const listCowellRealtimeStatusConnectionss = /* GraphQL */ `
  query ListCowellRealtimeStatusConnectionss($filter: ModelCowellRealtimeStatusConnectionsFilterInput, $limit: Int, $nextToken: String) {
    listCowellRealtimeStatusConnectionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        connectionId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getUsersByUuid = /* GraphQL */ `
  query GetUsersByUuid($uuid: String, $sortDirection: ModelSortDirection, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    getUsersByUuid(uuid: $uuid, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getReceiverByUuid = /* GraphQL */ `
  query GetReceiverByUuid(
    $master_uuid: String
    $sortDirection: ModelSortDirection
    $filter: ModelGiftMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getReceiverByUuid(master_uuid: $master_uuid, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getMessagesByVideoId = /* GraphQL */ `
  query GetMessagesByVideoId(
    $video_id: String
    $created_time: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMessagesByVideoId(
      video_id: $video_id
      created_time: $created_time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const getMessagesByVideoIdWithSort = /* GraphQL */ `
  query GetMessagesByVideoIdWithSort(
    $video_id: String
    $video_time: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMessagesByVideoIdWithSort(
      video_id: $video_id
      video_time: $video_time
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const getMessagesByVideoByPremium = /* GraphQL */ `
  query GetMessagesByVideoByPremium(
    $video_id: String
    $is_premium_number: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getMessagesByVideoByPremium(
      video_id: $video_id
      is_premium_number: $is_premium_number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
export const getVideosByUuid = /* GraphQL */ `
  query GetVideosByUuid(
    $uuid: String
    $sortDirection: ModelSortDirection
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getVideosByUuid(uuid: $uuid, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getVideoByUuid = /* GraphQL */ `
  query GetVideoByUuid($uuid: String, $sortDirection: ModelSortDirection, $filter: ModelVideoFilterInput, $limit: Int, $nextToken: String) {
    getVideoByUuid(uuid: $uuid, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getChannelByArn = /* GraphQL */ `
  query GetChannelByArn(
    $arn: String
    $sortDirection: ModelSortDirection
    $filter: ModelChannelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getChannelByArn(arn: $arn, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        arn
        state
        alarm_state
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`

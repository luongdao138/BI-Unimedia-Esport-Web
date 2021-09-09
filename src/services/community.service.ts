import api from './api'
import { URI } from '@constants/uri.constants'
import { GameTitle } from './game.service'

export enum CommunityFilterOption {
  all = 'all',
  joined = 'joined',
  organized = 'organized',
}

export type CommunitySearchParams = {
  page: number
  filter?: CommunityFilterOption
}

export type CommunityListByUserParams = {
  page: number
  user_code: string
}

export type CommunityListResponse = {
  data: CommunityResponse[]
  meta: PageMeta
}

type GameTitleItem = GameTitle['attributes']

export type CommunityDetail = {
  id: string
  type: string
  attributes: {
    hash_key: string
    id: number
    name: string
    open_range: number
    description: string
    join_condition: number
    area_id: number
    area_name: string
    member_count: number
    cover_image_url: string
    address: string
    is_official: number
    game_titles: GameTitleItem[]
    features: CommunityDetailFeature[]
    admin: {
      id: number
      nickname: string
      user_code: string
      avatar_image_url: string
    }
    co_organizers: {
      id: number
      nickname: string
      user_code: string
      avatar_image_url: string
    }[]
    my_role: number | null
    has_requested: boolean
  }
}

export type CommunityResponse = {
  id: string
  type: string
  attributes: {
    name: string
    description: string
    cover_image_url: string | null
    open_range: number
    is_official: number
    members_avatar: {
      id: number | null
      nickname: string
      profile_image: string | null
    }[]
    features: any[]
    hash_key: string
  }
}

export type CommunityFormParams = {
  name: string
  description: string
  features: number[]
  game_titles: number[]
  open_range: number
  join_condition: number
  area_id: number
  address: string
  cover_image_url: string
}

export interface CreateCommunityResponse {
  hash_key: string
}

export type UpdateParams = {
  hash_key: string
  data: CommunityFormParams
}

export type UpdateCommunityResponse = {
  hash_key: string
}

export type CommunityDetailFeature = {
  id: number
  feature: string
}

export type CommunityFeature = {
  id: string
  type: string
  attributes: {
    feature: string
  }
}

export type CommunityFeaturesResponse = {
  data: CommunityFeature[]
}

export type PageMeta = {
  current_page: number
  per_page: number
  total_count: number
  total_pages: number
}

export enum CommunityMemberRole {
  all = 'all',
  admin = 'admin',
  member = 'member',
  co_organizer = 'moderator',
  leave = 'leave',
  requested = 'requested',
  reported = 'reported',
  system = 'system',
  moderator_member = 'moderator_member',
}

export type CommunityMembersParams = {
  hash_key: string
  role: CommunityMemberRole
  page?: number
}

export type CommunityMember = {
  id: string
  type: string
  attributes: {
    id: number
    user_id: number
    member_role: number
    profile: string
    nickname: string
    user_code: string
  }
}

export type CommunityMembersResponse = {
  data: CommunityMember[]
  meta: PageMeta
}

export type CommunityMembersApproveCancelParams = {
  data: {
    member_ids: number[]
  }
  hash_key: string
}

export type CommunityMemberChangeRoleParams = {
  data: {
    member_id: number
    member_role: number
  }
  hash_key: string
}

export type CommunityMemberRemoveParams = {
  data: {
    member_id: number
  }
  hash_key: string
}

export type TopicGameTitle = {
  id: number
  parent_id?: number
  display_name: string
  short_name: string
  jp_kana_name: string
  en_name: string
  aka: null
  created_at: string
  updated_at: string
  deleted_at: null
  user_id: null
}

export type TopicAttachments = {
  id: number
  file_type: string
  sequence_no: number
  assets_url: string
  thumbnail_url?: string
  bucket_name: string
  message_id?: number
  comment_id?: number
  topic_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at?: string
}

export type LastComment = {
  data: {
    id: string
    type: string
    attributes: {
      id: number
      content: string
      user_id: number
      topic_id: number
      created_at: string
      reply_to_comment_id: string | null
      comment_no: number
      is_liked: boolean
      like_count: number
      is_mine: boolean
      owner_name: string
      owner_profile: string
      attachments: CommentsAttachmentResponse[]
    }
  }
}

export type TopicDetail = {
  id: string
  type: string
  attributes: {
    hash_key: string
    title: string
    content: string
    community_id: number
    created_at: string
    user_id: number
    attachments: TopicAttachments[] | null
    owner_name: string
    owner_email: string
    owner_profile: string
    owner_user_code: string
    like_count: number
    game_title: TopicGameTitle[]
    is_liked: boolean
    member_role: string
    community_name: string
    can_remove: boolean
    last_comment?: LastComment
    comment_count: number
  }
}

export type TopicDetailList = {
  id: string
  type: string
  attributes: {
    hash_key: string
    topic_title: string
    content: string
    community_hash: string
    community_cover: string
    created_at: string
    last_comment_date: string
    user_id: number
    attachments: TopicAttachments[] | null
    owner_name: string
    owner_email: string
    owner_profile: string
    owner_user_code: string
    like_count: number
    game_title: TopicGameTitle[]
    is_liked: boolean
    member_role: string
    comment_count: number
    topic_owner: string
    sequence_no?: number
    is_new: boolean
    unseen_count: number
    community_name: string
    can_remove: boolean
    last_comment?: LastComment
  }
}

export type TopicDetailResponse = {
  data: TopicDetail
}

export type TopicDetailParams = {
  topic_hash: string
  community_hash?: string
}

export type TopicDeleteParams = {
  hash_key: string
  community_hash?: string
}

export type TopicFollowersResponse = {
  data: FollowersTopicResponse[]
  meta: PageMeta
}

export type FollowersTopicResponse = {
  attributes: any
}

export type TopicFollowersParams = {
  page?: number
}

export type CommunityDetailResponse = {
  data: CommunityDetail
}

export type TopicParams = {
  title: string
  content: string
  topic_type: string
  community_hash: string
  attachments?: string
}

export type CreateTopicResponse = {
  data: {
    id: number
    type: string
    attributes: {
      hash_key: string
      community_id: 2
      content: string
      created_at: string
      last_comment_date: string
      like_count: number
      topic_title: string
      community_name: string
      community_cover: any
      comment_count: number
      unseen_count: number
      is_liked: boolean
      topic_owner: string
      owner_name: string
      game_title: any
      last_comment: {
        data: any
      }
      is_mine: boolean
      sequence_no: any
      member_role: string
      is_new: boolean
      can_remove: boolean
    }
  }
}

export type TopicListParams = {
  page: number
  filter: string
  community_hash: string
}

export type TopicListResponse = {
  data: TopicDetailList[]
  meta: PageMeta
}

export type CommunityFollowResponse = {
  data: CommunityDetail
}

export type TopicSearchParams = {
  community_hash: string
  keyword: string
  only_title: string
  page: number
}

export type TopicSearchItem = {
  id: string
  type: string
  attributes: {
    content: string
    created_at: string
    last_comment_date: string
    like_count: number
    topic_title: string
    hash_key: string
    community_hash: string
    community_name: string
    community_cover: string
    comment_count: number
    unseen_count: number
    is_liked: boolean
    topic_owner: string
    owner_name: string
    game_title: string
    last_comment: LastComment
    is_mine: boolean
    sequence_no: any
    member_role: CommunityMemberRole
    is_new: boolean
    can_remove: boolean
  }
}

export type TopicSearchResponse = {
  data: TopicSearchItem[]
  meta: PageMeta
}

export type CommentCreateParams = {
  topic_hash: string
  content: string
  reply_to_comment_hash: string
  attachments: string
}

export type CommentsAttachmentResponse = {
  id: number
  assets_url: string
  comment_id: number
}

export type CommentsResponse = {
  id: string
  type: string
  attributes: {
    id: number
    created_at: string
    comment_no: number
    deleted_at: string
    content: string
    is_mine: true
    attachments: CommentsAttachmentResponse[]
    owner_nickname: string
    user_code: string
    owner_profile: string
    hash_key: string
    reply_to_comment_hash_key: string
    main_comment: {
      id: number
      comment_no: number
      content: string
      owner_nickname: string
      owner_profile: string
      user_code: string
      created_at: string
      assets_url: string
      attachment_id: number
    }
  }
}

export type CommentsListResponse = {
  data: CommentsResponse[]
  meta: PageMeta
}
export type CommentsListParams = {
  hash_key: string
  page?: number
  comment_hash_key?: string
}

export const communityList = async (params: CommunitySearchParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST_PRIVATE, { params })
  return data
}

export const communityListPublic = async (params: CommunitySearchParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST_PUBLIC, { params })
  return data
}

export const communityListByUser = async (params: CommunityListByUserParams): Promise<CommunityListResponse> => {
  const { data } = await api.get<CommunityListResponse>(URI.COMMUNITY_LIST_BY_USER, { params })
  return data
}

export const getTopicFollowers = async (params: TopicFollowersParams): Promise<TopicFollowersResponse> => {
  const { data } = await api.post<TopicFollowersResponse>(URI.TOPICS_FOLLOWERS, params)
  return data
}

export const getCommunityDetail = async (hash_key: string): Promise<CommunityDetailResponse> => {
  const { data } = await api.get<CommunityDetailResponse>(URI.COMMUNITY_DETAIL.replace(/:id/gi, hash_key))
  return data
}

export const createCommunity = async (params: CommunityFormParams): Promise<CreateCommunityResponse> => {
  const { data } = await api.post<CreateCommunityResponse>(URI.COMMUNITY_CREATE, params)
  return data
}

export const updateCommunity = async (params: UpdateParams): Promise<UpdateCommunityResponse> => {
  const { data } = await api.put<UpdateCommunityResponse>(URI.COMMUNITY_UPDATE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const getCommunityFeatures = async (): Promise<CommunityFeaturesResponse> => {
  const { data } = await api.get<CommunityFeaturesResponse>(URI.COMMUNITY_FEATURES)
  return data
}

export const getCommunityMembers = async (params: CommunityMembersParams): Promise<CommunityMembersResponse> => {
  const { data } = await api.get<CommunityMembersResponse>(URI.COMMUNITY_MEMBERS.replace(/:id/gi, params.hash_key), { params })
  return data
}

export const approveCommunityMembers = async (params: CommunityMembersApproveCancelParams): Promise<void> => {
  const { data } = await api.post<void>(URI.COMMUNITY_MEMBERS_APPROVE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const cancelCommunityMembers = async (params: CommunityMembersApproveCancelParams): Promise<void> => {
  const { data } = await api.post<void>(URI.COMMUNITY_MEMBERS_CANCEL.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const changeCommunityMemberRole = async (params: CommunityMemberChangeRoleParams): Promise<void> => {
  const { data } = await api.put<void>(URI.COMMUNITY_MEMBER_CHANGE_ROLE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const removeCommunityMember = async (params: CommunityMemberRemoveParams): Promise<void> => {
  const { data } = await api.post<void>(URI.COMMUNITY_MEMBER_REMOVE.replace(/:id/gi, params.hash_key), params.data)
  return data
}

export const closeCommunity = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.COMMUNITY_CLOSE.replace(/:id/gi, hash_key))
  return data
}

export const createTopic = async (params: TopicParams): Promise<CreateTopicResponse> => {
  const { data } = await api.post<CreateTopicResponse>(URI.TOPIC_CREATE, params)
  return data
}

export const getTopicDetail = async (params: TopicDetailParams): Promise<TopicDetailResponse> => {
  const { data } = await api.post<TopicDetailResponse>(URI.TOPICS_DETAILS, params)
  return data
}

export const deleteTopic = async (params: TopicDeleteParams): Promise<void> => {
  const { data } = await api.delete<void>(URI.TOPICS.replace(/:id/gi, params.hash_key))
  return data
}

export const getTopicList = async (params: TopicListParams): Promise<TopicListResponse> => {
  const { data } = await api.post<TopicListResponse>(URI.TOPIC_LIST, params)
  return data
}

export const createTopicComment = async (params: CommentCreateParams): Promise<void> => {
  const { data } = await api.post<void>(URI.TOPIC_COMMENT_CREATE, params)
  return data
}

export const deleteTopicComment = async (hash_key: string): Promise<void> => {
  const { data } = await api.delete<void>(URI.TOPIC_COMMENT_DELETE.replace(/:id/gi, hash_key))
  return data
}

export const searchTopic = async (params: TopicSearchParams): Promise<TopicSearchResponse> => {
  const { data } = await api.post<TopicSearchResponse>(URI.TOPIC_SEARCH, params)
  return data
}

export const followCommunity = async (hash_key: string): Promise<CommunityFollowResponse> => {
  const { data } = await api.post<CommunityFollowResponse>(URI.COMMUNITY_FOLLOW.replace(/:id/gi, hash_key))
  return data
}

export const unfollowCommunity = async (hash_key: string): Promise<void> => {
  const { data } = await api.post<void>(URI.COMMUNITY_UNFOLLOW.replace(/:id/gi, hash_key))
  return data
}

export const getCommentsListPage = async (params: CommentsListParams): Promise<CommentsListResponse> => {
  const { data } = await api.get<CommentsListResponse>(URI.COMMUNITY_COMMENTS_LIST, { params })
  return data
}

export const getCommentsList = async (params: CommentsListParams): Promise<CommentsListResponse> => {
  const { data } = await api.get<CommentsListResponse>(URI.COMMUNITY_COMMENTS_LIST, { params })
  return data
}

export const getCommentsListNext = async (params: CommentsListParams): Promise<CommentsListResponse> => {
  const { data } = await api.get<CommentsListResponse>(URI.COMMUNITY_COMMENTS_LIST, { params })
  return data
}

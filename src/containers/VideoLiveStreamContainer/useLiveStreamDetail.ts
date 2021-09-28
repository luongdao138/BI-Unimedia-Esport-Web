import { FollowChannelParams, ListArchivedVideoStreamParams, ReactionUserParams } from '@services/liveStreamDetail.service'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import liveStreamDetail from '@store/liveStreamDetail'
// import { VideoDetailParams } from '@services/videoTop.services'
// import videoTop from '@store/videoTop'

// const actionsVideoTop = videoTop.actions
const { selectors, actions } = liveStreamDetail
const _getListArchivedVideoStreamMeta = createMetaSelector(actions.getListArchivedVideoStream)
const _getRelatedVideoStreamMeta = createMetaSelector(actions.getListRelatedVideoStream)
const _reactionVideoStreamMeta = createMetaSelector(actions.reactionVideoStream)
const _followChannelMeta = createMetaSelector(actions.followChannelAction)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useLiveStreamDetail = () => {
  const dispatch = useAppDispatch()

  const archivedVideoStreamData = useAppSelector(selectors.archivedVideoStream)
  const getArchivedVideoStream = (params: ListArchivedVideoStreamParams) => dispatch(actions.getListArchivedVideoStream(params))
  const meta_archived_video_stream = useAppSelector(_getListArchivedVideoStreamMeta)
  const resetArchivedVideoStream = () => dispatch(actions.resetArchivedVideoStream())

  const relatedVideoStreamData = useAppSelector(selectors.relatedVideoStream)
  const getRelatedVideoStream = (params: ListArchivedVideoStreamParams) => dispatch(actions.getListRelatedVideoStream(params))
  const meta_related_video_stream = useAppSelector(_getRelatedVideoStreamMeta)
  const resetRelatedVideoStream = () => dispatch(actions.resetRelatedVideoStream())

  // const getVideoDetail = (params: VideoDetailParams) => dispatch(actionsVideoTop.videoDetail(params))

  const reactionVideoStreamData = useAppSelector(selectors.reactionVideoData)
  const userReactionVideoStream = (params: ReactionUserParams) => dispatch(actions.reactionVideoStream(params))
  // const userReactionVideoStream = async (params: ReactionUserParams) => {
  //   const result = await dispatch(actions.reactionVideoStream(params))
  //   if (actions.reactionVideoStream.fulfilled.match(result)) {
  //     getVideoDetail({ video_id: `${params?.video_id}` })
  //   }
  // }
  const meta_reaction_video_stream = useAppSelector(_reactionVideoStreamMeta)

  const meta_follow_channel = useAppSelector(_followChannelMeta)
  const userFollowChannel = (params: FollowChannelParams) => {
    dispatch(actions.followChannelAction({ channel_id: params?.channel_id, follow: params?.follow }))
  }
  // const userFollowChannel = async (params: FollowChannelParams) => {
  //   const result = await dispatch(actions.followChannelAction({ channel_id: params?.channel_id, follow: params?.follow }))
  //   if (actions.followChannelAction.fulfilled.match(result)) {
  //     getVideoDetail({ video_id: `${params?.video_id}` })
  //   }
  // }
  const followChannelData = useAppSelector(selectors.followChannelData)

  return {
    meta_archived_video_stream,
    archivedVideoStreamData,
    getArchivedVideoStream,
    resetArchivedVideoStream,

    relatedVideoStreamData,
    getRelatedVideoStream,
    meta_related_video_stream,
    resetRelatedVideoStream,

    reactionVideoStreamData,
    userReactionVideoStream,
    meta_reaction_video_stream,

    meta_follow_channel,
    userFollowChannel,
    followChannelData,
  }
}

export default useLiveStreamDetail

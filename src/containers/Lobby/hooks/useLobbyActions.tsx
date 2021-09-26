import * as actions from '@store/lobby/actions'
import { createMetaSelector } from '@store/metadata/selectors'
import { useAppSelector, useAppDispatch } from '@store/hooks'
import { Meta } from '@store/metadata/actions/types'
import {
  participantSelector,
  allParticipantSelector,
  recommendedParticipantsSelector,
  participantsMeta as pageMeta,
} from '@store/lobby/selectors'
import { PageMeta, ParticipantsItem, ParticipantParams, AllParticipantParams } from '@services/lobby.service'
import { clearMetaData } from '@store/metadata/actions'

const entryMetaSelector = createMetaSelector(actions.entryLobby)
const cancelMetaSelector = createMetaSelector(actions.cancelLobby)
const unjoinMetaSelector = createMetaSelector(actions.unjoinLobby)
const participantsMetaSelector = createMetaSelector(actions.getParticipants)
const allParticipantsMetaSelector = createMetaSelector(actions.getAllParticipants)
const recommendedParticipantsMetaSelector = createMetaSelector(actions.randomizeParticipants)
const confirmParticipantsMetaSelector = createMetaSelector(actions.confirmParticipants)

const useLobbyActions = (): {
  entryMeta: Meta
  cancelMeta: Meta
  unjoinMeta: Meta
  entry: (hash_key: string) => void
  cancel: (hash_key: string) => void
  unjoin: (hash_key: string) => void
  getRecommendedParticipants: (hash_key: string) => void
  confirmParticipants: (hash_key: string, participants_ids: Array<number>) => void
  getParticipants: (params: ParticipantParams) => void
  getAllParticipants: (params: AllParticipantParams) => void
  participants: ParticipantsItem[]
  allParticipants: ParticipantsItem[]
  recommendedParticipants: ParticipantsItem[]
  participantsMeta: Meta
  allParticipantsMeta: Meta
  recommendedParticipantsMeta: Meta
  participantsPageMeta: PageMeta
  resetMeta: () => void
  resetParticipants: () => void
  follow: (userCode: string) => void
  unFollow: (userCode: string) => void
  unBlock: (userCode: string) => void
  confirmParticipantsMeta: Meta
  resetMetaAll: () => void
  resetAllParticipants: () => void
  fetchAndRandomize: (params: AllParticipantParams) => void
} => {
  const dispatch = useAppDispatch()
  const entryMeta = useAppSelector(entryMetaSelector)
  const cancelMeta = useAppSelector(cancelMetaSelector)
  const unjoinMeta = useAppSelector(unjoinMetaSelector)
  const participantsMeta = useAppSelector(participantsMetaSelector)
  const allParticipantsMeta = useAppSelector(allParticipantsMetaSelector)
  const recommendedParticipantsMeta = useAppSelector(recommendedParticipantsMetaSelector)
  const participants = useAppSelector(participantSelector)
  const allParticipants = useAppSelector(allParticipantSelector)
  const recommendedParticipants = useAppSelector(recommendedParticipantsSelector)
  const participantsPageMeta = useAppSelector(pageMeta)
  const confirmParticipantsMeta = useAppSelector(confirmParticipantsMetaSelector)
  const fetchAndRandomize = (params: AllParticipantParams) => dispatch(actions.fetchBeforeRandomize(params))

  const entry = (hash_key: string) => {
    dispatch(actions.entryLobby(hash_key))
  }
  const cancel = (hash_key: string) => {
    dispatch(actions.cancelLobby(hash_key))
  }
  const unjoin = (hash_key: string) => {
    dispatch(actions.unjoinLobby(hash_key))
  }
  const getParticipants = (params: ParticipantParams) => {
    dispatch(actions.getParticipants(params))
  }
  const getAllParticipants = (params: AllParticipantParams) => {
    dispatch(actions.getAllParticipants(params))
  }
  const getRecommendedParticipants = (hash_key: string) => {
    dispatch(actions.randomizeParticipants(hash_key))
  }
  const confirmParticipants = (hash_key: string, participants_ids: Array<number>) => {
    const params = {
      hash_key: hash_key,
      data: {
        participant_ids: participants_ids,
      },
    }
    dispatch(actions.confirmParticipants(params))
  }
  const follow = (userCode: string) => {
    dispatch(actions.lobbyFollow({ user_code: userCode }))
  }
  const unFollow = (userCode: string) => {
    dispatch(actions.lobbyUnfollow({ user_code: userCode }))
  }
  const unBlock = (userCode: string) => {
    dispatch(actions.lobbyUnblock({ user_code: userCode }))
  }
  const resetMeta = () => dispatch(clearMetaData(actions.getParticipants.typePrefix))
  const resetParticipants = () => dispatch(actions.resetParticipants())

  const resetMetaAll = () => dispatch(clearMetaData(actions.getAllParticipants.typePrefix))
  const resetAllParticipants = () => dispatch(actions.resetAllParticipants())

  return {
    entryMeta,
    cancelMeta,
    unjoinMeta,
    entry,
    cancel,
    unjoin,
    getParticipants,
    getAllParticipants,
    participantsMeta,
    participants,
    getRecommendedParticipants,
    recommendedParticipantsMeta,
    recommendedParticipants,
    fetchAndRandomize,
    confirmParticipants,
    participantsPageMeta,
    resetMeta,
    resetParticipants,
    follow,
    unFollow,
    unBlock,
    confirmParticipantsMeta,
    resetMetaAll,
    resetAllParticipants,
    allParticipants,
    allParticipantsMeta,
  }
}

export default useLobbyActions

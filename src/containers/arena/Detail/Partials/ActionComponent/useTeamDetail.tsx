import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import store from '@store/arena'

const { selectors, actions } = store
const _getMeta = createMetaSelector(actions.getTournamentTeamDetail)
// const _changeMeta = createMetaSelector(actions.changeParticipantName)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useTeamDetail = () => {
  const dispatch = useAppDispatch()
  const teamDetail = useAppSelector(selectors.getTeamDetail)
  const getMeta = useAppSelector(_getMeta)
  //   const changeMeta = useAppSelector(_changeMeta)

  const getTeamDetail = (teamId: number) => dispatch(actions.getTournamentTeamDetail(teamId))
  //   const changeName = (hashKey: string, name: string) => dispatch(actions.changeParticipantName({ hash_key: hashKey, data: { name: name } }))
  const resetMeta = () => dispatch(clearMetaData(actions.getParticipantName.typePrefix))
  const isPending = getMeta.pending
  //   const changeDone = changeMeta.loaded || changeMeta.error

  return { getTeamDetail, resetMeta, isPending, teamDetail }
}

export default useTeamDetail

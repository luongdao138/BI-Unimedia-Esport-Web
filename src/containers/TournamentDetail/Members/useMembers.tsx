import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { Meta } from '@store/metadata/actions/types'

import * as selectors from '@store/tournament/selectors'
import * as actions from '@store/tournament/actions'
import { TournamentDetail } from '@services/tournament.service'

const getMeta = createMetaSelector(actions.getTournamentDetail)

const useMembers = (): { tournament: TournamentDetail; meta: Meta } => {
  const { query } = useRouter()
  const dispatch = useAppDispatch()
  const tournament = useAppSelector(selectors.getTournamentDetail)
  const meta = useAppSelector(getMeta)

  useEffect(() => {
    if (query.hash_key) {
      dispatch(actions.getTournamentDetail(String(query.hash_key)))
    }
  }, [query.hash_key])
  useEffect(() => {
    return function () {
      dispatch(clearMetaData(actions.getTournamentDetail.typePrefix))
    }
  }, [])

  return {
    tournament,
    meta,
  }
}

export default useMembers

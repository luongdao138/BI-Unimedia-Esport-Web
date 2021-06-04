import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import searchStore from '@store/arena'
import { TournamentResponse, TournamentSearchParams } from '@services/arena.service'
import { useEffect } from 'react'
import { Meta } from '@store/metadata/actions/types'
import { PageMeta } from '@services/arena.service'

const { selectors, actions } = searchStore
const getTournamentSearchMeta = createMetaSelector(actions.tournamentSearch)

const useArenaHome = (): {
  arenas: TournamentResponse[]
  meta: Meta
  page: PageMeta
  loadMore: () => void
  handleCreateButton: () => void
} => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const arenas = useAppSelector(selectors.getSearchTournaments)
  const page = useAppSelector(selectors.getSearchTournamentsMeta)
  const meta = useAppSelector(getTournamentSearchMeta)
  const { makeContextualHref } = useContextualRouting()
  const tournamentSearch = (param: TournamentSearchParams) => dispatch(actions.tournamentSearch(param))
  const resetMeta = () => dispatch(clearMetaData(actions.tournamentSearch.typePrefix))
  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      tournamentSearch({ page: page.current_page + 1, keyword: '' })
    }
  }
  useEffect(() => {
    tournamentSearch({ page: 1, keyword: '' })
    return () => resetMeta()
  }, [])
  const handleCreateButton = () => router.push(makeContextualHref({ pathName: '/arena/create' }), '#arena/create', { shallow: true })
  return { arenas, meta, page, loadMore, handleCreateButton }
}

export default useArenaHome

import { useEffect, useState } from 'react'
import UserSearchContainer from '@containers/Search/UserSearch'
import TournamentSearchContainer from '@containers/Search/TournamentSearch'
import MainLayout from '@layouts/MainLayout'
import { searchTypes } from '@constants/common.constants'
import { useRouter } from 'next/router'
import _ from 'lodash'

const SearchPage = () => {
  const router = useRouter()
  const [type, setType] = useState<number>()

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      setType(Number(router.query.type))
    }
  }, [router.query])

  const renderSwitch = () => {
    switch (type) {
      case searchTypes.USER:
        return <UserSearchContainer />
      case searchTypes.TOURNAMENT:
        return <TournamentSearchContainer />
      default:
        return <></>
    }
  }

  return renderSwitch()
}

SearchPage.Layout = MainLayout

export default SearchPage

import CommunityContainer from '@containers/Community'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { CommunityFilterOption } from '@services/community.service'

const CommunityPage: PageWithLayoutType = () => {
  const router = useRouter()
  const filter = _.get(router, 'query.filter', '') as string
  return (
    <MainLayout loginRequired={false} patternBg={true}>
      <CommunityContainer filter={formatFilter(filter)} />
    </MainLayout>
  )
}

function formatFilter(filterText: string) {
  if (!_.isString(filterText)) return CommunityFilterOption.all
  const possibleFilters = ['all', 'joined', 'organized']
  if (possibleFilters.includes(filterText)) {
    return filterText as CommunityFilterOption
  }
  return CommunityFilterOption.all
}

export default CommunityPage

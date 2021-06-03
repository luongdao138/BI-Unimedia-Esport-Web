import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ButtonPrimary from '@components/ButtonPrimary'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'

const TournamentPage: PageWithLayoutType = () => {
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()

  return (
    <div>
      Tournaments{' '}
      <ButtonPrimary
        round
        gradient={false}
        onClick={() => router.push(makeContextualHref({ pathName: '/arena/create' }), '#arena/create', { shallow: true })}
      >
        キャンセル
      </ButtonPrimary>
    </div>
  )
}

TournamentPage.Layout = MainLayout

export default TournamentPage

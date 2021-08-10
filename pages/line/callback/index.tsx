import FullScreenLoader from '@components/FullScreenLoader'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

// eslint-disable-next-line @typescript-eslint/ban-types
export const getServerSideProps: GetServerSideProps<{}, ParsedUrlQuery> = async () => {
  return { props: {} }
}

const LineCallbackPage: React.FC = () => {
  return <FullScreenLoader open />
}

export default LineCallbackPage

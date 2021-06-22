import Custom404Container from '@containers/Custom404'
import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'

const Custom404: PageWithLayoutType = () => {
  return (
    <PlainLayout patternBg={true}>
      <Custom404Container />
    </PlainLayout>
  )
}

export default Custom404

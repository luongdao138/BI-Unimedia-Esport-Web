import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import React from 'react'
import { Box, Theme, makeStyles } from '@material-ui/core'

export type BannerDataProps = {
  id: number
  cover: string
  title: string
}
type BannerCarouselProps = {
  data: Array<BannerDataProps>
}
function Pagination(props: { centerSlideDataIndex: number; data: Array<BannerDataProps> }) {
  const classes = useStyles()
  const { centerSlideDataIndex, data } = props
  return (
    <Box className={classes.paginationContainer}>
      {data.map((_, index) => {
        const isCenterSlide = centerSlideDataIndex === index
        return (
          <div
            key={index}
            style={{
              height: 10,
              width: isCenterSlide ? 30 : 10,
              borderRadius: 10,
              background: isCenterSlide ? '#FF4786' : 'white',
              border: isCenterSlide ? '1px solid #FF4786' : '1px solid white',
              marginLeft: 5,
              marginRight: 5,
            }}
          />
        )
      })}
    </Box>
  )
}
const SlideItem = React.memo(function (props: StackedCarouselSlideProps) {
  const { data, dataIndex } = props
  const cover = data[dataIndex]?.cover
  const classes = useStyles()
  return (
    <Box className={classes.sliderContainer} key={data[dataIndex].id}>
      <img className={classes.sliderStyle} draggable={false} src={cover} />
    </Box>
  )
})
const BannerCarousel: React.FC<BannerCarouselProps> = ({ data }) => {
  const ref = React.useRef<any>()
  const classes = useStyles()
  const [centerSlideDataIndex, setCenterSlideDataIndex] = React.useState(0)
  const onCenterSlideDataIndexChange = (activeSlide: number) => {
    setCenterSlideDataIndex(activeSlide)
  }
  return (
    <Box className={classes.container}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5
          if (parentWidth <= 1440) currentVisibleSlide = 5
          else if (parentWidth <= 1080) currentVisibleSlide = 1
          return (
            <StackedCarousel
              ref={carouselRef}
              fadeDistance={0.5}
              customScales={[1, 0.85, 0.7, 0.55]}
              data={data}
              carouselWidth={parentWidth}
              slideWidth={750}
              slideComponent={SlideItem}
              maxVisibleSlide={5}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
              onActiveSlideChange={onCenterSlideDataIndexChange}
            />
          )
        }}
      />
      <Fab className={classes.buttonLeftContainer} onClick={() => ref.current.goBack()}>
        <KeyboardArrowLeftIcon className={classes.iconBtnStyle} />
      </Fab>
      <Fab className={classes.buttonRightContainer} onClick={() => ref.current.goNext()}>
        <KeyboardArrowRightIcon className={classes.iconBtnStyle} />
      </Fab>
      <Pagination centerSlideDataIndex={centerSlideDataIndex} data={data} />
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  sliderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 340,
    userSelect: 'none',
    alignContent: 'center',
  },
  sliderStyle: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10,
  },
  buttonLeftContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 48,
    left: 0,
    top: '50%',
    bottom: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1,
  },
  buttonRightContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 48,
    right: 0,
    top: '50%',
    bottom: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 1,
  },
  iconBtnStyle: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#707070',
  },
}))
export default BannerCarousel

import { StackedCarousel, ResponsiveContainer, StackedCarouselSlideProps } from 'react-stacked-center-carousel'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import React, { useEffect, useRef } from 'react'
import { Box, Theme, makeStyles } from '@material-ui/core'
import { BannerItem } from '@services/videoTop.services'

type BannerCarouselProps = {
  data: Array<BannerItem>
}
function Pagination(props: { centerSlideDataIndex: number; data: Array<BannerItem> }) {
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
  const cover = data[dataIndex]?.url
  const classes = useStyles()
  // const [load, setLoad] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);
  const refImage = useRef<any>(null)

  // const handleLoading = ()=>{
  //   console.log('handleLoading')
  //   setLoad(false)
  // }
  // const handleError = ()=>{
  //   console.log('handleError')
  //   setError(true)
  // }
  return (
    <Box className={classes.sliderContainer} key={data[dataIndex]?.id}>
      <img
        ref={refImage}
        className={classes.sliderStyle}
        draggable={false}
        src={cover}
        // src={load?'/images/live_stream/exelab_thumb.png':'https://i.pinimg.com/564x/09/b5/27/09b52762cc9d8aee221ebb6a062dee98.jpg'}
        // onLoad={handleLoading}
        // onError={handleError}
      />
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

  const playSlider = () => {
    if (ref.current && data.length) {
      if (centerSlideDataIndex + 1 < data.length) {
        // swipe to next slide
        ref.current.swipeTo(1)
      } else {
        // swipe to first slide
        ref.current.swipeTo(-(data.length - 1))
      }
    }
  }

  useEffect(() => {
    setInterval(function () {
      playSlider()
    }, 5000)
  }, [])

  const checkCurrentVisible = () => {
    const length = data.length
    if (length >= 5) return 5
    if (length === 4 || length === 3) return 3
    if (length <= 2) return 1
  }

  return (
    <Box className={classes.container}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = checkCurrentVisible() //1|3|5
          if (parentWidth <= 992) currentVisibleSlide = checkCurrentVisible()
          if (parentWidth <= 768) currentVisibleSlide = 1

          let width = 700
          let height = 340
          if (parentWidth <= 414) {
            width = parentWidth
            height = parentWidth * (17 / 35)
          }
          return (
            <StackedCarousel
              ref={carouselRef}
              fadeDistance={0}
              customScales={[1, 0.78, 0.56, 0.34]} //[1, 0.85]|[1, 0.85, 0.7]|[1, 0.85, 0.7, 0.55]
              data={data}
              carouselWidth={parentWidth}
              slideWidth={width}
              slideComponent={SlideItem}
              maxVisibleSlide={currentVisibleSlide}
              currentVisibleSlide={currentVisibleSlide}
              useGrabCursor={true}
              height={height}
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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    '&:hover': {
      '& .MuiFab-root': {
        opacity: 1,
      },
    },
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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
  },
  buttonLeftContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 48,
    right: 'calc(50% + 326px)',
    top: '50%',
    bottom: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 3,
    backgroundColor: '#fff',
    opacity: 0,
    transition: 'all 500ms',
  },
  buttonRightContainer: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 48,
    left: 'calc(50% + 326px)',
    top: '50%',
    bottom: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 3,
    backgroundColor: '#fff',
    opacity: 0,
    transition: 'all 500ms',
  },
  iconBtnStyle: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#707070',
  },
  [theme.breakpoints.down(415)]: {
    sliderContainer: {
      height: ((window.innerWidth - 48) * 17) / 35,
    },
    buttonLeftContainer: {
      left: 0,
      right: 'auto',
      top: '40%',
      width: 36,
      height: 36,
      opacity: 1,
    },
    buttonRightContainer: {
      right: 0,
      left: 'auto',
      top: '40%',
      width: 36,
      height: 36,
      opacity: 1,
    },
  },
}))
export default BannerCarousel

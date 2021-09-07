import React from 'react'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SliderContainer, OuterContainer } from './index.style'
import Typography from '@material-ui/core/Typography'

interface Props {
  items: string[]
  noTitle?: boolean
}

SwiperCore.use([Pagination, Autoplay])

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LiveSlider = (props: Props) => {
  const { items } = props

  return (
    <OuterContainer className="ratio-container">
      <div className="inner-container">
        <SliderContainer>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            onSlideChange={() =>
              // console.log('slide change')
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              {}
            }
            onSwiper={() =>
              // console.log(swiper)
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              {}
            }
            autoplay={{ delay: 5000 }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item} alt={item} />
                {props.noTitle === true ? null : (
                  <div className="bottom-container">
                    <Typography variant="subtitle1" align="center">
                      eXeLABにようこそ！
                    </Typography>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderContainer>
      </div>
    </OuterContainer>
  )
}

export default LiveSlider

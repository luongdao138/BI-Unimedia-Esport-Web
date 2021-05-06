import { Swiper, SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core/styles'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import React, { ReactElement } from 'react'

const useStyles = makeStyles(() => ({
  wrap: {},
}))

const ESSlide: React.FC<{ items: ReactElement[] }> = ({ items, ...rest }) => {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ...props } = rest
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={16}
      {...props}
      className={classes.wrap}
    >
      {items.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>
      })}
    </Swiper>
  )
}

export default ESSlide

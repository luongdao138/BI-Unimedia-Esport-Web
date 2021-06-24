import { SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core/styles'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

const useStyles = makeStyles(() => ({
  itemWrap: { marginTop: 0 },
}))

const ESSlideItem: React.FC = ({ children, ...rest }) => {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <SwiperSlide {...rest} className={classes.itemWrap}>
      {children}
    </SwiperSlide>
  )
}

ESSlideItem.defaultProps = {}
export default ESSlideItem

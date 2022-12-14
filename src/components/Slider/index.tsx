import React, { ReactElement, useRef } from 'react'
import { Typography, Box, Link, Theme, Icon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import { Meta } from '@store/metadata/actions/types'
SwiperCore.use([Navigation])

const SMALL_WIDTH = 84

const ESSlide: React.FC<{
  items: ReactElement[]
  title?: string
  moreLink?: string
  navigation?: boolean
  slidesPerView?: number | 'auto'
  breakpoints?: any
  containerClass?: string
  smallSliderButton?: boolean
  meta?: Meta
  noItemsMessage?: string
}> = ({ items, navigation, slidesPerView, breakpoints, containerClass, smallSliderButton, meta, noItemsMessage, ...rest }) => {
  const { t } = useTranslation(['common'])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, moreLink, ...props } = rest

  const classes = useStyles({ slidesPerView })
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className={`slideWrap ${containerClass}`}>
      {title && (
        <Typography className={classes.containerStart} variant="h3" gutterBottom>
          {title}
        </Typography>
      )}
      <Swiper
        slidesPerView={slidesPerView}
        slidesPerGroup={1}
        spaceBetween={0}
        {...props}
        className={classes.wrap}
        breakpoints={breakpoints}
        onSwiper={(swiper) => {
          // Delay execution for the refs to be defined
          setTimeout(() => {
            if (swiper) {
              if (swiper.params) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.prevEl = prevRef.current
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                swiper.params.navigation.nextEl = nextRef.current
              }
              if (swiper.navigation) {
                swiper.navigation.destroy()
                swiper.navigation.init()
                swiper.navigation.update()
              }
            }
          })
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide key={index} className={classes.slideWidth}>
              {item}
            </SwiperSlide>
          )
        })}

        {meta && meta.loaded && !items.length && noItemsMessage && (
          <Box display="flex" py={3} justifyContent="center" alignItems="center">
            <Typography>{noItemsMessage}</Typography>
          </Box>
        )}

        {navigation && (
          <>
            <div ref={prevRef} className={`${classes.sliderButtonPrev} ${smallSliderButton ? classes.sliderButtonSmall : ''}`}>
              <Icon classes={{ root: classes.fas }} className="fas fa-chevron-left" fontSize="small" />
            </div>
            <div ref={nextRef} className={`${classes.sliderButtonNext} ${smallSliderButton ? classes.sliderButtonSmall : ''}`}>
              <Icon classes={{ root: classes.fas }} className="fas fa-chevron-right" fontSize="small" />
            </div>
          </>
        )}

        {moreLink && (
          <Box slot="container-end" display="flex" justifyContent="flex-end">
            <Link href={moreLink} className={classes.moreLink} underline={'none'}>
              <Typography>
                {t('common:common.see_more')}
                <Icon classes={{ root: classes.moreIcon }} className="fas fa-chevron-right" fontSize="small" />
              </Typography>
            </Link>
          </Box>
        )}
      </Swiper>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    paddingLeft: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  sliderButtonNext: {
    width: 30,
    height: 160,
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    borderRadius: 4,
    zIndex: 1,
    background: Colors.black_opacity[70],
    backdropFilter: 'blur(1px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-80px)',
    visibility: 'visible',
    opacity: 1,
  },
  sliderButtonPrev: {
    width: 30,
    height: 160,
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.white_opacity[30],
    borderRadius: 4,
    zIndex: 1,
    background: Colors.black_opacity[70],
    backdropFilter: 'blur(1px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    left: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-80px)',
    visibility: 'visible',
    opacity: 1,
  },
  sliderButtonSmall: {
    transform: 'translateY(-43px)',
    height: 86,
  },
  fas: {
    textAlign: 'center',
  },
  moreLink: {
    marginTop: theme.spacing(1),
    color: Colors.white_opacity[70],
    marginRight: theme.spacing(3),
  },
  moreIcon: {
    marginLeft: theme.spacing(0.5),
  },
  slideWidth: (win: { slidesPerView: number | 'auto' }) => ({
    maxWidth: win.slidesPerView === 'auto' ? SMALL_WIDTH : 'none',
  }),
  containerStart: {
    marginLeft: theme.spacing(3),
  },
}))

ESSlide.defaultProps = {
  slidesPerView: 1.5,
}

export default ESSlide

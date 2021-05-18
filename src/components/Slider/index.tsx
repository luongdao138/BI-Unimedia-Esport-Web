import React, { ReactElement, useRef, useEffect, useState } from 'react'
import { Typography, Box, Link, Theme, Icon } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
SwiperCore.use([Navigation])

const DEFAULT_SLIDE_WIDTH = 191

const ESSlide: React.FC<{
  items: ReactElement[]
  title?: string
  moreLink?: string
  width?: number
  navigation?: boolean
  disableResponsiveWidth?: boolean
}> = ({ items, navigation, disableResponsiveWidth, ...rest }) => {
  const { t } = useTranslation(['common'])
  const [localWidth, setLocalWidth] = useState<number>(DEFAULT_SLIDE_WIDTH)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, moreLink, width, ...props } = rest

  useEffect(() => {
    if (window) {
      handleLoad()
    }
  }, [])

  const handleLoad = () => {
    if (window.innerWidth <= 767 && !disableResponsiveWidth) {
      setLocalWidth(DEFAULT_SLIDE_WIDTH)
    } else {
      setLocalWidth(width)
    }
  }

  const classes = useStyles({ localWidth })
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="slideWrap">
      <Swiper
        slidesPerView="auto"
        spaceBetween={0}
        {...props}
        className={classes.wrap}
        onInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
      >
        {title && (
          <Typography className={classes.containerStart} slot="container-start" variant="h3" gutterBottom>
            {title}
          </Typography>
        )}

        {items.map((item, index) => {
          return (
            <SwiperSlide key={index} className={classes.slideWidth}>
              {item}
            </SwiperSlide>
          )
        })}

        {navigation && (
          <>
            <div ref={prevRef} className={classes.sliderButtonPrev}>
              <Icon classes={{ root: classes.fas }} className="fas fa-chevron-left" fontSize="small" />
            </div>
            <div ref={nextRef} className={classes.sliderButtonNext}>
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
  slideWidth: (win: { localWidth: number }) => ({
    maxWidth: win.localWidth ? win.localWidth : DEFAULT_SLIDE_WIDTH,
  }),
  containerStart: {
    marginLeft: theme.spacing(1),
  },
}))

export default ESSlide

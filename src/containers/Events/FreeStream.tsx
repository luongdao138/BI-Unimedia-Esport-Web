import Slider from '@components/LiveSlider'
import Loader from '@components/Loader'
import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core'
import * as NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { liveEventsActions } from '@store/liveEvents/actions'
import StaticDescription from '@components/StaticDescription'
import { RootState } from '@store/reducers'
import ButtonPrimary from '@components/ButtonPrimary'

interface IAttribute {
  archive_end_datetime?: string
  archive_start_datetime?: string
  channel_id?: string
  channel_name?: string
  chat_room_id?: string
  cm_start_datetime?: string
  description?: string
  flag: string
  has_ticket?: boolean
  live_start_datetime?: string
  title?: string
  vendor_name?: string
  is_cancel_requested?: boolean
  title_static: string
  price?: number
  price_tax_percent: number
}

interface IProps {
  banners: string[]
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  liveTitle: {
    margin: '7px 0px',
    color: '#FFF',
    textAlign: 'left',
  },
  eventInfo: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridColumnGap: 18,
    gridRowGap: 2,
  },
  infoLabel: {
    color: theme.palette.primary.main,
  },
  avatarInfo: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  smallImg: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    alignSelf: 'center',
  },
  description: {
    whiteSpace: 'pre-line',
    marginTop: 14,
    marginBottom: 23,
    fontSize: 14,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
  bottomButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 15,
  },
  shortMsgContainer: {
    textAlign: 'center',
    marginBottom: 13,
  },
  shortMsg: {
    color: '#FF4786',
  },
  [theme.breakpoints.down(390)]: {
    bottomBtnLabel: {
      fontSize: '0.65rem',
    },
  },
  bottomBtnLabel: {
    textTransform: 'initial',
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: '#212121',
    paddingTop: 20,
    paddingBottom: 22,
    zIndex: 99,
  },
  footerBlankSpace: {
    width: '100%',
    height: 80,
  },
  linkBreak: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
}))

const Events: React.FC<IProps> = (props) => {
  const staticTitle = '＆ＧＡＭＥＳ'
  const classes = useStyles({})
  const dispatch = useDispatch()
  const { top, loading } = useSelector((state: RootState) => state.liveEvent, shallowEqual)
  let attr: IAttribute = {
    flag: 'no_live_event',
    title_static: staticTitle,
    price_tax_percent: 1,
  }
  if (top && top.attributes) {
    attr = top.attributes
  }

  const isNotStarted = attr.flag == 'no_live_event'
  const isEnded = attr.flag == 'end_of_archived'
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    dispatch(liveEventsActions.GetTop())
    return () => {
      isMounted.current = false
    }
  }, [])

  function getRightButtonText(flag: string, hasTicket?: boolean) {
    if (hasTicket == null || hasTicket == undefined) return ''

    switch (flag) {
      case 'cm_started':
        return '配信前 視聴はこちら'
      case 'live_streaming':
        return '配信中 視聴はこちら'
      case 'archive_delivery':
        return 'アーカイブはこちら'
      default:
        return ''
    }
  }

  function isCancelRequested() {
    if (attr.is_cancel_requested == undefined || attr.is_cancel_requested == null) return false
    return attr.is_cancel_requested
  }

  function getDoubleButtonView() {
    const noTicket = attr.has_ticket == null || attr.has_ticket == undefined || !attr.has_ticket
    return noTicket ? (
      <a
        href="https://info.exelab.jp/"
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        style={{
          textDecoration: 'none',
        }}
      >
        <ButtonPrimary round gradient={false} fullWidth>
          eXeLAB ご紹介ページ
        </ButtonPrimary>
      </a>
    ) : (
      <div className={classes.bottomButtons}>
        <div>
          <a
            href="https://info.exelab.jp/"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            style={{
              textDecoration: 'none',
            }}
          >
            <ButtonPrimary round fullWidth>
              eXeLAB ご紹介ページ
            </ButtonPrimary>
          </a>
        </div>
        <div>
          <NextLink.default href={attr.flag === 'archive_delivery' ? '/archive' : '/stream'}>
            <ButtonPrimary round fullWidth>
              {getRightButtonText(attr.flag, attr.has_ticket)}
            </ButtonPrimary>
          </NextLink.default>
        </div>
      </div>
    )
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Box pt={2}>
        <div className={classes.container}>
          <Slider items={props.banners} noTitle />
          <div className={classes.description}>
            <StaticDescription />
          </div>
          <div className={classes.footerBlankSpace}></div>
          <div className={classes.stickyFooter}>
            <Container
              maxWidth="lg"
              style={{
                paddingLeft: 16,
                paddingRight: 16,
              }}
            >
              {isEnded || isNotStarted || attr.flag == 'before_start' || isCancelRequested() ? (
                <a
                  href="https://info.exelab.jp/"
                  // eslint-disable-next-line react/jsx-no-target-blank
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ButtonPrimary round gradient={false} fullWidth>
                    eXeLAB ご紹介ページ
                  </ButtonPrimary>
                </a>
              ) : (
                getDoubleButtonView()
              )}
            </Container>
          </div>
        </div>
      </Box>
      {loading ? <Loader /> : null}
    </Container>
  )
}

export default Events

/* eslint-disable no-irregular-whitespace */
import Slider from '@components/LiveSlider'
import Loader from '@components/Loader'
import Box from '@material-ui/core/Box'
import ButtonPrimary from '@components/ButtonPrimary'
import { liveEventsServices } from '@services/liveEvents.service'
import Typography from '@material-ui/core/Typography'
import { Container, Link } from '@material-ui/core'
import * as NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { liveEventsActions } from '@store/liveEvents/actions'
import moment from 'moment'
import { RootState } from '@store/reducers'
import { cutLinksIntoPieces, getPriceWithTax } from '@utils/helpers/CommonHelper'
// import { errorActions } from '@store/error'
// import strings from '@i18n/jp'

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
  liveTitleBottom: {
    margin: '7px 0px',
    color: '#FFF',
    textAlign: 'left',
    marginLeft: 5,
    paddingLeft: theme.spacing(1),
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
    height: 30,
    alignSelf: 'center',
  },
  description: {
    whiteSpace: 'pre-line',
    marginTop: 14,
    marginBottom: 23,
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

const Events = (props: IProps) => {
  const staticTitle = '【JAVCOMセミナー No.158】eスポーツがもたらす映像ビジネス'
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

  function handleClick(e) {
    e.preventDefault()
    if (top && top.id) {
      dispatch(liveEventsActions.ChangeLoader(true))
      liveEventsServices
        .getGmoTicketPurchaseUri({ live_event_id: top.id })
        .then((result) => {
          dispatch(liveEventsActions.ChangeLoader(false))
          if (isMounted.current) {
            window.location.href = result.data.url
          }
        })
        .catch((err) => {
          dispatch(liveEventsActions.ChangeLoader(false))
          if (err.data && err.data.error === 'already_purchased') {
            // dispatch(errorActions.setErrorText('チケットを既に購入済みです。'))
          } else {
            // dispatch(errorActions.setError(err))
          }
        })
    }
  }

  function getLiveEventMsg(flag: string) {
    if (!flag) return ''
    const lowerFlag = flag.toLocaleLowerCase()

    switch (lowerFlag) {
      case 'cm_started':
        return '配信開始までお待ちください'
      case 'live_streaming':
        return 'LIVE配信中です'
      case 'archive_delivery':
        return 'アーカイブ配信中です'
      case 'end_of_archived':
        return '配信は終了しました'
      default:
        return ''
    }
  }

  function getRightButtonText(flag: string, hasTicket?: boolean) {
    if (hasTicket == null || hasTicket == undefined) return ''

    if (!hasTicket) {
      return 'チケット購入はこちら'
    }
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

  function formatDescription(description: string) {
    const pieces = cutLinksIntoPieces(description)
    return pieces.map((piece, index, _arr) => {
      if (piece.type === 'text') {
        return piece.text
      } else {
        return (
          <Link key={index} href={piece.text} target="_blank" className={classes.linkBreak}>
            {piece.text}
          </Link>
        )
      }
    })
  }

  function dateFormater(date: string, isWithYear: boolean) {
    if (date) {
      if (isWithYear) return moment(date).format('YYYY年MM月DD日HH:mm')
      else return moment(date).format('MM月DD日HH:mm')
    }
    return null
  }

  function getTitle() {
    return staticTitle
    // if (!attr) return staticTitle
    // if (attr.title_static == null || attr.title_static == undefined)
    //   return staticTitle
    // return attr.title_static
  }

  function isCancelRequested() {
    if (attr.is_cancel_requested == undefined || attr.is_cancel_requested == null) return false
    return attr.is_cancel_requested
  }

  function getDoubleButtonView() {
    const noTicket = attr.has_ticket == null || attr.has_ticket == undefined || !attr.has_ticket
    return (
      <div className={classes.bottomButtons}>
        <div>
          <a
            href="https://javcomnpo.or.jp/"
            // eslint-disable-next-line react/jsx-no-target-blank
            target="_blank"
            style={{
              textDecoration: 'none',
            }}
          >
            <ButtonPrimary round gradient={false} fullWidth>
              番組公式サイト
            </ButtonPrimary>
          </a>
        </div>
        <div>
          {noTicket ? (
            <a href="#" onClick={handleClick} style={{ textDecoration: 'none' }}>
              <ButtonPrimary round fullWidth>
                {getRightButtonText(attr.flag, attr.has_ticket)}
              </ButtonPrimary>
            </a>
          ) : (
            <NextLink.default href={attr.flag === 'archive_delivery' ? '/archive' : '/stream'}>
              <ButtonPrimary round fullWidth>
                {getRightButtonText(attr.flag, attr.has_ticket)}
              </ButtonPrimary>
            </NextLink.default>
          )}
        </div>
      </div>
    )
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Box pt={2}>
        <div className={classes.container}>
          {isNotStarted ? null : <Slider items={props.banners} noTitle />}
          <Typography variant="h6" className={classes.liveTitle}>
            {getTitle()}
          </Typography>
          <div className={classes.avatarInfo}>
            <img alt="Host" className={classes.smallImg} src="/images/icon_detail_new.jpg" />
            <Typography variant="body2" className={classes.liveTitleBottom}>
              &nbsp;JAVCOM　NPO法人 日本ビデオコミュニケーション協会
            </Typography>
          </div>
          {!isNotStarted && attr.has_ticket ? (
            <div className={classes.shortMsgContainer}>
              <Typography variant="subtitle2" className={classes.shortMsg}>
                {getLiveEventMsg(attr.flag)}
              </Typography>
            </div>
          ) : null}
          <div className={classes.eventInfo}>
            <div className={classes.infoLabel}>■販売期間</div>
            <div className="row">
              {attr.cm_start_datetime && attr.archive_end_datetime && !isNotStarted
                ? `${dateFormater(attr.cm_start_datetime, true)}～${dateFormater(attr.archive_end_datetime, false)}`
                : ''}
            </div>
            <div className={classes.infoLabel}>■放送開始</div>
            <div className="row">{attr.live_start_datetime && !isNotStarted ? dateFormater(attr.live_start_datetime, true) : ''}</div>
            <div className={classes.infoLabel}>■アーカイブ視聴</div>
            <div className="row">
              {attr.archive_start_datetime && attr.archive_end_datetime && !isNotStarted
                ? `${dateFormater(attr.archive_start_datetime, true)}～${dateFormater(attr.archive_end_datetime, false)}`
                : ''}
            </div>
            <div className={classes.infoLabel}>■販売価格</div>
            <div className="row">
              {attr.price == null || attr.price == undefined ? '' : `${getPriceWithTax(attr.price, attr.price_tax_percent)}円（税込み）`}
            </div>
          </div>
          {isNotStarted ? null : <div className={classes.description}>{attr.description ? formatDescription(attr.description) : ''}</div>}
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
                  href="https://javcomnpo.or.jp/"
                  // eslint-disable-next-line react/jsx-no-target-blank
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <ButtonPrimary round gradient={false} fullWidth>
                    番組公式サイト
                  </ButtonPrimary>
                </a>
              ) : (
                getDoubleButtonView()
              )}
            </Container>
          </div>
        </div>
      </Box>
      {loading && <Loader />}
    </Container>
  )
}

export default Events

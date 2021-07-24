import LiveSlider from '@components/LiveSlider'
import Loader from '@components/Loader'
import Typography from '@material-ui/core/Typography'
import ButtonPrimary from '@components/ButtonPrimary'
import { Container, Link } from '@material-ui/core'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { videoDetailActions } from '@store/videoDetail/actions'
import { prDetailSelectors, getMeta } from '@store/videoDetail/selectors'
import moment from 'moment'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import * as NextLink from 'next/link'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'

interface IAttribute {
  archive_end_datetime?: string
  archive_start_datetime?: string
  channel_id?: string
  channel_name?: string
  chat_room_id?: string
  cm_start_datetime?: string
  description?: string
  flag: string
  live_start_datetime?: string
  title?: string
  vendor_name?: string
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
    height: 58,
  },
  linkBreak: {
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  loaderBox: {
    width: 20,
    height: 20,
    margin: '0 auto',
    '& svg': {
      width: '100%',
    },
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Pr = (props: IProps) => {
  const { t } = useTranslation(['common'])
  const staticTitle = t('common:pr.static_title')
  const classes = useStyles({})
  const dispatch = useDispatch()
  const detail = useSelector(prDetailSelectors)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const meta = useSelector(getMeta)
  let attr: IAttribute = {
    flag: 'no_live_event',
    title_static: staticTitle,
    price_tax_percent: 1,
  }
  if (detail && detail.attributes) {
    attr = detail.attributes
  }

  const isNotStarted = attr.flag == 'no_live_event'

  useEffect(() => {
    dispatch(videoDetailActions.GetPrTop())
  }, [])

  function formatDescription(description: string) {
    const pieces = CommonHelper.cutLinksIntoPieces(description)
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

  function getTitle() {
    return staticTitle
  }

  function dateFormater(date: string, isWithYear: boolean) {
    if (date) {
      if (isWithYear) return moment(date).format('YYYY年MM月DD日HH:mm')
      else return moment(date).format('MM月DD日HH:mm')
    }
    return null
  }

  function getDoubleButtonView() {
    return (
      <div className={classes.bottomButtons}>
        <div>
          <a
            href="https://javcomnpo.or.jp/"
            target="_blank"
            rel="noopener noreferrer"
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
          {
            <NextLink.default href="/register">
              <ButtonPrimary round fullWidth>
                会員登録はこちら
              </ButtonPrimary>
            </NextLink.default>
          }
        </div>
      </div>
    )
  }

  return (
    <Container maxWidth="lg" disableGutters>
      {meta.pending && (
        <Box className={classes.loaderBox}>
          <Loader />
        </Box>
      )}
      {!meta.pending ? (
        <Box pt={2}>
          <div className={classes.container}>
            <div className="sliderWrap">{isNotStarted ? null : <LiveSlider items={props.banners} noTitle />}</div>
            <Typography variant="h6" className={classes.liveTitle}>
              {getTitle()}
            </Typography>
            <div className={classes.avatarInfo}>
              <img className={classes.smallImg} src="/images/icon_detail_new.jpg" />
              <Typography variant="body2" className={classes.liveTitleBottom}>
                &nbsp;{'JAVCOM　NPO法人 日本ビデオコミュニケーション協会'}
              </Typography>
            </div>
            {!isNotStarted ? (
              <div className={classes.shortMsgContainer}>
                <Typography variant="subtitle2" className={classes.shortMsg}>
                  eXeLAB会員限定プレミアム配信
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
                {getDoubleButtonView()}
              </Container>
            </div>
          </div>
        </Box>
      ) : null}
    </Container>
  )
}

export default Pr

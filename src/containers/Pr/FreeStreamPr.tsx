/* eslint-disable react/jsx-no-target-blank */
import Slider from '@components/LiveSlider'
import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { prActions } from '@store/pr/actions'
import Box from '@material-ui/core/Box'
import StaticDescription from '@components/StaticDescription'
import { RootState } from '@store/reducers'
import LoginRequired from '@containers/LoginRequired'
import Loader from '@components/FullScreenLoader'
import Header from '@components/HeaderWithButton'

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
    fontSize: 14,
    marginTop: 14,
    marginBottom: 23,
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

const Pr: React.FC<IProps> = (props) => {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.pr, shallowEqual)

  useEffect(() => {
    dispatch(prActions.GetTop())
  }, [])

  function getDoubleButtonView() {
    return (
      <div className={classes.bottomButtons}>
        <div>
          <a
            href="https://info.exelab.jp/"
            target="_blank"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button variant="contained" color="secondary" fullWidth classes={{ label: classes.bottomBtnLabel }}>
              eXeLAB ご紹介ページ
            </Button>
          </a>
        </div>
        <div>
          <LoginRequired>
            <Button variant="contained" color="primary" fullWidth classes={{ label: classes.bottomBtnLabel }}>
              会員登録はこちら
            </Button>
          </LoginRequired>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header title="動画" withBackButton={false} />
      <Box p={3}>
        <div className="sliderWrap">
          <Slider items={props.banners} noTitle />
        </div>
        <div className={classes.description}>
          <StaticDescription />
        </div>
        <div className={classes.footerBlankSpace}></div>

        <Box pb={12}>{getDoubleButtonView()}</Box>
      </Box>
      <Loader open={loading} />
    </>
  )
}

export default Pr

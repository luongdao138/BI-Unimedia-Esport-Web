import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  bottomButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageAppStore: {
    alignSelf: 'center',
    height: 72,
  },
  imageGooglePlay: {
    height: 72,
  },
  [theme.breakpoints.down('xs')]: {
    imageAppStore: {
      height: 48,
    },
    imageGooglePlay: {
      height: 48,
    },
  },
}))

interface Props {
  id: number | string
}

const AppButtons: React.FC<Props> = ({ id }) => {
  const classes = useStyles()

  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
  const fixedButton = () => {
    const buttons = (
      <div className={classes.bottomButtons}>
        {/Android/i.test(window.navigator.userAgent) ? (
          <a
            className={classes.imageGooglePlay}
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab"
          >
            <img src="/images/google_play.png" alt="play_store" className={classes.imageGooglePlay} />
          </a>
        ) : (
          <a
            className={classes.imageAppStore}
            target="_blank"
            rel="noopener noreferrer"
            href="https://apps.apple.com/us/app/exelab/id1525346211"
          >
            <img src="/images/app_store.png" alt="app_store" className={classes.imageAppStore} />
          </a>
        )}
        <a className={classes.imageAppStore} href={`exelab://tournaments/${id}`}>
          <img src="/images/exe_app.png" alt="app_store" className={classes.imageAppStore} />
        </a>
      </div>
    )

    return (
      <Container
        maxWidth="lg"
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        {buttons}
      </Container>
    )
  }

  return !isMobile ? (
    <>
      <div
        className={classes.bottomButtons}
        style={{
          marginTop: 16,
        }}
      >
        <a
          className={classes.imageAppStore}
          target="_blank"
          rel="noopener noreferrer"
          href="https://apps.apple.com/us/app/exelab/id1525346211"
        >
          <img src="/images/app_store.png" alt="app_store" className={classes.imageAppStore} />
        </a>
        <a
          className={classes.imageGooglePlay}
          target="_blank"
          rel="noopener noreferrer"
          href="https://play.google.com/store/apps/details?id=jp.co.ntt.esportspf.exelab"
        >
          <img src="/images/google_play.png" alt="play_store" className={classes.imageGooglePlay} />
        </a>
      </div>
    </>
  ) : (
    fixedButton()
  )
}
export default AppButtons

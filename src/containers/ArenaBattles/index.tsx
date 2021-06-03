import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import BRListItem from './BRListItem'
import { useState } from 'react'
import { useRouter } from 'next/router'

const ArenaBattles: React.FC = () => {
  const [score, setScore] = useState('')
  const classes = useStyles()
  const router = useRouter()
  return (
    <>
      <AppBar className={classes.appbar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.backButton} onClick={() => router.back()}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h2">第1回 exeCUP -STREET FIGHTER V CE部門-</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.content}>
        <Container maxWidth="lg">
          <BRListItem
            index="1"
            avatar="https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/30/1618455315-30.jpg"
            label="わたなべ 1"
            editable={true}
            onChange={(value) => setScore(value)}
            score={score}
          />
        </Container>
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#212121',
    paddingTop: 60,
    background: 'url("/images/pattern.png") center 60px repeat-x #212121 fixed',
  },
  appbar: {
    top: 60,
    backgroundColor: '#000000',
    borderBottom: '1px solid #FFFFFF30',
    borderTop: '1px solid #FFFFFF30',
  },
  toolbar: {
    paddingLeft: 0,
  },
  content: {
    paddingTop: 108,
  },
  backButton: {
    backgroundColor: '#4D4D4D',
    padding: 7,
    marginRight: 16,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
}))

export default ArenaBattles

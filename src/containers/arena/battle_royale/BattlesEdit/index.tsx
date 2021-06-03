import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import BRListItem from '@containers/arena/battle_royale/Battles/BRListItem'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
// import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'

const ArenaBattlesEdit: React.FC = () => {
  const [score, setScore] = useState('')
  const classes = useStyles()
  const router = useRouter()
  // const { tournament } = useTournamentDetail()
  const { participants, getParticipants, resetMeta } = useParticipants()

  useEffect(() => {
    getParticipants({ page: 1, hash_key: router.query.hash_key })

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key])

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
          {participants.map((participant, i) => {
            return (
              <BRListItem
                key={i}
                index={`${i + 1}`}
                avatar={participant.attributes.avatar_url}
                label={participant.attributes.name}
                editable={true}
                onChange={(value) => setScore(value)}
                score={score}
              />
            )
          })}
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
    paddingTop: 128,
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

export default ArenaBattlesEdit

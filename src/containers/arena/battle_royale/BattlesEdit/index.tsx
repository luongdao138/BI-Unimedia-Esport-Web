import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import BRListItem from '@containers/arena/battle_royale/Battles/BRListItem'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { ROLE } from '@constants/tournament.constants'
import InterestedList from '@containers/arena/Detail/Partials/SelectParticipantModal/InterestedList'
import ESStickyFooter from '@components/StickyFooter'
import { useTranslation } from 'react-i18next'
import RandomizeDialog from '@containers/arena/tournament/MatchesEdit/Partials/RandomizeDialog'
import ESLoader from '@components/FullScreenLoader'
import ESToast from '@components/Toast'
import useModeratorActions from '@containers/arena/hooks/useModeratorActions'

const ArenaBattlesEdit: React.FC = () => {
  const { t } = useTranslation(['common'])
  const [score, setScore] = useState('')
  const classes = useStyles()
  const router = useRouter()
  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, meta: participantsMeta, getParticipants, resetMeta } = useParticipants()
  const {
    freeze,
    randomize,
    setParticipants,
    randomizeMeta,
    resetRandomizeMeta,
    freezeMeta,
    resetFreezeMeta,
    setParticipantsMeta,
    resetParticipantsMeta,
  } = useModeratorActions()

  const [data, setData] = useState<any>()
  const [showParticipants, setShowParticipants] = useState<boolean>(false)
  const [showRandomize, setShowRandomize] = useState(false)
  const [selecteds, setSelecteds] = useState(participants)
  const [targetParticipant, setTargetParticipant] = useState()
  const [clickIndex, setClickIndex] = useState<number>(0)

  useEffect(() => {
    if (tournament) {
      setData(TournamentHelper.getDetailData(tournament))
    }
  }, [tournament])

  useEffect(() => {
    if (participants) {
      setSelecteds(participants)
    }
  }, [participants])

  useEffect(() => {
    if (router.query.hash_key) getParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key])

  useEffect(() => {
    if (randomizeMeta.loaded) {
      getParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }
  }, [randomizeMeta.loaded])

  useEffect(() => {
    const _selected = [...selecteds]
    _selected[clickIndex] = targetParticipant
    setSelecteds(_selected)
    setShowParticipants(false)
  }, [setParticipantsMeta.loaded])

  const selectedHandler = (participant) => {
    setTargetParticipant(participant)
    const _selecteds = [...selecteds]
    if (clickIndex >= _selecteds.length) _selecteds.push(participant)
    else _selecteds[clickIndex] = participant
    setParticipants({ hash_key: data.hash_key, pids: _selecteds.map((p) => p.id) })
  }

  const renderItems = () => {
    const diff = data.maxCapacity - selecteds.length
    const items = [...selecteds]
    for (let i = 0; i < diff; i++) {
      items.push(null)
    }

    return items.map((participant, i) => {
      return (
        <div
          className={classes.pointer}
          key={i}
          onClick={() => {
            if (data.memberSelectable) {
              setShowParticipants(true)
              setClickIndex(i)
            }
          }}
        >
          <BRListItem
            index={`${i + 1}`}
            avatar={participant?.attributes?.avatar_url}
            label={participant?.attributes?.name}
            editable={false}
            onChange={(value) => setScore(value)}
            score={score}
          />
        </div>
      )
    })
  }

  const body = () => {
    const freezable = selecteds.length == data.maxCapacity

    return (
      <ESStickyFooter
        disabled={false}
        title={freezable ? t('common:arena.freeze_button') : t('common:arena.randomize_button')}
        onClick={freezable ? () => freeze(tournament.attributes.hash_key) : () => setShowRandomize(true)}
        show={data.memberSelectable}
        noScroll
      >
        <AppBar className={classes.appbar}>
          <Container maxWidth="lg">
            <Toolbar className={classes.toolbar}>
              <IconButton className={classes.backButton} onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h2">{tournament.attributes.title}</Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <div className={classes.content}>
          <Container maxWidth="lg">{data && participants && renderItems()}</Container>
        </div>
        <InterestedList
          tournament={tournament}
          open={showParticipants}
          handleClose={() => setShowParticipants(false)}
          onSelect={(participant) => selectedHandler(participant)}
        />
        <RandomizeDialog
          open={showRandomize}
          onClose={() => setShowRandomize(false)}
          onAction={() => {
            setShowRandomize(false)
            randomize(tournament.attributes.hash_key)
          }}
        />
      </ESStickyFooter>
    )
  }

  return (
    <>
      {data && participants && body()}
      <ESLoader
        open={detailMeta.pending || participantsMeta.pending || randomizeMeta.pending || freezeMeta.pending || setParticipantsMeta.pending}
      />

      {/* success */}
      {randomizeMeta.loaded && (
        <ESToast open={randomizeMeta.loaded} message={t('common:arena.randomize_success')} resetMeta={resetRandomizeMeta} />
      )}
      {freezeMeta.loaded && <ESToast open={freezeMeta.loaded} message={t('common:arena.freeze_success')} resetMeta={resetFreezeMeta} />}

      {/* error */}
      {!!randomizeMeta.error && <ESToast open={!!randomizeMeta.error} message={t('common:error.failed')} resetMeta={resetRandomizeMeta} />}
      {!!freezeMeta.error && <ESToast open={!!freezeMeta.error} message={t('common:error.failed')} resetMeta={resetFreezeMeta} />}
      {!!setParticipantsMeta.error && (
        <ESToast open={!!setParticipantsMeta.error} message={t('common:error.failed')} resetMeta={resetParticipantsMeta} />
      )}
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
  pointer: {
    cursor: 'pointer',
  },
}))

export default ArenaBattlesEdit

import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Typography, Icon } from '@material-ui/core'
import BRListItem from '@containers/arena/battle_royale/Battles/BRListItem'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useParticipants from '@containers/arena/Detail/Participants/useParticipants'
import useTournamentDetail from '@containers/arena/hooks/useTournamentDetail'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { ROLE } from '@constants/tournament.constants'
import InterestedList from '@containers/arena/Detail/Partials/SelectParticipantModal/InterestedList'
import { useTranslation } from 'react-i18next'
import RandomizeDialog from './Partials/RandomizeDialog'
import FreezeDialog from './Partials/FreezeDialog'
import ESLoader from '@components/FullScreenLoader'
import useModeratorActions from '@containers/arena/hooks/useModeratorActions'
import HeaderWithButton from '@components/HeaderWithButton'
import ButtonPrimary from '@components/ButtonPrimary'
import ButtonPrimaryOutlined from '@components/ButtonPrimaryOutlined'
import { use100vh } from 'react-div-100vh'
import { Colors } from '@theme/colors'

const ArenaBattlesEdit: React.FC = () => {
  const { t } = useTranslation(['common'])
  const [score, setScore] = useState('')
  const classes = useStyles()
  const router = useRouter()
  const { tournament, meta: detailMeta } = useTournamentDetail()
  const { participants, meta: participantsMeta, getParticipants, resetMeta } = useParticipants()
  const { freeze, randomize, setParticipants, randomizeMeta, freezeMeta, setParticipantsMeta } = useModeratorActions()
  const [showFreeze, setShowFreeze] = useState(false)
  const [data, setData] = useState<ReturnType<typeof TournamentHelper.getDetailData> | undefined>(undefined)
  const [showParticipants, setShowParticipants] = useState<boolean>(false)
  const [showRandomize, setShowRandomize] = useState(false)
  const [selecteds, setSelecteds] = useState(participants)
  const [targetParticipant, setTargetParticipant] = useState()
  const [clickIndex, setClickIndex] = useState<number>(0)

  const height = use100vh()

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
    if ((router.query.hash_key, detailMeta.loaded)) {
      getParticipants({ page: 1, hash_key: router.query.hash_key, role: ROLE.PARTICIPANT })
    }

    return () => {
      resetMeta()
    }
  }, [router.query.hash_key, detailMeta])

  useEffect(() => {
    setShowFreeze(false)
  }, [freezeMeta.loaded])

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

  const freezable = selecteds.length === data?.maxCapacity

  return (
    <>
      {detailMeta.loaded && participantsMeta.loaded && (
        <div style={{ height: `calc(${height} - 60px)` }}>
          <HeaderWithButton title={tournament.attributes.title} />
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="body2">{t('common:tournament.confirm_brackets')}</Typography>
          </Box>
          <Container maxWidth="lg">{data && participants && renderItems()}</Container>
          <Box className={classes.actionButtonContainer}>
            <Box className={classes.actionButton}>
              <ButtonPrimaryOutlined
                onClick={() => setShowRandomize(true)}
                leadingIcon={<Icon className="fas fa-random" fontSize="small" />}
              >
                {t('common:arena.randomize_button')}
              </ButtonPrimaryOutlined>
            </Box>
            <Box className={classes.actionButton}>
              <ButtonPrimary type="submit" round fullWidth disabled={!freezable} onClick={() => setShowFreeze(true)}>
                {t('common:arena.freeze_br_button')}
              </ButtonPrimary>
            </Box>
          </Box>
          <InterestedList
            tournament={tournament}
            open={showParticipants}
            handleClose={() => setShowParticipants(false)}
            onSelect={(participant) => selectedHandler(participant)}
            handleUnset={() => null}
          />
          <RandomizeDialog
            open={showRandomize}
            onClose={() => setShowRandomize(false)}
            onAction={() => {
              setShowRandomize(false)
              randomize(tournament.attributes.hash_key)
            }}
          />
          <FreezeDialog
            open={showFreeze}
            onClose={() => setShowFreeze(false)}
            onAction={() => freeze({ hash_key: tournament.attributes.hash_key, matches: selecteds.map((p) => Number(p.id)) })}
          />
        </div>
      )}
      <ESLoader
        open={detailMeta.pending || participantsMeta.pending || randomizeMeta.pending || freezeMeta.pending || setParticipantsMeta.pending}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
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
  actionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.common.black,
    borderTop: `1px solid ${Colors.white_opacity['15']}`,
  },
  actionButton: {
    width: theme.spacing(35),
    margin: 8,
  },
  toolbar: {
    paddingLeft: 0,
  },
  content: {
    paddingTop: 24,
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
  buttonHolder: {
    marginBottom: theme.spacing(3),
  },
  [theme.breakpoints.down('sm')]: {
    actionButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
}))

export default ArenaBattlesEdit

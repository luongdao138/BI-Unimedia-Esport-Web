import React, { useEffect } from 'react'
import { SuggestedTeamMembersResponse, TeamJoin, TeamMember, TournamentDetail } from '@services/tournament.service'
import { useState } from 'react'
import ESButton from '@components/Button'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import ESSimpleSelectInput from '@components/SimpleSelectInput'
import useSuggestedTeamMembers from './useSuggestedTeamMembers'
import ESLabel from '@components/Label'
import useUploadImage from '@utils/hooks/useUploadImage'
import ESTeamIconUploader from '@components/TeamIconUploader'
import useEntry from './useEntry'
import _ from 'lodash'
import ESToast from '@components/Toast'
import ESLoader from '@components/FullScreenLoader'

interface TeamEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  handleClose: () => void
}

const FINAL_STEP = 1

let teamMembers = []

const TeamEntryModal: React.FC<TeamEntryModalProps> = ({ tournament, userProfile, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [isUploading, setUploading] = useState(false)
  const { suggestedTeamMembers, getSuggestedTeamMembers, resetMeta } = useSuggestedTeamMembers()
  const { uploadArenaTeamImage } = useUploadImage()
  const { join, leave, joinMeta, leaveMeta, resetJoinMeta, resetLeaveMeta } = useEntry()
  const [teamMemberItems, setTeamMemberItems] = useState(suggestedTeamMembers)

  useEffect(() => {
    setTeamMemberItems(suggestedTeamMembers)
  }, [suggestedTeamMembers])

  useEffect(() => {
    if (joinMeta.loaded || joinMeta.error) {
      setOpen(false)
      reset()
      handleClose()
    }
  }, [joinMeta.loaded, joinMeta.error])

  const membersValidationSchema = Yup.object().shape({
    user_id: Yup.number().required(),
    name: Yup.string()
      .required()
      .test('name', 'ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    nickname: Yup.string().required(),
    user_code: Yup.string().required(),
  })

  const validationSchema = Yup.object().shape({
    leader_name: Yup.string().required(),
    team_name: Yup.string()
      .required(t('common:common.error'))
      .max(40, t('common:common.too_long'))
      .test('team_name', 'ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    team_icon_url: Yup.string().required(),
    members: Yup.array().of(membersValidationSchema),
  })

  const { values, isValid, handleSubmit, handleChange, setFieldValue, setValues, resetForm, validateForm } = useFormik<TeamJoin>({
    initialValues: {
      leader_name: userProfile ? userProfile.attributes.nickname : '',
      team_name: '',
      team_icon_url: '',
      members: Array.from({ length: tournament.attributes.participant_type }, (_, index) => ({
        user_id: index === 0 ? Number(userProfile.id) : undefined,
        name: index === 0 ? userProfile.attributes.nickname : '',
        nickname: index === 0 ? userProfile.attributes.nickname : '',
        user_code: index === 0 ? userProfile.attributes.user_code : '',
      })),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isValid) {
        const filtered = _.filter(values.members, (member) => member.user_id !== Number(userProfile.id))
        const data = _.map(filtered, ({ user_id, nickname }) => ({ user_id, name: nickname }))
        join({ hash_key: tournament.attributes.hash_key, data: { ...values, members: data } })
      }
    },
  })

  useEffect(() => {
    if (open && userProfile) {
      validateForm()
      teamMembers = Array(tournament.attributes.participant_type)
    } else {
      resetForm()
    }
  }, [open, userProfile])

  useEffect(() => {
    getSuggestedTeamMembers({ page: 1, keyword: '', tournament_id: tournament.id })
  }, [])

  const reset = () => {
    setStep(0)
    resetMeta()
    teamMembers = []
    setValues({ id: '', leader_name: '', team_name: '', team_icon_url: '', members: [] })
  }

  const handleReturn = () => {
    if (step === FINAL_STEP) {
      setStep(0)
    } else {
      reset()
      setOpen(false)
    }
  }

  const handleSelectedMembers = (selectedMember: SuggestedTeamMembersResponse, index) => {
    if (selectedMember) {
      const nickname = selectedMember.attributes.nickname
      const userCode = selectedMember.attributes.user_code
      const member: TeamMember = { user_id: Number(selectedMember.id), name: nickname, nickname: nickname, user_code: userCode }

      teamMembers[index] = selectedMember

      const tempMembers = [...values.members]
      tempMembers[index] = member
      setFieldValue('members', tempMembers)
    } else {
      teamMembers[index] = null

      const tempMembers = [...values.members]
      tempMembers[index] = {
        user_id: undefined,
        name: '',
        nickname: '',
        user_code: '',
      }
      setFieldValue('members', tempMembers)
    }
  }

  const handleActionButton = () => {
    if (step === FINAL_STEP) {
      handleSubmit()
    } else {
      setStep(1)
    }
  }

  const renderMembersSelector = () => {
    const elements = []

    for (let i = 0; i < values.members.length; i++) {
      if (i === 0) {
        elements.push(
          <Box key={i} my={2}>
            <ESLabel label={`${t('common:member')}${i + 1}（${t('common:you')}）`} size="small" />
            <Typography>{userProfile ? userProfile.attributes.nickname : ''}</Typography>
          </Box>
        )
      } else {
        elements.push(
          <Box key={i} my={2}>
            <ESSimpleSelectInput
              label={`${t('common:member')}${i + 1}`}
              index={i}
              selectedItem={teamMembers[i] ? teamMembers[i] : null}
              items={teamMemberItems}
              onItemsSelected={handleSelectedMembers}
              onScrollEnd={() => {
                // setTeamMemberItems([...teamMemberItems, ...teamMemberItems])
              }}
            />
          </Box>
        )
      }
    }

    return elements
  }

  const handleImageUpload = (file: File) => {
    setUploading(true)

    uploadArenaTeamImage(file, 1, true, (imageUrl) => {
      setUploading(false)
      setFieldValue('team_icon_url', imageUrl)
    })
  }

  const teamCreateForm = () => (
    <Box mt={6}>
      <BlackBox>
        <DetailInfo detail={tournament} />
      </BlackBox>

      <Box className={classes.formContainer}>
        <ESLabel label={t('common:icon')} required />
        <Box m={1} />
        <ESTeamIconUploader src={values.team_icon_url} editable onChange={handleImageUpload} isUploading={isUploading} />

        <Box mt={4} />
        <ESInput
          id="team_name"
          autoFocus
          labelPrimary={t('common:team_name')}
          fullWidth
          required
          value={values.team_name}
          onChange={handleChange}
        />

        <Box mt={4} />
        <ESLabel label={t('common:tournament.entry_members')} required />

        {renderMembersSelector()}
      </Box>
    </Box>
  )

  const renderMembersNicknameChanger = () => {
    const elements = []

    for (let i = 0; i < values.members.length; i++) {
      elements.push(
        <Box key={i} my={2}>
          <Box>
            <Typography>{`${t('common:member')}${i + 1}${i === 0 ? `（${t('common:you')}）` : ''}`}</Typography>
            <Typography>{values.members[i].name}</Typography>
            <Typography>{`${t('common:common.at')}${values.members[i].user_code}`}</Typography>
          </Box>
          <Box mt={2} />
          <ESInput id={`members.${i}.nickname`} autoFocus fullWidth value={values.members[i].nickname} onChange={handleChange} />
        </Box>
      )
    }

    return elements
  }

  const nicknameChangeForm = () => (
    <Box>
      <Box className={classes.formContainer}>
        <ESLabel label={t('common:tournament.join_nickname')} required />

        {renderMembersNicknameChanger()}
      </Box>
    </Box>
  )

  return (
    <Box>
      <Box className={classes.actionButton}>
        {tournament.attributes.is_entered && tournament.attributes.my_role === 'interested' && (
          <ESButton variant="outlined" round fullWidth size="large" onClick={() => leave(tournament.attributes.hash_key)}>
            {t('common:tournament.unjoin')}
          </ESButton>
        )}
        {tournament.attributes.my_role === null && (
          <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
            {t('common:tournament.join')}
          </ButtonPrimary>
        )}
      </Box>

      <StickyActionModal
        open={open}
        returnText={step === FINAL_STEP ? t('common:tournament.join_nickname_setting') : t('common:tournament.join')}
        actionButtonText={step === FINAL_STEP ? t('common:next') : t('common:next')}
        actionButtonDisabled={!isValid}
        actionHintText={t('common:tournament.join_nickname_setting_desc')}
        onReturnClicked={handleReturn}
        onActionButtonClicked={handleActionButton}
      >
        <form onSubmit={handleActionButton}>{step === FINAL_STEP ? nicknameChangeForm() : teamCreateForm()}</form>
      </StickyActionModal>

      {(joinMeta.pending || leaveMeta.pending) && <ESLoader open={joinMeta.pending || leaveMeta.pending} />}
      {!!joinMeta.error && <ESToast open={!!joinMeta.error} message={t('common:error.join_arena_failed')} resetMeta={resetJoinMeta} />}
      {!!leaveMeta.error && <ESToast open={!!leaveMeta.error} message={t('common:error.leave_arena_failed')} resetMeta={resetLeaveMeta} />}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
}))

export default TeamEntryModal

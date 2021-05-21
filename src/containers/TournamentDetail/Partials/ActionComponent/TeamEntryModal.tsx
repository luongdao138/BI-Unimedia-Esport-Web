import React, { useEffect } from 'react'
import { SuggestedTeamMembersResponse, TournamentDetail } from '@services/tournament.service'
import { useState } from 'react'
import ESButton from '@components/Button'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/TournamentDetail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import ESSimpleSelectInput from '@components/SimpleSelectInput'
import useSuggestedTeamMembers from './useSuggestedTeamMembers'
import ESLabel from '@components/Label'
import useUploadImage from '@utils/hooks/useUploadImage'
import { ACTION_TYPE, UPLOADER_TYPE } from '@constants/image.constants'
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
  const { join, leave, joinMeta, leaveMeta } = useEntry()
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
    name: Yup.string().required(),
    user_code: Yup.string().required(),
    nickname: Yup.string()
      .required('Name is required')
      .max(40, t('common:common.too_long'))
      .test('name', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const validationSchema = Yup.object().shape({
    id: Yup.string().required(),
    leader_name: Yup.string().required(),
    team_name: Yup.string()
      .required(t('common:common.error'))
      .max(40, t('common:common.too_long'))
      .test('team_name', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    team_icon_url: Yup.string().required(),
    members: Yup.array().of(membersValidationSchema),
  })

  const { values, errors, touched, isValid, handleSubmit, handleChange, setFieldValue, setValues } = useFormik({
    initialValues: {
      id: userProfile ? userProfile.id : null,
      leader_name: userProfile ? userProfile.attributes.nickname : '',
      team_name: '',
      team_icon_url: '',
      members: Array(tournament.attributes.participant_type),
    },
    validationSchema,
    onSubmit: (values) => {
      if (isValid) {
        const filtered = _.filter(values.members, (member) => member.user_id !== values.id)
        const data = _.map(filtered, ({ user_id, nickname }) => ({ user_id, name: nickname }))
        join({ hash_key: tournament.attributes.hash_key, data: { ...values, members: data } })
      }
    },
  })

  useEffect(() => {
    if (open && userProfile) {
      teamMembers = Array(tournament.attributes.participant_type)

      for (let i = 0; i < tournament.attributes.participant_type; i++) {
        let initialValue = { user_id: '', name: '', nickname: '', user_code: '' }
        if (i === 0) {
          initialValue = {
            user_id: userProfile.id,
            name: userProfile.attributes.nickname,
            nickname: userProfile.attributes.nickname,
            user_code: userProfile.attributes.user_code,
          }
        }

        values.members[i] = initialValue
      }

      setFieldValue('members', values.members)
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
      const member = { user_id: selectedMember.id, name: nickname, nickname: nickname, user_code: userCode }

      teamMembers[index] = selectedMember
      values.members[index] = member
      setFieldValue('members', values.members)
    } else {
      teamMembers[index] = null
      values.members[index] = null
      setFieldValue('members', values.members)
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
            <ESLabel label={`メンバー${i + 1}（あなた）`} size="small" />
            <Typography>{userProfile ? userProfile.attributes.nickname : ''}</Typography>
          </Box>
        )
      } else {
        elements.push(
          <Box key={i} my={2}>
            <ESSimpleSelectInput
              label={`メンバー${i + 1}`}
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

    uploadArenaTeamImage(file, 1, UPLOADER_TYPE.TEAM, ACTION_TYPE.CREATE, (imageUrl) => {
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
        <ESLabel label={'アイコン'} required />
        <Box m={1} />
        <ESTeamIconUploader src="/images/avatar.png" editable onChange={handleImageUpload} isUploading={isUploading} />

        <Box mt={4} />
        <ESInput
          id="team_name"
          autoFocus
          placeholder={'Inser your team name'}
          labelPrimary={'チーム名'}
          fullWidth
          required
          value={values.team_name}
          onChange={handleChange}
          helperText={touched.team_name && errors.team_name}
          error={touched.team_name && !!errors.team_name}
        />

        <Box mt={4} />
        <ESLabel label={'エントリーメンバー'} required />

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
            <Typography>{`メンバー${i + 1}${i === 0 ? '（あなた）' : ''}`}</Typography>
            <Typography>{values.members[i].name}</Typography>
            <Typography>{`${t('common:common.at')}${values.members[i].user_code}`}</Typography>
          </Box>
          <Box mt={2} />
          <ESInput
            id={`members.${i}.nickname`}
            autoFocus
            placeholder={'Inser your name'}
            fullWidth
            value={values.members[i].nickname}
            onChange={handleChange}
          />
        </Box>
      )
    }

    return elements
  }

  const nicknameChangeForm = () => (
    <Box>
      <Box className={classes.formContainer}>
        <ESLabel label={'エントリーネーム'} required />

        {renderMembersNicknameChanger()}
      </Box>
    </Box>
  )

  return (
    <Box>
      <Box className={classes.actionButton}>
        {tournament.attributes.is_entered ? (
          <ESButton variant="outlined" round fullWidth size="large" onClick={() => leave(tournament.attributes.hash_key)}>
            エントリーを辞退する
          </ESButton>
        ) : (
          <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
            エントリーする
          </ButtonPrimary>
        )}
      </Box>

      <StickyActionModal
        open={open}
        returnText={step === FINAL_STEP ? 'エントリーネームの設定' : 'エントリーする'}
        actionButtonText={step === FINAL_STEP ? '次へ' : '次へ'}
        actionButtonDisabled={!isValid}
        actionHintText={'次の画面でエントリーネームを変更できます'}
        onReturnClicked={handleReturn}
        onActionButtonClicked={handleActionButton}
      >
        <form onSubmit={handleActionButton}>{step === FINAL_STEP ? nicknameChangeForm() : teamCreateForm()}</form>
      </StickyActionModal>

      {(joinMeta.pending || leaveMeta.pending) && <ESLoader open={joinMeta.pending || leaveMeta.pending} />}
      {!!joinMeta.error && <ESToast open={!!joinMeta.error} message={'Failed to entry arena'} resetMeta={resetMeta} />}
      {!!leaveMeta.error && <ESToast open={!!leaveMeta.error} message={'Failed to leave arena'} resetMeta={resetMeta} />}
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

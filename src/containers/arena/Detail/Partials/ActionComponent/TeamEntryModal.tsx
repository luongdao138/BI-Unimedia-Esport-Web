import React, { useEffect } from 'react'
import { TeamJoinBase, TeamMember, TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import Yup from '@utils/Yup'
import useSuggestedTeamMembers from './useSuggestedTeamMembers'
import ESLabel from '@components/Label'
import useUploadImage from '@utils/hooks/useUploadImage'
import ESTeamIconUploader from '@components/TeamIconUploader'
import useEntry from './useEntry'
import _ from 'lodash'
import ESLoader from '@components/FullScreenLoader'
import TeamEntryMemberList from './TeamEntryMemberList'
import useTeamSelectedMember from './useTeamSelectedMember'
import { TeamMemberSelectItem, MemberSelection } from '@store/arena/actions/types'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import useDocTitle from '@utils/hooks/useDocTitle'
import ServerError from './ServerError'
import { FocusContext, FocusContextProvider } from '@utils/hooks/input-focus-context'

interface TeamEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  onClose: () => void
  isEdit?: boolean
  initialData?: {
    team_id: string
    team_name: string
    team_icon_url: string
    members: TeamMemberSelectItem[]
  }
  updateDone?: () => void
  open: boolean
}

const TeamEntryModal: React.FC<TeamEntryModalProps> = ({ tournament, userProfile, onClose, open, isEdit, initialData, updateDone }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [isUploading, setUploading] = useState(false)
  const { resetMeta } = useSuggestedTeamMembers()
  const teamMemberHook = useTeamSelectedMember()
  const { uploadArenaTeamImage } = useUploadImage()
  const { join, joinMeta, updateTeam, updateTeamMeta, resetJoinMeta, resetUpdateTeamMeta } = useEntry()
  const { checkNgWordByField } = useCheckNgWord()
  const dispatch = useAppDispatch()
  const { resetTitle, changeTitle } = useDocTitle()

  const isPending = joinMeta.pending || updateTeamMeta.pending

  useEffect(() => {
    if (joinMeta.loaded) onClose()
  }, [joinMeta.loaded])

  useEffect(() => {
    if (open) {
      changeTitle(`${t('common:page_head.arena_entry_title')}｜${tournament?.attributes?.title || ''}`)
    }

    return () => {
      if (open) {
        resetTitle()
        resetMeta()
        resetUpdateTeamMeta()
        resetJoinMeta()
        formik.setValues({ id: '', team_name: '', team_icon_url: '', members: [] })
      }
    }
  }, [open])

  useEffect(() => {
    if (updateTeamMeta.loaded) {
      onClose()
      if (updateTeamMeta.loaded && _.isFunction(updateDone)) {
        updateDone()
      }
    }
  }, [updateTeamMeta.loaded])

  useEffect(() => {
    if (userProfile) {
      formik.validateForm()
    } else {
      formik.resetForm()
    }
  }, [userProfile])

  useEffect(() => {
    if (isEdit && _.isArray(initialData.members)) {
      const newMemberSelections = [] as MemberSelection[]
      for (let i = 1; i < initialData.members.length; i++) {
        const initMember = initialData.members[i]
        newMemberSelections.push({
          index: i + 1,
          item: { ...initMember },
        })
      }
      teamMemberHook.setSelectedMembers(newMemberSelections)
    }
  }, [isEdit, initialData])

  const membersValidationSchema = Yup.object().shape({
    name: Yup.string().required(t('common:common.input_required')).max(40),
  })

  const validationSchema = Yup.object().shape({
    team_name: Yup.string().required(t('common:common.input_required')).max(40),
    team_icon_url: Yup.string().nullable(),
    members: Yup.array().of(membersValidationSchema),
  })

  const teamSize = _.get(tournament, 'attributes.participant_type', 0)
  const selectedMembers = teamMemberHook.selectedMembers

  const isMembersComplete = () => {
    if (teamSize !== selectedMembers.length + 1) return false
    return selectedMembers.every((item) => _.isObject(item.item))
  }

  const formik = useFormik<TeamJoinBase>({
    initialValues: {
      team_name: isEdit ? initialData.team_name : '',
      team_icon_url: isEdit ? initialData.team_icon_url : '',
      members: isEdit
        ? initialData.members.map((member) => ({ name: member.name }))
        : Array.from({ length: teamSize }, (__, index) => ({
            name: index === 0 ? _.get(userProfile, 'attributes.nickname', '') : '',
          })),
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      if (formik.isValid && isMembersComplete()) {
        const values = formik.values
        const newMembers: TeamMember[] = []
        for (let i = 1; i < values.members.length; i++) {
          const selected = selectedMembers.find((member) => member.index === i + 1)
          newMembers.push({
            user_id: parseInt(selected.item.id),
            name: values.members[i].name,
          })
        }
        if (isEdit) {
          updateTeam({
            id: initialData.team_id,
            data: {
              leader_name: _.get(values, 'members[0].name'),
              team_name: values.team_name,
              team_icon_url: values.team_icon_url,
              members: newMembers.map((member) => ({ user_id: Number(member.user_id), name: member.name })),
            },
          })
        } else {
          join({
            hash_key: tournament.attributes.hash_key,
            data: { ...values, members: newMembers, leader_name: _.get(values, 'members[0].name') },
          })
        }
      }
    },
  })

  const handleActionButton = () => {
    let fields = { [NG_WORD_AREA.team_name]: formik.values.team_name }

    formik.values.members.forEach((member, i) => {
      fields = { ...fields, [`メンバー${i + 1}`]: member.name }
    })

    const ngFields = checkNgWordByField(fields)
    if (!!ngFields && ngFields.length > 0) {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: ngFields.join(', ') }))
    } else {
      formik.handleSubmit()
    }
  }

  const handleImageUpload = (file: File) => {
    setUploading(true)

    uploadArenaTeamImage(file, undefined, 1, true, (imageUrl) => {
      setUploading(false)
      formik.setFieldValue('team_icon_url', imageUrl)
    })
  }

  const setSelectedMember = (selection: MemberSelection) => {
    const newMembers = [...formik.values.members]
    newMembers[selection.index - 1] = { name: selection.item.nickname }
    formik.setFieldValue(`members`, newMembers)
    teamMemberHook.setSelectedMember(selection)
  }

  const { values, handleChange, errors } = formik
  return (
    <FocusContextProvider>
      <FocusContext.Consumer>
        {({ isFocused, focusEvent }) => (
          <>
            <StickyActionModal
              open={open}
              returnText={isEdit ? t('common:tournament.update_entry_info') : t('common:tournament.join')}
              actionButtonText={isEdit ? t('common:arena.update_with_content') : t('common:tournament.join_with_this')}
              actionButtonDisabled={!formik.isValid || !isMembersComplete()}
              onReturnClicked={onClose}
              onActionButtonClicked={handleActionButton}
              hideFooterOnMobile={isFocused}
            >
              <Box mt={2} />
              {!!joinMeta.error && <ServerError message={t('common:error.join_arena_failed')} />}
              {!!updateTeamMeta.error && <ServerError message={t('common:error.edit_entry_failed')} />}
              <form onSubmit={handleActionButton}>
                <Box mt={4}>
                  <BlackBox>
                    <DetailInfo detail={tournament} />
                  </BlackBox>

                  <Box className={classes.formContainer}>
                    <ESLabel label={t('common:icon')} />
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
                      helperText={errors.team_name}
                      {...focusEvent}
                    />

                    <Box mt={4} />
                    <ESLabel label={t('common:tournament.entry_members')} required />

                    <TeamEntryMemberList
                      tournament={tournament}
                      userProfile={userProfile}
                      formik={formik}
                      setSelectedMember={setSelectedMember}
                      removeSelectedMember={teamMemberHook.removeSelectedMember}
                      getSelectedMember={teamMemberHook.getSelectedMember}
                      selectedMembers={teamMemberHook.selectedMembers}
                      isEdit={isEdit === true}
                    />
                  </Box>
                </Box>
              </form>
            </StickyActionModal>

            {isPending && <ESLoader open={isPending} />}
          </>
        )}
      </FocusContext.Consumer>
    </FocusContextProvider>
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

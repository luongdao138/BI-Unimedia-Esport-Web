import React, { useEffect } from 'react'
import { ParticipantName, TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import StickyActionModal from '@components/StickyActionModal'
import ESLoader from '@components/FullScreenLoader'
import ESButton from '@components/Button'
import { useFormik } from 'formik'
import useParticipantDetail from './useParticipantDetail'
import UserListItem from '@components/UserItem'
import _ from 'lodash'
import ESInput from '@components/Input'
import Yup from '@utils/Yup'
import { ROLE } from '@constants/tournament.constants'
import useDocTitle from '@utils/hooks/useDocTitle'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'
import ServerError from './ServerError'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { FocusContext, FocusContextProvider } from '@utils/hooks/input-focus-context'
import i18n from '@locales/i18n'
import CharacterLimited from '@components/CharacterLimited'
import { CommonHelper } from '@utils/helpers/CommonHelper'

interface EntryEditModalProps {
  tournament: TournamentDetail
  previewMode?: boolean
  initialParticipantId?: string
  me: boolean
  onClose: () => void
  toDetail?: () => void
  open: boolean
}

const InidividualEntryEditModal: React.FC<EntryEditModalProps> = ({
  tournament,
  previewMode,
  initialParticipantId,
  me,
  onClose,
  open,
  toDetail,
}) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { participant, isPending, getParticipant, changeName, changeMeta, resetMeta } = useParticipantDetail()
  const { isRecruiting } = useArenaHelper(tournament)
  const [editMode, setEditMode] = useState(false)
  const isPreview = previewMode === true
  const { resetTitle, changeTitle } = useDocTitle()
  const { checkNgWord } = useCheckNgWord()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required(t('common:common.input_required'))
      .test('empty-check', i18n.t('common:common.input_incorrect'), (val) => {
        if (val && val.length > 0 && val.trim().length === 0) return false
        return true
      })
      .max(40),
  })
  const { values, errors, isValid, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      nickname: '',
    },
    validationSchema,
    onSubmit: (_values) => {
      if (values.nickname) {
        if (_.isEmpty(checkNgWord(values.nickname))) {
          changeName(tournament.attributes.hash_key, values.nickname.trim(), () => onClose())
        } else {
          dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.join_nickname }))
        }
      }
    },
  })

  const getPid = () => {
    const myInfoList = _.get(tournament, 'attributes.my_info', [])
    if (!_.isArray(myInfoList)) return
    for (const myInfo of myInfoList) {
      const role = _.get(myInfo, 'role', '')
      if ((role === ROLE.INTERESTED || role === ROLE.PARTICIPANT) && _.get(myInfo, 'is_leader', '') === true) return myInfo.id
    }
  }

  useEffect(() => {
    if (isPreview && open) {
      setEditMode(false)
      changeTitle(`${t('common:page_head.arena_entry_title')}???${tournament?.attributes?.title || ''}`)
      const pId = initialParticipantId ? parseInt(initialParticipantId) : getPid()
      getParticipant(_.get(tournament, 'attributes.hash_key', ''), pId)
    }

    return () => {
      if (open) {
        setEditMode(false)
        resetTitle()
        resetMeta()
      }
    }
  }, [isPreview, open])

  useEffect(() => {
    if (participant) {
      setFieldValue('nickname', _.get(participant, 'attributes.name', ''))
    }
  }, [participant])

  const onSubmit = (param?) => {
    if (!editMode) {
      setEditMode(true)
    } else {
      handleSubmit(param)
    }
  }

  const userData = (participant) => {
    const _user = _.get(participant, 'attributes.user', {})
    return {
      id: _user.id,
      attributes: {
        ..._user,
        nickname: _.get(participant, 'attributes.name', ''),
        avatar: _.get(participant, 'attributes.avatar_url', ''),
      },
    }
  }

  const onUserClick = (participant: ParticipantName) => {
    const userCode = _.get(participant, 'attributes.user.user_code')
    if (_.isString(userCode)) {
      CommonHelper.checkUserCode(userCode, () => {
        router.push(`${ESRoutes.PROFILE}/${userCode}`)
      })
    }
  }

  const handleReturn = () => {
    if (editMode) setEditMode(false)
    else onClose()
  }

  return (
    <FocusContextProvider>
      <FocusContext.Consumer>
        {({ isFocused, focusEvent }) => (
          <>
            <StickyActionModal
              open={open}
              returnText={editMode ? t('common:tournament.update_entry_info') : t('common:arena.entry_information')}
              actionButtonText={editMode ? t('common:arena.update_with_content') : t('common:tournament.update_entry_info')}
              actionButtonDisabled={!isValid}
              onReturnClicked={handleReturn}
              onActionButtonClicked={onSubmit}
              hideFooter={!me || !isRecruiting}
              hideFooterOnMobile={isFocused}
            >
              {!!changeMeta.error && <ServerError message={t('common:error.edit_entry_failed')} />}
              <Box mt={3} />
              <form onSubmit={onSubmit}>
                <BlackBox>
                  <DetailInfo
                    detail={tournament}
                    bottomButton={
                      <ESButton
                        className={classes.bottomButton}
                        variant="outlined"
                        round
                        size="large"
                        onClick={toDetail ? toDetail : onClose}
                      >
                        {t('common:tournament.tournament_detail')}
                      </ESButton>
                    }
                  />
                </BlackBox>

                {editMode ? (
                  <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={4}>
                    <Box>
                      <ESInput
                        id="nickname"
                        autoFocus
                        labelPrimary={t('common:tournament.join_nickname')}
                        fullWidth
                        value={values.nickname}
                        onChange={handleChange}
                        helperText={errors.nickname}
                        error={!!errors.nickname}
                        required
                        {...focusEvent}
                        endAdornment={<CharacterLimited value={values.nickname} limit={40} />}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Box width="100%" flexDirection="column" alignItems="center" pt={4.5} style={isPending ? { display: 'none' } : undefined}>
                    <UserListItem data={userData(participant)} handleClick={() => onUserClick(participant)} nicknameYellow={me} />
                  </Box>
                )}
              </form>
              {isPending && <ESLoader open={isPending} />}
            </StickyActionModal>
          </>
        )}
      </FocusContext.Consumer>
    </FocusContextProvider>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  bottomButton: {
    borderRadius: 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(7),
    paddingRight: theme.spacing(7),
  },
}))

InidividualEntryEditModal.defaultProps = {
  previewMode: true,
}

export default InidividualEntryEditModal

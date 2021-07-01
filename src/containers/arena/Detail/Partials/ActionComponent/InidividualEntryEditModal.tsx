import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ButtonPrimary from '@components/ButtonPrimary'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import StickyActionModal from '@components/StickyActionModal'
import ESLoader from '@components/FullScreenLoader'
import ESButton from '@components/Button'
import { useFormik } from 'formik'
import useParticipantDetail from './useParticipantDetail'
import UserListItem from '@components/UserItem'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import _ from 'lodash'
import ESInput from '@components/Input'
import { useStore } from 'react-redux'
import * as Yup from 'yup'
import { ROLE } from '@constants/tournament.constants'

interface EntryEditModalProps {
  tournament: TournamentDetail
  previewMode?: boolean
  initialParticipantId?: string
  me: boolean
  onClose?: () => void
}

const InidividualEntryEditModal: React.FC<EntryEditModalProps> = ({ tournament, previewMode, initialParticipantId, me, onClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const { participant, isPending, getParticipant, changeName, changeDone } = useParticipantDetail()
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const isPreview = previewMode === true
  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required(t('common:common.error'))
      .max(40, t('common:common.too_long'))
      .test('nickname', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })
  const { values, errors, touched, isValid, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      nickname: '',
    },
    validationSchema,
    onSubmit: (_values) => {
      if (values.nickname) {
        changeName(tournament.attributes.hash_key, values.nickname)
      }
    },
  })

  const getPid = () => {
    const myInfoList = _.get(tournament, 'attributes.my_info', [])
    if (!_.isArray(myInfoList)) return
    for (const myInfo of myInfoList) {
      if (_.get(myInfo, 'role', '') === ROLE.INTERESTED && _.get(myInfo, 'is_leader', '') === true) return myInfo.id
    }
  }

  useEffect(() => {
    if (open) {
      getParticipant(_.get(tournament, 'attributes.hash_key', ''), getPid())
    }
  }, [open])

  useEffect(() => {
    if (isPreview) {
      const pId = parseInt(initialParticipantId)
      getParticipant(_.get(tournament, 'attributes.hash_key', ''), pId)
    }
  }, [isPreview])

  useEffect(() => {
    setOpen(false)
    setEditMode(false)
  }, [changeDone])

  useEffect(() => {
    if (participant) {
      setFieldValue('nickname', _.get(participant, 'attributes.name', ''))
    }
  }, [participant])

  const handleReturn = () => {
    if (_.isFunction(onClose)) {
      onClose()
    }
    setOpen(false)
  }

  const onOpen = () => {
    setOpen(true)
    setEditMode(false)
  }

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
  return (
    <Box>
      {isPreview ? null : (
        <ButtonPrimary round fullWidth onClick={onOpen}>
          {t('common:tournament.check_entry')}
        </ButtonPrimary>
      )}

      <StickyActionModal
        open={open || isPreview}
        returnText={t('common:tournament.join')}
        actionButtonText={editMode ? t('common:tournament.join_with_this') : t('common:tournament.update_entry_nick')}
        actionButtonDisabled={!isValid}
        onReturnClicked={handleReturn}
        onActionButtonClicked={onSubmit}
        hideFooter={!me}
      >
        <form onSubmit={onSubmit}>
          <BlackBox>
            <DetailInfo
              detail={tournament}
              bottomButton={
                <ESButton className={classes.bottomButton} variant="outlined" round size="large" onClick={() => setOpen(false)}>
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
                  helperText={touched.nickname && errors.nickname}
                  error={touched.nickname && !!errors.nickname}
                  required
                />
              </Box>
            </Box>
          ) : (
            <Box width="100%" flexDirection="column" alignItems="center" pt={4.5} style={isPending ? { display: 'none' } : undefined}>
              <UserListItem data={userData(participant)} handleClick={() => null} nicknameYellow={me} />
            </Box>
          )}
        </form>
        {isPending && <ESLoader open={isPending} />}
      </StickyActionModal>
    </Box>
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

export default InidividualEntryEditModal

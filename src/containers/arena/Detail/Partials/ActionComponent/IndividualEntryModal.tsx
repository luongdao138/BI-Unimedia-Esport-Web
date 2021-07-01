import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Box } from '@material-ui/core'
import ESInput from '@components/Input'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import * as Yup from 'yup'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import _ from 'lodash'

interface IndividualEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  onClose: () => void
  open: boolean
}

const IndividualEntryModal: React.FC<IndividualEntryModalProps> = ({ tournament, userProfile, onClose, open }) => {
  const { t } = useTranslation(['common'])
  const { join, joinMeta } = useEntry()

  useEffect(() => {
    if (joinMeta.loaded || joinMeta.error) {
      onClose()
    }
  }, [joinMeta.loaded, joinMeta.error])
  const { checkNgWord } = useCheckNgWord()
  const dispatch = useAppDispatch()

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().required(t('common:common.error')).max(40, t('common:common.too_long')),
  })

  const { values, errors, touched, isValid, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      nickname: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.nickname) {
        if (_.isEmpty(checkNgWord(values.nickname))) {
          join({ hash_key: tournament.attributes.hash_key, data: { name: values.nickname } })
        } else {
          dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.join_nickname }))
        }
      }
    },
  })

  useEffect(() => {
    if (open) setFieldValue('nickname', userProfile ? userProfile.attributes.nickname : '')
  }, [open])

  return (
    <Box>
      <StickyActionModal
        open={open}
        returnText={t('common:tournament.join')}
        actionButtonText={t('common:tournament.join_with_this')}
        actionButtonDisabled={!isValid}
        onReturnClicked={onClose}
        onActionButtonClicked={handleSubmit}
      >
        <form onSubmit={handleSubmit}>
          <BlackBox>
            <DetailInfo detail={tournament} />
          </BlackBox>

          <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8}>
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
              />
            </Box>
          </Box>
        </form>
      </StickyActionModal>

      {joinMeta.pending && <ESLoader open={joinMeta.pending} />}
    </Box>
  )
}

export default IndividualEntryModal

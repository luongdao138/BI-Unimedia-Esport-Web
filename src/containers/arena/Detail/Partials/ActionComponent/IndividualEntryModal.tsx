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
import Yup from '@utils/Yup'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import _ from 'lodash'
import useDocTitle from '@utils/hooks/useDocTitle'
import ServerError from './ServerError'
import { FocusContext, FocusContextProvider } from '@utils/hooks/input-focus-context'

interface IndividualEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  onClose: () => void
  open: boolean
}

const IndividualEntryModal: React.FC<IndividualEntryModalProps> = ({ tournament, userProfile, onClose, open }) => {
  const { t } = useTranslation(['common'])
  const { join, joinMeta, resetJoinMeta } = useEntry()
  const { resetTitle, changeTitle } = useDocTitle()

  useEffect(() => {
    if (joinMeta.loaded) {
      handleClose()
    }
  }, [joinMeta.loaded])
  const { checkNgWord } = useCheckNgWord()
  const dispatch = useAppDispatch()

  const validationSchema = Yup.object().shape({
    nickname: Yup.string().required(t('common:common.input_required')).max(40),
  })

  const { values, errors, isValid, handleSubmit, handleChange, setFieldValue } = useFormik({
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
    if (open) {
      setFieldValue('nickname', userProfile ? userProfile.attributes.nickname : '')
      changeTitle(`${t('common:page_head.arena_entry_title')}｜${tournament?.attributes?.title || ''}`)
    }
  }, [open])

  useEffect(() => {
    return () => resetTitle()
  }, [])

  const handleClose = () => {
    resetJoinMeta()
    resetTitle()
    onClose()
  }

  return (
    <FocusContextProvider>
      <FocusContext.Consumer>
        {({ isFocused, focusEvent }) => (
          <>
            <StickyActionModal
              open={open}
              returnText={t('common:tournament.join')}
              actionButtonText={t('common:tournament.join_with_this')}
              actionButtonDisabled={!isValid}
              onReturnClicked={handleClose}
              onActionButtonClicked={handleSubmit}
              hideFooterOnMobile={isFocused}
            >
              {!!joinMeta.error && <ServerError message={t('common:error.join_arena_failed')} />}
              <Box mt={3} />
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
                      helperText={errors.nickname}
                      error={!!errors.nickname}
                      {...focusEvent}
                    />
                  </Box>
                </Box>
              </form>
            </StickyActionModal>

            {joinMeta.pending && <ESLoader open={joinMeta.pending} />}
          </>
        )}
      </FocusContext.Consumer>
    </FocusContextProvider>
  )
}

export default IndividualEntryModal

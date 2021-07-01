import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/arena/Detail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import * as Yup from 'yup'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'
import UnjoinModal from './UnjoinModal'
import InidividualEntryEditModal from './InidividualEntryEditModal'
import LoginRequired from '@containers/LoginRequired'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import _ from 'lodash'

interface IndividualEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  handleClose: () => void
  hideUnjoin?: boolean
}

const IndividualEntryModal: React.FC<IndividualEntryModalProps> = ({ tournament, userProfile, handleClose, hideUnjoin }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { join, joinMeta } = useEntry()

  const showUnjoin = !(hideUnjoin === true)

  useEffect(() => {
    if (joinMeta.loaded || joinMeta.error) {
      setOpen(false)
      handleClose()
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

  const handleReturn = () => setOpen(false)

  return (
    <Box>
      <LoginRequired>
        <Box className={classes.actionButton}>
          {tournament.attributes.is_entered ? (
            <Box>
              <InidividualEntryEditModal tournament={tournament} me />
              {showUnjoin ? <UnjoinModal tournament={tournament} /> : null}
            </Box>
          ) : (
            <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
              {t('common:tournament.join')}
            </ButtonPrimary>
          )}
        </Box>
      </LoginRequired>

      <StickyActionModal
        open={open}
        returnText={t('common:tournament.join')}
        actionButtonText={t('common:tournament.join_with_this')}
        actionButtonDisabled={!isValid}
        onReturnClicked={handleReturn}
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

const useStyles = makeStyles((theme: Theme) => ({
  actionButton: {
    marginTop: theme.spacing(3),
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.spacing(35),
  },
}))

export default IndividualEntryModal

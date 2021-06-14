import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { useState } from 'react'
import ESButton from '@components/Button'
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
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import useEntry from './useEntry'
import ESLoader from '@components/FullScreenLoader'

interface IndividualEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  handleClose: () => void
}

const IndividualEntryModal: React.FC<IndividualEntryModalProps> = ({ tournament, userProfile, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const [open, setOpen] = useState(false)
  const { join, leave, joinMeta, leaveMeta } = useEntry()

  useEffect(() => {
    if (joinMeta.loaded || joinMeta.error) {
      setOpen(false)
      handleClose()
    }
  }, [joinMeta.loaded, joinMeta.error])

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
    onSubmit: (values) => {
      if (values.nickname) {
        join({ hash_key: tournament.attributes.hash_key, data: { name: values.nickname } })
      }
    },
  })

  useEffect(() => {
    if (open) setFieldValue('nickname', userProfile ? userProfile.attributes.nickname : '')
  }, [open])

  const handleReturn = () => setOpen(false)

  return (
    <Box>
      <Box className={classes.actionButton}>
        {tournament.attributes.is_entered ? (
          <ESButton variant="outlined" round fullWidth size="large" onClick={() => leave(tournament.attributes.hash_key)}>
            {t('common:tournament.unjoin')}
          </ESButton>
        ) : (
          <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
            {t('common:tournament.join')}
          </ButtonPrimary>
        )}
      </Box>

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

      {(joinMeta.pending || leaveMeta.pending) && <ESLoader open={joinMeta.pending || leaveMeta.pending} />}
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

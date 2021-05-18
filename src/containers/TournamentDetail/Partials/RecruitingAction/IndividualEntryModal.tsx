import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { useState } from 'react'
import ESButton from '@components/Button'
import { Box, makeStyles, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import BlackBox from '@components/BlackBox'
import DetailInfo from '@containers/TournamentDetail/Partials/DetailInfo'
import StickyActionModal from '@components/StickyActionModal'
import { UserProfile } from '@services/user.service'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'

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
        // eslint-disable-next-line no-console
        console.log('nickname', values.nickname)
        // TODO call endpoint here
        handleClose()
      }
    },
  })

  useEffect(() => {
    if (open) setFieldValue('nickname', userProfile ? userProfile.attributes.nickname : '')
  }, [open])

  const handleReturn = () => setOpen(false)

  return (
    <Box>
      <Box className={classes.actionButtonContainer}>
        <Box className={classes.actionButton}>
          <ButtonPrimary round fullWidth onClick={() => setOpen(true)}>
            エントリーする
          </ButtonPrimary>
        </Box>
        <Box className={classes.actionButton}>
          <ESButton variant="outlined" round fullWidth size="large" onClick={() => setOpen(true)}>
            エントリーを辞退する
          </ESButton>
        </Box>
      </Box>
      <StickyActionModal
        open={open}
        returnText={'エントリーする'}
        actionButtonText={'この内容でエントリーする'}
        actionButtonDisabled={!isValid}
        onReturnClicked={handleReturn}
        onActionButtonClicked={handleSubmit}
      >
        <form onSubmit={handleSubmit}>
          <BlackBox>
            <DetailInfo detail={tournament} />
          </BlackBox>

          <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
            <Box>
              <ESInput
                id="nickname"
                autoFocus
                placeholder={'Inser your name'}
                labelPrimary={'エントリーネーム'}
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
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid #ffffff30`,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    // width:
    // width: '100%',
    // margin: '0 auto',
  },
  container: {},
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
  //
  actionButton: {
    width: theme.spacing(35),
  },
}))

export default IndividualEntryModal

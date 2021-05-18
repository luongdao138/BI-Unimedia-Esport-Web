import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { useState } from 'react'
import ESButton from '@components/Button'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
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
import ProfileAvatar from '@components/ProfileAvatar'
import ESSimpleSelectInput from '@components/SimpleSelectInput'

interface TeamEntryModalProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  handleClose: () => void
}

const initMembers = [
  {
    id: 1,
    nickname: 'Long nickname Long nickname Long nickname Long nickname Long nickname ',
    avatar: 'https://robohash.org/consequaturquidemcorporis.png?size=50x50&set=set1',
    user_code: 'long usercode long usercode long usercode long usercode long usercode ',
  },
  {
    id: 2,
    nickname: 'Peggy',
    avatar: 'https://robohash.org/quosdoloremoccaecati.png?size=50x50&set=set1',
    user_code: 'pmeus1',
  },
  {
    id: 3,
    nickname: 'Katerine',
    avatar: 'https://robohash.org/eanihiltempore.png?size=50x50&set=set1',
    user_code: 'kgionettitti2',
  },
]

const FINAL_STEP = 1

const TeamEntryModal: React.FC<TeamEntryModalProps> = ({ tournament, userProfile, handleClose }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
      .required(t('common:common.error'))
      .max(40, t('common:common.too_long'))
      .test('nickname', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    members: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .max(40, t('common:common.too_long'))
          .test('nickname', 'at_least', function (value) {
            return CommonHelper.matchNgWords(store, value).length <= 0
          }),
      })
    ),
  })

  const { values, errors, touched, isValid, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      nickname: '',
      members: [],
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.nickname) {
        // eslint-disable-next-line no-console
        console.log('nickname', values.nickname)
        // TODO call endpoint here
        handleClose()
        setOpen(false)
      }
    },
  })

  useEffect(() => {
    if (open) {
      setStep(0)
      setFieldValue('nickname', userProfile ? userProfile.attributes.nickname : '')
    }
  }, [open])

  const handleReturn = () => {
    if (step === FINAL_STEP) {
      setStep(0)
    } else {
      setOpen(false)
    }
  }

  const teamMembers = [1, 2, 3, 4]

  // TODO use proper data later
  const [availableMembers, setAvailableMembers] = useState(initMembers)

  const handleSelectedMembers = (selectedMember) => {
    // eslint-disable-next-line no-console
    console.log(selectedMember)
    if (selectedMember) {
      const filteredMembers = availableMembers.filter((member) => member !== selectedMember)
      setAvailableMembers(filteredMembers)
    } else {
      // TODO X darsan user -iig butsaaj songoltod oruulah
      setAvailableMembers(initMembers)
    }
  }

  const handleActionButton = () => {
    if (step === FINAL_STEP) {
      handleSubmit()
    } else {
      setStep(1)
    }
  }

  const teamCreateForm = () => (
    <Box>
      <BlackBox>
        <DetailInfo detail={tournament} />
      </BlackBox>

      <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
        <Box display="flex" alignItems="center">
          <Typography component="span">{'アイコン'}</Typography>
          <Typography component="span" className={classes.required}>
            {t('common:common.required')}
          </Typography>
        </Box>

        <ProfileAvatar src="/images/avatar.png" editable />

        <Box>
          <ESInput
            id="nickname"
            autoFocus
            placeholder={'Inser your name'}
            labelPrimary={'チーム名'}
            fullWidth
            required
            value={values.nickname}
            onChange={handleChange}
            helperText={touched.nickname && errors.nickname}
            error={touched.nickname && !!errors.nickname}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <Typography component="span">{'エントリーメンバー'}</Typography>
          <Typography component="span" className={classes.required}>
            {t('common:common.required')}
          </Typography>
        </Box>

        {teamMembers.map((_, index) => {
          // TODO
          if (index === 0) {
            return (
              <Box key={index}>
                <Typography>{`メンバー${index}（あなた）`}</Typography>
                <Typography>{userProfile.attributes.nickname}</Typography>
              </Box>
            )
          }
          return (
            <Box key={index}>
              <ESSimpleSelectInput label={`メンバー${index}`} required items={availableMembers} onItemsSelected={handleSelectedMembers} />
            </Box>
          )
        })}
      </Box>
    </Box>
  )

  const nicknameChangeForm = () => (
    <Box>
      <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
        <Box display="flex" alignItems="center">
          <Typography component="span">{'エントリーネーム'}</Typography>
          <Typography component="span" className={classes.required}>
            {t('common:common.required')}
          </Typography>
        </Box>

        {teamMembers.map((_, index) => {
          // TODO
          return (
            <Box key={index}>
              <Box>
                <Typography>{`メンバー${index}（あなた）`}</Typography>
                <Typography>{userProfile.attributes.nickname}</Typography>
                <Typography>{`${t('common:common.at')}${userProfile.attributes.user_code}`}</Typography>
              </Box>
              <ESInput
                id={`member${index}`}
                autoFocus
                placeholder={'Inser your name'}
                fullWidth
                value={values.nickname}
                onChange={handleChange}
                helperText={touched.nickname && errors.nickname}
                error={touched.nickname && !!errors.nickname}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )

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
        returnText={step === FINAL_STEP ? 'エントリーネームの設定' : 'エントリーする'}
        actionButtonText={step === FINAL_STEP ? '次へ' : '次へ'}
        actionButtonDisabled={!isValid}
        onReturnClicked={handleReturn}
        onActionButtonClicked={handleActionButton}
      >
        <form onSubmit={handleActionButton}>{step === FINAL_STEP ? nicknameChangeForm() : teamCreateForm()}</form>
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
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
}))

export default TeamEntryModal

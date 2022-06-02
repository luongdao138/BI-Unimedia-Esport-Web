import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import SelectMemberItem from '@containers/StreamingSettingContainer/GiftMemberListContainer/SelectMemberItem'
import Footer from '@containers/StreamingSettingContainer/GiftMemberListContainer/footer'
import useGiftTarget from '@containers/StreamingGiftManagement/useGiftTarget'
import CharacterLimited from '@components/CharacterLimited'
import { useFormik } from 'formik'
import { CreateNewGiftGroupRequestBody } from '@services/gift.service'
import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import * as Yup from 'yup'
import { CreateMode } from '@containers/StreamingSettingContainer/GiftManageTab'
import { useStreamSettingContext } from '../StreamSettingContext'

const validationFormScheme = () => {
  const { t } = useTranslation('common')
  return Yup.object({
    title: Yup.string()
      .required(t('streaming_gift_management.validation.require'))
      .min(0, t('streaming_gift_management.validation.require'))
      .max(60, 'max_character_message')
      .trim(),
  })
}

type Props = {
  handleBackToListState?: () => void
  createMode?: CreateMode
}

const GiftMemberListContainer: React.FC<Props> = ({ handleBackToListState, createMode }) => {
  const [submitErrorMsg, setErrorMsg] = useState('')
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const { newGiftGroupGiftMasterList, createNewGiftGroup, resetNewGroupMasterList, giftGroupDetail } = useGiftTarget()
  const getNumberItemSelected = () => {
    return newGiftGroupGiftMasterList.length
  }
  const initialValues = () => {
    return {
      title: '',
    }
  }
  const { changeIsHideFooter } = useStreamSettingContext()

  const handleOnSuccessCallback = () => {
    if (createMode === CreateMode.CREATE) {
      dispatch(commonActions.addToast(t('streaming_setting_screen.member_list.create_group_success')))
    } else {
      dispatch(commonActions.addToast(t('streaming_setting_screen.member_list.edit_group_success')))
    }
    resetNewGroupMasterList()
    handleBackToListState()
  }

  const handleOnErrorCallback = (errorMsg) => {
    if (errorMsg === 'validation.group_item_valid') {
      setErrorMsg(t('streaming_setting_screen.member_list.create_group_failed_master_invalid'))
    }
  }

  const { values, setFieldValue, handleSubmit, errors, touched, handleBlur, setValues, validateForm, setErrors } = useFormik<
    CreateNewGiftGroupRequestBody
  >({
    initialValues: initialValues(),
    validationSchema: validationFormScheme(),
    onSubmit: ({ title }) => {
      setErrorMsg('')
      const requestData = {
        title,
        group_item: newGiftGroupGiftMasterList.map(({ master_uuid }) => master_uuid),
        ...(createMode === CreateMode.EDIT && { group_id: giftGroupDetail.group_uuid }),
      }
      createNewGiftGroup(requestData, handleOnSuccessCallback, handleOnErrorCallback)
    },
    validateOnMount: true,
  })

  useEffect(() => {
    if (createMode === CreateMode.EDIT && giftGroupDetail) {
      setValues({ title: giftGroupDetail.title })
      validateForm({ title: giftGroupDetail.title }).then((err) => {
        setErrors(err)
      })
    }
  }, [giftGroupDetail])

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue('title', event.target.value.slice(0, 60))
    },
    [setFieldValue]
  )

  const handleFocus = () => {
    if (isMobile) {
      changeIsHideFooter(true)
    }
  }

  const submitButtonDisabled = () => {
    if (errors?.title) {
      return true
    }
    if (createMode === CreateMode.EDIT) {
      return false
    }
    return getNumberItemSelected() === 0
  }

  return (
    <Box className={classes.container}>
      {/* {header()} */}
      <Box className={classes.header}>
        <Box className={classes.nameListLabelContainer}>
          <Typography className={classes.nameListLabel}>{t('streaming_setting_screen.member_list.name_list')}</Typography>
          <Typography className={classes.requireTag}>{t('streaming_setting_screen.member_list.require')}</Typography>
        </Box>
        <ESInput
          id="title"
          name="title"
          fullWidth
          placeholder={t('streaming_setting_screen.member_list.name_entered_place_holder')}
          className={classes.inputName}
          endAdornment={<CharacterLimited value={values.title} limit={60} />}
          value={values.title}
          onChange={handleTitleChange}
          onBlur={(e) => {
            changeIsHideFooter(false)
            handleBlur(e)
          }}
          helperText={touched.title && errors.title}
          error={touched.title && !!errors.title}
          onFocus={handleFocus}
        />
      </Box>
      <Box className={classes.listContainer}>
        {newGiftGroupGiftMasterList.length > 0 ? (
          <Box className={classes.listWithDataContainer}>
            {newGiftGroupGiftMasterList.map((item, index) => {
              return <SelectMemberItem key={`listWithData-${index}`} item={item} />
            })}
          </Box>
        ) : (
          <Box className={classes.emptyView}>
            <Typography className={classes.emptyViewMessage}>{t('streaming_setting_screen.member_list.empty_view_message')}</Typography>
          </Box>
        )}
      </Box>
      <Footer
        onConfirm={handleSubmit}
        onCancel={handleBackToListState}
        confirmDisable={submitButtonDisabled()}
        errorMessage={submitErrorMsg}
      />
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: '4px',
    paddingLeft: '20px',
  },
  container: {
    marginTop: '32px',
    display: 'flex',
    flexDirection: 'column',
    // paddingLeft: '20px',
    paddingRight: '20px',
  },
  nameListLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameListLabel: {
    fontSize: '14px',
    color: Colors.white['70'],
  },
  requireTag: {
    fontSize: '10px',
    color: Colors.white,
    backgroundColor: Colors.primary,
    padding: '1px 4px',
    borderRadius: '5px',
    marginLeft: '8px',
  },
  inputName: {
    marginTop: '8px',
  },
  listContainer: {
    height: 'calc(100vh - 482px)',
    marginTop: '16px',
    marginLeft: '20px',
    backgroundColor: Colors.black,
    borderRadius: '5px',
    border: `1px solid ${Colors.white_opacity['30']}`,
    display: 'flex',
  },
  emptyViewMessage: {
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    fontSize: '14px',
    color: Colors.white_opacity['70'],
  },
  emptyView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listWithDataContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 24px',
    margin: '24px 0',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222222',
      borderRadius: 6,
    },
    overflowX: 'hidden',
    overflow: 'scroll',
  },
  [theme.breakpoints.down('sm')]: {
    listWithDataContainer: {
      padding: '0 8px',
    },
    listContainer: {
      minHeight: '307px',
    },
  },
  [theme.breakpoints.down(1200)]: {
    container: {
      // marginRight: '48px',
    },
  },
  [theme.breakpoints.down(768)]: {
    container: {
      marginRight: 0,
    },
  },
}))

export default memo(GiftMemberListContainer)

import { Box, FormControlLabel, makeStyles, Radio, RadioGroup, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { FC, useEffect } from 'react'
import { Colors } from '@theme/colors'
import ESInput from '@components/Input'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import { validationTargetPerson } from './ValidationPersonTarget'
import useGiftManage from './useGiftTarget'
import CharacterLimited from '@components/CharacterLimited'
import { v4 as uuidv4 } from 'uuid'
import { MODE } from '.'
import _ from 'lodash'

interface PersonTargetProps {
  handleSuccess: () => void
  mode: string
  idTargetPerson: string
  handleClose: () => void
}

const PersonTarget: FC<PersonTargetProps> = ({ handleSuccess, mode, idTargetPerson, handleClose }): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(414))
  const { addTargetPerson, checkSnsUrl, giftTargetData, updateTargetPerson, checkNgWordTargetPerson } = useGiftManage()

  const targetPersonId = uuidv4()

  const validateSnsSuccess = () => {
    if (mode === MODE.ADD) {
      addTargetPerson({ id: targetPersonId, ...values })
      handleSuccess()
    } else {
      const itemUpdate = giftTargetData.find((i) => i.id === idTargetPerson)
      updateTargetPerson({ id: itemUpdate.id, ...values })
      handleSuccess()
    }
  }

  const validateError = () => {
    setFieldError('sns_url', `登録済みの${values.sns_url}です`)
  }

  const onSuccessSubmit = () => {
    if (mode === MODE.ADD) {
      checkSnsUrl(values, validateSnsSuccess, validateError)
    } else if (mode === MODE.UPDATE) {
      const itemUpdate = giftTargetData.find((i) => i.id === idTargetPerson)
      if (itemUpdate.sns_url != values.sns_url) {
        checkSnsUrl(values, validateSnsSuccess, validateError)
      } else {
        //TODO: call function update

        updateTargetPerson({ id: itemUpdate.id, ...values })
        handleSuccess()
      }
    }
  }

  const formik = useFormik({
    initialValues: { target_value: t('streaming_gift_management.team_title'), target_name: '', sns_url: '' },
    validationSchema: validationTargetPerson,
    onSubmit: () => {
      checkNgWordTargetPerson(
        {
          target_name: formik.values.target_name,
          sns_url: formik.values.sns_url,
        },
        onSuccessSubmit
      )
    },
  })

  const { values, errors, touched, handleBlur, setFieldValue, setValues, handleSubmit, setFieldError } = formik

  useEffect(() => {
    if (mode === MODE.UPDATE) {
      if (giftTargetData) {
        const itemUpdate = giftTargetData.find((i) => i.id === idTargetPerson)
        setValues({
          target_value: itemUpdate.target_value,
          target_name: itemUpdate.target_name,
          sns_url: itemUpdate.sns_url,
        })
      }
    }
  }, [giftTargetData])

  const handleChangeTargetValue = (event) => {
    setFieldValue('target_value', event.target.value)
  }
  const handleChangeTargetName = (event) => {
    setFieldValue('target_name', event.target.value)
  }
  const handleChangeSnsUrl = (event) => {
    setFieldValue('sns_url', event.target.value)
  }
  const disabledBtn = !formik.isValid || !formik.dirty

  const getMasterIndex = () => {
    if (mode === MODE.ADD) {
      return giftTargetData.length + 1
    }
    const index = _.findIndex(giftTargetData, (item) => item.id === idTargetPerson)
    return index + 1
  }

  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <span className={classes.label}>
        {isMobile ? t('streaming_gift_management.add_information_message_md') : t('streaming_gift_management.add_information_message')}
      </span>
      <Box className={classes.contentContainer}>
        <Typography className={classes.title}>{`${t('streaming_gift_management.target_no')}${getMasterIndex()}`}</Typography>
        <Box className={classes.formContainer}>
          <ESLabel label={t('streaming_gift_management.team_or_individual')} required size={'small'} bold />
          <Box className={classes.wrap_check_box}>
            <RadioGroup
              row
              defaultValue={t('streaming_gift_management.team_title')}
              name="target_value"
              className={classes.radioGroup}
              value={values?.target_value}
              onChange={handleChangeTargetValue}
            >
              <FormControlLabel
                value={t('streaming_gift_management.team_title')}
                control={<Radio color="primary" />}
                label={t('streaming_gift_management.team_title')}
                name="radio-button"
                // onChange={handleChangeTargetValue}
              />
              <FormControlLabel
                value={t('streaming_gift_management.individual_title')}
                control={<Radio color="primary" />}
                label={t('streaming_gift_management.individual_title')}
                name="radio-button"
                // onChange={handleChangeTargetValue}
              />
            </RadioGroup>
          </Box>
          <Box mt={1} />
          <ESInput
            required
            id="target_name"
            name="target_name"
            size="big"
            placeholder={t('streaming_gift_management.placeholder_target_person_name')}
            labelPrimary={t('streaming_gift_management.target_person_name')}
            fullWidth
            value={values?.target_name}
            onChange={handleChangeTargetName}
            onBlur={handleBlur}
            helperText={touched.target_name && errors?.target_name}
            error={touched.target_name && !!errors?.target_name}
            endAdornment={<CharacterLimited value={values.target_name} limit={50} />}
          />
          <Box mt={2} />
          <ESInput
            required
            id="sns_url"
            name="sns_url"
            size="big"
            placeholder={t('streaming_gift_management.sns_placeholder')}
            labelPrimary={t('streaming_gift_management.sns_url')}
            fullWidth
            value={values?.sns_url}
            onChange={handleChangeSnsUrl}
            onBlur={handleBlur}
            helperText={touched.sns_url && errors?.sns_url}
            error={touched.sns_url && !!errors?.sns_url}
          />
        </Box>
      </Box>
      <Box className={classes.buttonContainer}>
        <ButtonPrimary size="small" className={classes.closeButton} gradient={false} onClick={handleClose}>
          {t('streaming_gift_management.close')}
        </ButtonPrimary>
        <ButtonPrimary type="submit" size="small" className={classes.saveButton} gradient={false} disabled={disabledBtn}>
          {t('streaming_gift_management.txt_save_button')}
        </ButtonPrimary>
      </Box>
    </form>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '32px',
  },
  contentContainer: {
    display: 'flex',
    width: '606px',
    border: `1px solid ${Colors.white_opacity['30']}`,
    borderRadius: '5px',
    backgroundColor: '#161616',
    flexDirection: 'column',
    '&:first-child': {
      marginTop: '32px',
    },
    margin: '32px 83px 0px 83px',
  },
  formContainer: {
    paddingLeft: 56,
    paddingTop: 24,
    paddingBottom: 24,
    paddingRight: 56,
  },
  saveButton: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    marginLeft: '8px',
    marginRight: '8px',
  },
  closeButton: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    marginLeft: '8px',
    marginRight: '8px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '46px',
    marginBottom: '46px',
  },
  title: {
    margin: '24px 0px 0px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  wrap_check_box: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: Colors.white_opacity['70'],
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  [theme.breakpoints.down('md')]: {
    container: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '24px',
      margin: '0px 24px 0px 24px',
    },
    contentContainer: {
      display: 'flex',
      width: '100%',
      maxWidth: '606px',
      alignContent: 'center',
      margin: '24px 24px 0px 24px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    formContainer: {
      paddingTop: '24px',
      paddingLeft: '8px',
      paddingBottom: '16px',
      paddingRight: '8px',
    },
    title: {
      margin: '8px 0px 0px 8px',
    },
    label: {
      margin: '0 24px',
    },
    buttonContainer: {
      marginTop: '32px',
      marginBottom: '184px',
    },
  },
  [theme.breakpoints.down(414)]: {
    container: {
      width: '100%',
      margin: '0px 16px 0px 16px',
    },
    contentContainer: {
      display: 'flex',
      width: '100%',
      alignContent: 'center',
      margin: '24px 16px 0px 16px',
    },
    formContainer: {
      paddingTop: '24px',
      paddingLeft: '8px',
      paddingBottom: '16px',
      paddingRight: '8px',
    },
    title: {
      margin: '8px 0px 0px 8px',
    },
    label: {
      margin: '0 24px 0 24px',
      flexWrap: 'wrap',
    },
    buttonContainer: {
      marginTop: '32px',
      flexDirection: 'column',
    },
    closeButton: {
      marginBottom: '16px',
    },
  },
}))

export default PersonTarget

import { Box, FormControlLabel, makeStyles, Radio, RadioGroup, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ButtonPrimary from '@components/ButtonPrimary'
import React, { FC } from 'react'
import { Colors } from '@theme/colors'
import ESInput from '@components/Input'
import ESLabel from '@components/Label'
import { useFormik } from 'formik'
import { validationAddTargetPerson } from './ValidationAddPersonTarget'

interface AddPersonTargetProps {
  handleAdd: () => void
}
const AddPersonTarget: FC<AddPersonTargetProps> = ({ handleAdd }): JSX.Element => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(414))
  const initialValues = {
    target_value: t('streaming_gift_management.team_title'),
    target_name: '',
    sns_url: '',
  }
  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: validationAddTargetPerson,
    enableReinitialize: true,
    onSubmit: () => {
      // onSubmit(values)
    },
  })
  const { values, errors, touched, handleBlur, setFieldValue, setErrors } = formik

  const handleChangeTargetValue = (event) => {
    setErrors({})
    setFieldValue('target_value', event.target.value)
  }
  const handleChangeTargetName = (event) => {
    setErrors({})
    setFieldValue('target_name', event.target.value)
  }
  const handleChangeSnsUrl = (event) => {
    setErrors({})
    setFieldValue('sns_url', event.target.value)
  }
  return (
    <form onSubmit={formik.handleSubmit} className={classes.container}>
      <span className={classes.label}>
        {isMobile ? t('streaming_gift_management.add_information_message_md') : t('streaming_gift_management.add_information_message')}
      </span>
      <Box className={classes.contentContainer}>
        <Typography className={classes.title}>{`${t('streaming_gift_management.target_no')}${1}`}</Typography>
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
            id="target_name"
            name="target_name"
            required={true}
            size="big"
            placeholder={t('streaming_gift_management.placeholder_target_person_name')}
            labelPrimary={t('streaming_gift_management.target_person_name')}
            fullWidth
            value={formik.values?.target_name}
            onChange={handleChangeTargetName}
            onBlur={handleBlur}
            helperText={touched.target_name && errors?.target_name}
            error={touched.target_name && !!errors?.target_name}
          />
          <Box mt={2} />
          <ESInput
            id="sns_url"
            name="sns_url"
            required={true}
            size="big"
            placeholder={t('streaming_gift_management.sns_placeholder')}
            labelPrimary={t('streaming_gift_management.sns_url')}
            fullWidth
            value={formik.values?.sns_url}
            onChange={handleChangeSnsUrl}
            onBlur={handleBlur}
            helperText={touched.sns_url && errors?.sns_url}
            error={touched.sns_url && !!errors?.sns_url}
          />
        </Box>
      </Box>
      <ButtonPrimary size="small" className={classes.buttonContainer} gradient={false} onClick={handleAdd}>
        {t('streaming_gift_management.txt_save_button')}
      </ButtonPrimary>
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
  buttonContainer: {
    width: '160px !important',
    height: '38px !important',
    borderRadius: '5px !important',
    marginTop: '46px',
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
    },
  },
}))

export default AddPersonTarget
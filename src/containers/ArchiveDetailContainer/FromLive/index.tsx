import React, { useEffect, useState } from 'react'
import HeaderWithButton from '@components/HeaderWithButton'
import { Box, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import Steps from './Steps'
import useLiveSetting from '@containers/StreamingSettingContainer/useLiveSetting'
import { ArchiveDetailFormType, getInitialArchiveDetailValues, validationScheme } from './ArchiveDetailFromLiveFormData'
import { useFormik } from 'formik'
import useArchivedList from '@containers/ArchivedListContainer/useArchivedList'

interface Props {
  isFromSchedule: boolean
}

const ArchiveDetailFromLiveContainer: React.FC<Props> = ({ isFromSchedule }) => {
  const [step, setStep] = useState(1)
  const { t } = useTranslation('common')
  const classes = useStyles()

  const { categoryData, getCategory } = useLiveSetting()
  const { videoArchivedDetail } = useArchivedList()
  const initialValues = getInitialArchiveDetailValues(videoArchivedDetail)
  const formikArchiveDetail = useFormik<ArchiveDetailFormType>({
    initialValues: initialValues,
    validationSchema: validationScheme(),
    enableReinitialize: true,
    validateOnBlur: false,
    onSubmit: () => {
      //TODO: smt
    },
  })

  const onChangeStep = (step: number): void => {
    setStep(step)
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div>
      <HeaderWithButton title={t('archived_list_screen.title')} />
      <Box className={classes.wrapper}>
        <Steps step={step} onNext={onChangeStep} category={categoryData} formik={formikArchiveDetail} isFromSchedule={isFromSchedule} />
      </Box>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  wrapper: {},
}))

export default ArchiveDetailFromLiveContainer
